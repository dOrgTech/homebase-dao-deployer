import { Network } from "services/beacon"
import { networkNameMap } from ".."
import fetch from "node-fetch"

export const getNetworkHead = async (network: Network): Promise<number> => {
  const url = `https://api.${networkNameMap[network]}.tzkt.io/v1/blocks/count`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch contract storage from BakingBad API")
  }

  const result = (await response.json()) as number
  return result
}
