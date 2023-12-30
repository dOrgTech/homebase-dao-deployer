import { EnvKey } from "./constants"
import "dotenv/config"

export const getEnv = (envKey: EnvKey): string => {
  return process.env[envKey] ?? ""
}
