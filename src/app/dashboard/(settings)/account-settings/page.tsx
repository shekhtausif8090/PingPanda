import { DashboardPage } from "@/components/dashboard-page"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { AccountSettings } from "./setttings-page-content"

const Page = async () => {
  const auth = await currentUser()

  if (!auth) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: auth.id },
    select: {
      discordId: true,
      discordBotToken: true,
    },
  })

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <DashboardPage title="Account Settings">
      <AccountSettings
        discordId={user.discordId ?? ""}
        discordBotToken={user.discordBotToken ?? ""}
      />
    </DashboardPage>
  )
}

export default Page
