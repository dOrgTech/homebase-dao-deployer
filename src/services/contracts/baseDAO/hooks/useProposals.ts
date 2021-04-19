import { useMemo } from "react";
import { useQuery } from "react-query";
import {
  Proposal,
  ProposalStatus,
  ProposalWithStatus
} from "services/bakingBad/proposals/types";
import { useDAO } from "services/contracts/baseDAO/hooks/useDAO";
import { BaseDAO } from "..";
import { CycleInfo } from "../class";
import { useCycleInfo } from "./useCycleInfo";

const mapProposalStatus = (proposal: Proposal, cycleInfo: CycleInfo): ProposalWithStatus => {


  if(proposal.cycle === cycleInfo.current) {
    return {
      ...proposal,
      status: ProposalStatus.CREATED,
    }
  } else if(proposal.cycle + 1 === cycleInfo.current) {
    return {
      ...proposal,
      status: ProposalStatus.ACTIVE,
    }
  } else {
    return {
      ...proposal,
      status: ProposalStatus.DROPPED,
    }
  }
}

export const useProposals = (
  contractAddress: string | undefined,
  status?: ProposalStatus
) => {
  const { data: dao } = useDAO(contractAddress);

  const cycleInfo = useCycleInfo(contractAddress)

  const result = useQuery<Proposal[], Error>(
    ["proposals", contractAddress],
    () => (dao as BaseDAO).proposals(),
    {
      enabled: !!dao,
    }
  );

  const filteredData = useMemo(() => {
    if (!result.data || !cycleInfo) {
      return [];
    }

    const proposalsWithStatus = result.data?.map((proposal) => mapProposalStatus(proposal, cycleInfo))

    if (!status) {
      return proposalsWithStatus;
    }

    return proposalsWithStatus.filter((proposalData) => proposalData.status === status);
  }, [cycleInfo, result.data, status]);

  return {
    ...result,
    data: filteredData,
  };
};
