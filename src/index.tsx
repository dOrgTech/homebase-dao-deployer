import 'dotenv/config'
// Resolve TS path aliases at runtime when running compiled JS
import 'tsconfig-paths/register'
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import express from "express"
import bodyParser from "body-parser"
import { DAOTemplate } from "./modules/creator/state"
import { Network } from "./services/beacon"
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


app.post("/deploy", async (req, res) => {
  try {
    const deployParams = req.body?.deployParams

    if (!deployParams) {
      return res.status(400).json({
        error: "Missing body.deployParams",
        example: {
          deployParams: {
            metadataParams: {
              metadata: {
                frozenToken: {
                  governanceToken: { tokenMetadata: { network: "ghostnet" } }
                }
              }
            },
            params: { orgSettings: { administrator: "tz1..." } }
          }
        }
      })
    }

    const { metadataParams, params } = deployParams

    if (!metadataParams || !metadataParams.metadata) {
      return res.status(400).json({
        error: "Missing deployParams.metadataParams.metadata",
        expectedPath: "deployParams.metadataParams.metadata.frozenToken.governanceToken.tokenMetadata.network"
      })
    }

    const template: DAOTemplate = "lambda"

    const rawNetwork =
      metadataParams?.metadata?.frozenToken?.governanceToken?.tokenMetadata?.network ||
      req.body?.network ||
      deployParams?.network ||
      getEnv(EnvKey.REACT_APP_NETWORK) ||
      "mainnet"

    const normalized = String(rawNetwork).toLowerCase()
    const network: Network = (normalized === "ghostnet" || normalized === "mainnet" ? normalized : "mainnet") as Network

    const newTezos: TezosToolkit = initTezosInstance(network)

    if (!ALICE_PRIV_KEY) {
      return res.status(500).json({ error: "Missing REACT_APP_PRIVATE_KEY in environment" })
    }

    const signer = await InMemorySigner.fromSecretKey(ALICE_PRIV_KEY)
    newTezos.setProvider({ signer })

    if (!params?.orgSettings) {
      return res.status(400).json({
        error: "Missing deployParams.params.orgSettings",
        note: "orgSettings.administrator will be set to the deployer pkh"
      })
    }

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
    res.status(500).json({ error: String(error) })
  }
})

app.listen(port, () => {  
  console.log("App Network", process.env.REACT_APP_NETWORK)
  console.log("HTTPS Server running on port", port) 
})

// Certificate
// const privateKey = fs.readFileSync("privkey.pem", "utf8")
// const certificate = fs.readFileSync("cert.pem", "utf8")
// const ca = fs.readFileSync("chain.pem", "utf8")

// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca
// }

// const httpsServer = https.createServer(credentials, app)

// httpsServer.listen(port, () => {
//   console.log("HTTPS Server running on port", port)
// })
