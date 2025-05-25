import { Separator } from "@/components/ui/separator"

interface PatientInfoProps {
  client: {
    parentName: string
    parentPhone: string
    parentEmail: string
    address: string
    startDate: string
    referredBy: string
    notes: string
  }
}

export function PatientInfo({ client }: PatientInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium">Parent/Guardian</h3>
        <p className="text-sm">{client.parentName}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium">Contact</h3>
        <p className="text-sm">{client.parentPhone}</p>
        <p className="text-sm">{client.parentEmail}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium">Address</h3>
        <p className="text-sm">{client.address}</p>
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-medium">Start Date</h3>
        <p className="text-sm">{client.startDate}</p>
      </div>
      <div>
        <h3 className="text-sm font-medium">Referred By</h3>
        <p className="text-sm">{client.referredBy}</p>
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-medium">Notes</h3>
        <p className="text-sm">{client.notes}</p>
      </div>
    </div>
  )
}
