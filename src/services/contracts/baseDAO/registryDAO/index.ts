import { Parser, Expr, unpackDataBytes } from "@taquito/michel-codec";
import {
  extractTransfersData,
  mapProposalBase,
  mapTransfersArgs,
} from "./../../../bakingBad/proposals/mappers";
import { TezosToolkit } from "@taquito/taquito";
import { Schema } from "@taquito/michelson-encoder";
import { getLedgerAddresses } from "services/bakingBad/ledger";
import { getProposalsDTO } from "services/bakingBad/proposals";
import { getStorage } from "services/bakingBad/storage";
import { Network } from "services/beacon/context";
import { ConstructorParams, getContract, unpackExtraNumValue } from "..";
import { DAOListMetadata } from "../../metadataCarrier/types";
import { BaseDAO } from "..";
import {
  PMRegistryProposal,
  RegistryExtra,
  RegistryExtraDTO,
  RegistryProposeArgs,
} from "./types";
import { RegistryProposal } from "services/bakingBad/proposals/types";
import { getExtra, getExtraRegistryValues } from "services/bakingBad/extra";
import { bytes2Char, char2Bytes } from "@taquito/tzip16";
import proposeCode from "./michelson/propose";

const parser = new Parser();

interface RegistryConstructorParams extends ConstructorParams {
  extra: RegistryExtra;
}

interface RegistryItemDTO {
  prim: "Pair";
  args: [{ string: string }, { string: string }];
}

interface RegistryAffectedDTO {
  prim: "Elt";
  args: [{ string: string }, { bytes: string }];
}

const mapStorageRegistryList = (
  listMichelsonString: string
): {
  key: string;
  value: string;
}[] => {
  if (listMichelsonString === "{ {} }") {
    return [];
  }

  const listStringNoBraces = listMichelsonString.substr(
    3,
    listMichelsonString.length - 6
  );
  return listStringNoBraces.split(" ; ").map((listString) => {
    const list = parser.parseData(listString) as RegistryItemDTO;

    return {
      key: bytes2Char(list.args[0].string),
      value: bytes2Char(list.args[1].string),
    };
  });
};

const mapStorageRegistryAffectedList = (
  listMichelsonString: string
): {
  key: string;
  proposalId: string;
}[] => {
  if (listMichelsonString === "{ {} }") {
    return [];
  }

  const listStringNoBraces = listMichelsonString.substr(
    3,
    listMichelsonString.length - 6
  );

  return listStringNoBraces.split(" ; ").map((listString) => {
    const list = parser.parseData(listString) as RegistryAffectedDTO;

    return {
      key: bytes2Char(list.args[0].string),
      proposalId: list.args[1].bytes,
    };
  });
};

export class RegistryDAO extends BaseDAO {
  public extra: RegistryExtra;

  public static create = async (
    contractAddress: string,
    network: Network,
    tezos: TezosToolkit,
    metadata: DAOListMetadata
  ) => {
    const storage = await getStorage(contractAddress, network);
    const extraDto = await getExtra<RegistryExtraDTO>(
      storage.extraMapNumber,
      network
    );

    const { registry, registryAffected } = await getExtraRegistryValues(
      storage.extraMapNumber,
      network
    );

    const extra: RegistryExtra = {
      registry: mapStorageRegistryList(registry),
      frozenExtraValue: unpackExtraNumValue(extraDto[5].value),
      slashExtraValue: unpackExtraNumValue(extraDto[0].value),
      minXtzAmount: unpackExtraNumValue(extraDto[3].value),
      maxXtzAmount: unpackExtraNumValue(extraDto[2].value),
      frozenScaleValue: unpackExtraNumValue(extraDto[1].value),
      slashDivisionScale: unpackExtraNumValue(extraDto[4].value),
      registryAffected: mapStorageRegistryAffectedList(registryAffected),
    };

    const ledger = await getLedgerAddresses(
      storage.ledgerMapNumber,
      storage.governanceToken.decimals,
      network
    );

    return new RegistryDAO({
      address: contractAddress,
      ledger,
      template: "registry",
      storage,
      metadata,
      tezos,
      network,
      extra,
    });
  };

  public constructor(params: RegistryConstructorParams) {
    super(params);
    this.extra = params.extra;
  }

  public propose = async (
    { agoraPostId, transfer_proposal }: RegistryProposeArgs,
    tezos: TezosToolkit
  ) => {
    const contract = await getContract(tezos, this.address);

    const michelsonType = parser.parseData(proposeCode);
    const schema = new Schema(michelsonType as Expr);

    const dataToEncode = {
      transfer_proposal: {
        transfers: mapTransfersArgs(transfer_proposal.transfers, this.address),
        registry_diff: transfer_proposal.registry_diff.map((item) => [
          char2Bytes(item.key),
          char2Bytes(item.value),
        ]),
        agora_post_id: agoraPostId,
      },
    };

    const data = schema.Encode(dataToEncode);

    const { packed: proposalMetadata } = await tezos.rpc.packData({
      data,
      type: michelsonType as Expr,
    });

    const contractMethod = contract.methods.propose(
      this.extra.frozenExtraValue,
      proposalMetadata
    );

    const result = await contractMethod.send();

    return result;
  };

  public proposals = async (network: Network): Promise<RegistryProposal[]> => {
    const { proposalsMapNumber } = this.storage;
    const proposalsDTO = await getProposalsDTO(proposalsMapNumber, network);

    const micheline = parser.parseMichelineExpression(proposeCode) as Expr;
    const schema = new Schema(micheline as Expr);

    const proposals = proposalsDTO
      .map((dto) => {
        const unpackedMetadata = unpackDataBytes(
          { bytes: dto.value.metadata },
          micheline as any
        ) as any;
        const proposalMetadataDTO: PMRegistryProposal = schema.Execute(unpackedMetadata)

        if (!proposalMetadataDTO.transfer_proposal.transfers) {
          return undefined;
        }

        const transfers = extractTransfersData(
          proposalMetadataDTO.transfer_proposal.transfers
        );
        const agoraPostId = proposalMetadataDTO.transfer_proposal.agora_post_id;
        const registryDiff =
          proposalMetadataDTO.transfer_proposal.registry_diff.map((item) => ({
            key: bytes2Char(item[0]),
            value: bytes2Char(item[1]),
          }));

        return {
          ...mapProposalBase(
            dto,
            "registry",
              this.storage.governanceToken.supply,
              this.storage.governanceToken.decimals
          ),
          transfers,
          list: registryDiff,
          agoraPostId,
        };
      })
      //TODO: fix these types
      .filter((p) => !!p);

    return proposals as any[];
  };
}
