import { config } from "dotenv-flow"
import path from "path"

config({
  path: path.basename(__dirname) === "build" ? path.dirname(__dirname) : __dirname,
  silent: true,
})
