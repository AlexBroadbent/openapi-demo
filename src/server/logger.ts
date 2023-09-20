import pino from "pino"

const buildLogger = (): pino.Logger =>
  pino({
    transport: {
      target: "pino-pretty",
      options: {
        singleLine: true,
        colorizeObjects: false,
      },
    },
    level: "debug",
  })

export const logger: pino.Logger = buildLogger()
