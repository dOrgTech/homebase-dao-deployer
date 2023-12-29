import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import express from "express"
import bodyParser from "body-parser"
import { initTezosInstance } from "./services/beacon/hooks/useTezos"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
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
import http from "http"
import { DAOTemplate } from "services/contracts/baseDAO/state"
import { Network } from "services/beacon"
// Swagger
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"

// BigNumber.config({ DECIMAL_PLACES:  })

dayjs.extend(localizedFormat)

const app = express()
const port = 3001

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Homebase DAO Deployer API Documentation",
    version: "1.0.0",
    description: "API documentation for the Homebase DAO Deployer"
  },
  servers: [
    {
      url: `http://localhost:${port}`,
      description: "Local server"
    }
  ]
}
const options = {
  swaggerDefinition,
  // Pointing to the current file for API definitions
  apis: ["./dist/index.js"]
}
const swaggerSpec = swaggerJSDoc(options)
// Swagger UI route
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

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
  /**
   * @swagger
   * /deploy:
   *   post:
   *     summary: Deploy a new DAO
   *     description: Deploy a new DAO on the Tezos blockchain.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               deployParams:
   *                 type: object
   *                 description: Deployment parameters for the DAO.
   *     responses:
   *       200:
   *         description: DAO deployed successfully. Returns the contract address.
   *       500:
   *         description: Error in deploying DAO.
   */
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

// Check the environment and setup the corresponding server
if (getEnv(EnvKey.REACT_APP_ENV) !== "LOCAL") {
  // Production setup with HTTPS
  const credentials = {
    key: fs.readFileSync("path/to/privkey.pem", "utf8"),
    cert: fs.readFileSync("path/to/cert.pem", "utf8"),
    ca: fs.readFileSync("path/to/chain.pem", "utf8") // Include this only if you have a CA file
  }

  const httpsServer = https.createServer(credentials, app)
  httpsServer.listen(port, () => {
    console.log("HTTPS Server running on port", port)
  })
} else {
  // Local development setup with HTTP
  const httpServer = http.createServer(app)
  httpServer.listen(port, () => {
    console.log("HTTP Server running on port", port)
  })
}
