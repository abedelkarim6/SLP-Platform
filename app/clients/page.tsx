import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientsTable } from "@/components/clients-table"
import { Plus, Search, Filter } from "lucide-react"

export default function ClientsPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground">Manage your client list and access patient profiles</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clients..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Age Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ages</SelectItem>
              <SelectItem value="0-5">0-5 years</SelectItem>
              <SelectItem value="6-12">6-12 years</SelectItem>
              <SelectItem value="13-18">13-18 years</SelectItem>
              <SelectItem value="19+">19+ years</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Disorder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Disorders</SelectItem>
              <SelectItem value="articulation">Articulation</SelectItem>
              <SelectItem value="language">Language Delay</SelectItem>
              <SelectItem value="fluency">Fluency</SelectItem>
              <SelectItem value="phonological">Phonological</SelectItem>
              <SelectItem value="voice">Voice</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <ClientsTable />
    </div>
  )
}
