"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { client } from "@/lib/client"
import { useMutation } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"

export const AccountSettings = ({
  discordId: initialDiscordId,
  discordBotToken: initialDiscordBotToken,
}: {
  discordId: string
  discordBotToken: string
}) => {
  const [discordId, setDiscordId] = useState(initialDiscordId)
  const [discordBotToken, setDiscordBotToken] = useState(initialDiscordBotToken)

  const { mutate, isPending } = useMutation({
    mutationFn: async (discordId: string) => {
      const res = await client.project.setDiscordID.$post({ discordId })
      return await res.json()
    },
  })

  const { mutate: discordBot, isPending: isPendingBot } = useMutation({
    mutationFn: async (discordBotToken: string) => {
      const res = await client.project.setDiscordBotToken.$post({
        discordBotToken,
      })
      return await res.json()
    },
  })

  return (
    <div className="flex flex-col gap-6 md:flex-col lg:flex-row ">
      <Card className="max-w-xl w-full space-y-4">
        <div className="pt-2">
          <Label>Discord ID</Label>
          <Input
            className="mt-1"
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
            placeholder="Enter your Discord ID"
          />
        </div>
        <p className="mt-2 text-sm/6 text-gray-600">
          Don't know how to find your Discord ID?{" "}
          <Link
            href="https://shorturl.at/SMqyh"
            className="text-brand-600 hover:text-brand-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn how to obtain it here
          </Link>
          .
        </p>

        <div className="pt-4">
          <Button onClick={() => mutate(discordId)} disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Card>
      <Card className="max-w-xl w-full space-y-4">
        <div className="pt-2">
          <Label>Discord Bot Token</Label>
          <Input
            className="mt-1"
            value={discordBotToken}
            onChange={(e) => setDiscordBotToken(e.target.value)}
            placeholder="Enter your Discord Bot Token"
          />
        </div>
        <p className="mt-2 text-sm/6 text-gray-600">
          Don't know how to find your Discord Bot Token?{" "}
          <Link
            href="https://shorturl.at/SMqyh"
            className="text-brand-600 hover:text-brand-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn how to obtain it here
          </Link>
          .
        </p>

        <div className="pt-4">
          <Button
            onClick={() => discordBot(discordBotToken)}
            disabled={isPendingBot}
          >
            {isPendingBot ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Card>
    </div>
  )
}
