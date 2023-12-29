import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import express from "express"
import bodyParser from "body-parser"
import { initTezosInstance } from "./services/beacon/hooks/useTezos"
import { TezosToolkit } from "@taquito/taquito"
import { deployMetadataCarrier } from "./services/contracts/metadataCarrier/deploy"
import { BaseDAO } from "./services/contracts/baseDAO"
import { InMemorySigner } from "@taquito/signer"
import { EnvKey, getEnv } from "services/config"
import cors from "cors"
import timeout from "connect-timeout" //express v4
import queue from "express-queue"
import fs from "fs"
import https from "https"

// BigNumber.config({ DECIMAL_PLACES:  })

type DAOTemplate = "lambda" | "lite" | ""
type Network = "mainnet" | "ghostnet"

dayjs.extend(localizedFormat)

const app = express()
const port = 3001
const ALICE_PRIV_KEY = getEnv(EnvKey.REACT_APP_PRIVATE_KEY)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(
  cors({
    origin: ["https://tezos-homebase.io", "https://deploy-preview-609--tezos-homebase.netlify.app"]
  })
)

app.use(timeout(2147483646))

app.use(queue({ activeLimit: 1, queuedLimit: -1 }))

// Certificate
const privateKey = fs.readFileSync("privkey.pem", "utf8")
const certificate = fs.readFileSync("cert.pem", "utf8")
const ca = fs.readFileSync("chain.pem", "utf8")

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca
}

app.post("/deploy", async (req, res) => {
  try {
    const body = req.body.deployParams
    const { metadataParams, params } = body

    const template: DAOTemplate = "lambda"
    const network: Network = metadataParams.metadata.frozenToken.governanceToken.tokenMetadata.network

    const newTezos: TezosToolkit = initTezosInstance(network)
    const signer = await InMemorySigner.fromSecretKey(ALICE_PRIV_KEY)
    newTezos.setProvider({ signer })

    params.orgSettings.administrator = await newTezos.wallet.pkh()

    const metadata = await deployMetadataCarrier({
      ...metadataParams,
      tezos: newTezos,
      connect: undefined
    })

    if (!metadata) {
      throw "No Metadata"
    }

    const contract = await BaseDAO.baseDeploy(template, {
      tezos: newTezos,
      metadata,
      params,
      network
    })
    console.log("contract: ", contract)

    if (!contract) {
      throw new Error(`Error deploying ${template}DAO`)
    }

    const tx = await BaseDAO.transfer_ownership(contract.address, contract.address, newTezos)

    if (!tx) {
      throw new Error(`Error transferring ownership of ${template}DAO to itself`)
    }
    res.send({ address: contract.address })
  } catch (error) {
    console.log("error: ", error)
    res.send("OOOppsiess")
  }
})

const httpsServer = https.createServer(credentials, app)

httpsServer.listen(port, () => {
  console.log("HTTPS Server running on port", port)
})
