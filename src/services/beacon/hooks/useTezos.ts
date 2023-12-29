import { MichelCodecPacker, TezosToolkit } from "@taquito/taquito"
import { Network, rpcNodes } from "services/beacon"
import { Tzip16Module } from "@taquito/tzip16"

export const initTezosInstance = (network: Network) => {
  const newTezos = new TezosToolkit(rpcNodes[network])
  newTezos.setPackerProvider(new MichelCodecPacker())
  newTezos.addExtension(new Tzip16Module())

  return newTezos
}
