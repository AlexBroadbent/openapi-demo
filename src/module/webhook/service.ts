import fetch, { FetchError } from "node-fetch"

if (!process.env.WEBHOOK_URL) throw Error("WEBHOOK_URL is required")
const webhookUrl = process.env.WEBHOOK_URL

const controller = new globalThis.AbortController()

export const sendWebhook = async (body: unknown) => {
  if (process.env.WEBHOOK_ENABLED !== "true") return

  const timeout = setTimeout(() => {
    controller.abort()
  }, 10_000)

  try {
    const result = await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(body),
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (result.status !== 200) console.log("WebhookService: Invalid response to webhook", { result })
  } catch (error) {
    if (error instanceof FetchError) console.error("WebhookService: Webhook request timed out")
    else console.error("WebhookService: Webhook failed to deliver", { error })
  } finally {
    clearTimeout(timeout)
  }
}
