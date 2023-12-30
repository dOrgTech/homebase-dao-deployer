import app, { port } from "./app"
import fs from "fs"
import http from "http"
import https from "https"
import { getEnv, EnvKey } from "services/config"

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
