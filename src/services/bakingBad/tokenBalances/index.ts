import BigNumber from "bignumber.js"
import { NFT, Token } from "models/Token"
import { Network } from "services/beacon"
import { networkNameMap } from ".."
import { DAOToken, NFTDTO, TokenDataTZKT } from "./types"
import fetch from "node-fetch"

const isNFTDTO = (value: DAOToken): value is NFTDTO => value.hasOwnProperty("artifact_uri")

const isTokenTzktNFT = (value: TokenDataTZKT): boolean => Boolean(value.metadata?.artifactUri)

export interface DAOHolding {
  balance: BigNumber
  token: Token
}

export interface NFTDAOHolding extends DAOHolding {
  token: NFT
}

export const getTokenMetadata = async (contractAddress: string, network: Network, tokenId: string) => {
  let url = ""
  if (tokenId !== undefined) {
    url = `https://api.${networkNameMap[network]}.tzkt.io/v1/tokens?contract=${contractAddress}&tokenId=${tokenId}`
  } else {
    url = `https://api.${networkNameMap[network]}.tzkt.io/v1/tokens?contract=${contractAddress}`
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch proposals from BakingBad API")
  }

  const resultTokenDataTzkt: TokenDataTZKT[] = (await response.json()) as TokenDataTZKT[]
  const tokenData = resultTokenDataTzkt[0]

  let result: DAOToken

  if (isTokenTzktNFT(tokenData)) {
    result = {
      id: tokenData.id.toString(),
      supply: tokenData.totalSupply,
      contract: tokenData.contract.address,
      token_id: parseInt(tokenData.tokenId),
      network: network,
      symbol: tokenData.metadata?.symbol || "",
      level: tokenData.firstLevel,
      name: tokenData.metadata?.name || "",
      decimals: parseInt(tokenData.metadata?.decimals) || 0,
      description: tokenData.metadata?.description || "",
      artifact_uri: tokenData.metadata?.artifactUri || "",
      thumbnail_uri: tokenData.metadata?.thumbnailUri || "",
      is_transferable: tokenData.metadata.isTransferable,
      creators: tokenData.metadata?.creators,
      tags: tokenData.metadata?.tags,
      formats: tokenData.metadata?.formats,
      balance: "",
      standard: tokenData.standard
    }
  } else {
    result = {
      id: tokenData.id.toString(),
      supply: tokenData.totalSupply,
      contract: tokenData.contract.address,
      token_id: parseInt(tokenData.tokenId),
      network: network,
      symbol: tokenData.metadata?.symbol || "",
      level: tokenData.firstLevel,
      name: tokenData.metadata?.name || "",
      decimals: parseInt(tokenData.metadata?.decimals) || 0,
      balance: "",
      standard: tokenData.standard
    }
  }

  return isNFTDTO(result) ? new NFT(result) : new Token(result)
}
