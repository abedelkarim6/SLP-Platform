"use client"

import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ClientsTable } from "@/components/clients-table"
import { useState } from "react"
import { NewPatientForm } from "@/components/new-patient-form"

export default function ClientsPage() {
  const [showNewPatientForm, setShowNewPatientForm] = useState(false)

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={() => setShowNewPatientForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Patient
        </Button>
      </div>
      <ClientsTable />
      {showNewPatientForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-background rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add New Patient</h2>
              <Button variant="ghost" size="icon" onClick={() => setShowNewPatientForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <NewPatientForm onSuccess={() => setShowNewPatientForm(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
