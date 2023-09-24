import { config } from "dotenv-flow"
import path from "path"

import { getServer, logger } from "./server"

config({
  path: path.basename(__dirname) === "build" ? path.dirname(__dirname) : __dirname,
  silent: true,
})

const start = async () => {
  const server = await getServer({ logger })
  const port = Number(process.env.SERVER_PORT) || 8000

  server.listen({ port, host: "0.0.0.0" }, (err, address) => {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }

    server.log.info(`Server listening at ${address}`)
  })
}

void start()
