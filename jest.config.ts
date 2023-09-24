import type { Config } from "jest"

const config: Config = {
  rootDir: "tests",
  verbose: true,
  testEnvironment: "node",
  moduleFileExtensions: ["js", "ts", "d.ts"],
  setupFilesAfterEnv: ["dotenv-flow/config"],
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
  runtime: "@side/jest-runtime",
}

export default config
