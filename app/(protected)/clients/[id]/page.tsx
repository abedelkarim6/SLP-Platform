import type { Client } from "@/app/types"
import { getClient } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { UpdateClient } from "./update-client"
import AIRecommendations from "./ai-recommendations"

interface Props {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  const id = params.id
  const client: Client = await getClient(id)

  if (!client) {
    notFound()
  }

  const patientInfo = {
    age: new Date().getFullYear() - new Date(client.dateOfBirth).getFullYear(),
    disorders: [client.disorder], // Adjust based on your data structure
    currentGoals: [], // Add if you have goals data
    sessionHistory: [], // Add recent session notes
  }

  return (
    <main className="container p-4">
      <h1 className="text-2xl font-bold mb-4">Client Details</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p>ID: {client.id}</p>
        <p>Name: {client.name}</p>
        <p>Email: {client.email}</p>
        <p>Date of Birth: {client.dateOfBirth}</p>
        <p>Disorder: {client.disorder}</p>
        <p>Phone: {client.phone}</p>
        <p>Address: {client.address}</p>
        <p>Insurance: {client.insurance}</p>
        <p>Notes: {client.notes}</p>
        <div className="mt-4">
          <Link href={`/clients`} className="text-blue-500 hover:underline">
            Back to Clients
          </Link>
        </div>
        <div className="mt-4">
          <UpdateClient id={id} />
        </div>
        <div className="mt-4">
          <AIRecommendations clientId={params.id} patientInfo={patientInfo} />
        </div>
      </div>
    </main>
  )
}
