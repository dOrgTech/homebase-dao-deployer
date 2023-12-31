import { DAOTemplate } from "../../../../modules/creator/state/types"
import { useState } from "react"
import { ContractAbstraction, ContractProvider, Wallet } from "@taquito/taquito"
import { useMutation, useQueryClient } from "react-query"

import { deployMetadataCarrier } from "services/contracts/metadataCarrier/deploy"
import { useTezos } from "services/beacon/hooks/useTezos"
import mixpanel from "mixpanel-browser"
import { TokenContractParams } from "modules/creator/deployment/state/types"
import { deployTokenContract } from ".."

export const useTokenOriginate = (tokenData: TokenContractParams) => {
  const queryClient = useQueryClient()

  const { tezos, connect, network, account } = useTezos()

  const result = useMutation<ContractAbstraction<ContractProvider | Wallet>, Error, TokenContractParams>(
    async ({ tokenDistribution, tokenSettings }) => {
      let tezosToolkit = tezos

      if (!account) {
        tezosToolkit = await connect()
      }

      mixpanel.track("Started Token origination", {
        contract: "FA2Token",
        tokenName: tokenSettings.name,
        tokenSymbol: tokenSettings.symbol
      })

      const mutateTokenData: TokenContractParams = {
        tokenDistribution,
        tokenSettings
      }

      const contract = await deployTokenContract({
        ...mutateTokenData,
        tezos: tezosToolkit,
        account
      })

      if (!contract) {
        throw new Error(`Error deploying ${tokenData.tokenSettings.name} Token`)
      }

      mixpanel.track("Completed Token Deployment", {
        contract: "FA2Token",
        tokenName: tokenSettings.name,
        tokenSymbol: tokenSettings.symbol
      })

      return contract
    },
    {
      onSuccess: () => {
        queryClient.resetQueries()
      }
    }
  )

  return { mutation: result }
}
