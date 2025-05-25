"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronLeft, ChevronRight, MoreHorizontal, FileText, Calendar, User } from "lucide-react"
import Link from "next/link"

const clients = [
  {
    id: 1,
    name: "Alex Johnson",
    age: 8,
    gender: "Male",
    disorder: "Articulation",
    status: "Active",
    nextSession: "Today, 10:00 AM",
    progress: "Good",
    avatar: "AJ",
  },
  {
    id: 2,
    name: "Emma Wilson",
    age: 12,
    gender: "Female",
    disorder: "Fluency",
    status: "Active",
    nextSession: "Today, 11:30 AM",
    progress: "Excellent",
    avatar: "EW",
  },
  {
    id: 3,
    name: "Michael Brown",
    age: 6,
    gender: "Male",
    disorder: "Language Delay",
    status: "Active",
    nextSession: "Today, 1:15 PM",
    progress: "Moderate",
    avatar: "MB",
  },
  {
    id: 4,
    name: "Sophia Davis",
    age: 10,
    gender: "Female",
    disorder: "Articulation",
    status: "Active",
    nextSession: "Today, 2:30 PM",
    progress: "Good",
    avatar: "SD",
  },
  {
    id: 5,
    name: "Noah Martinez",
    age: 7,
    gender: "Male",
    disorder: "Phonological",
    status: "Active",
    nextSession: "Today, 4:00 PM",
    progress: "Moderate",
    avatar: "NM",
  },
  {
    id: 6,
    name: "Olivia Taylor",
    age: 9,
    gender: "Female",
    disorder: "Language Delay",
    status: "On Hold",
    nextSession: "Tomorrow, 10:00 AM",
    progress: "Good",
    avatar: "OT",
  },
  {
    id: 7,
    name: "William Anderson",
    age: 11,
    gender: "Male",
    disorder: "Fluency",
    status: "Active",
    nextSession: "Tomorrow, 11:30 AM",
    progress: "Moderate",
    avatar: "WA",
  },
  {
    id: 8,
    name: "Ava Thomas",
    age: 5,
    gender: "Female",
    disorder: "Articulation",
    status: "Active",
    nextSession: "Tomorrow, 1:15 PM",
    progress: "Good",
    avatar: "AT",
  },
  {
    id: 9,
    name: "James Jackson",
    age: 8,
    gender: "Male",
    disorder: "Voice",
    status: "Active",
    nextSession: "Tomorrow, 2:30 PM",
    progress: "Excellent",
    avatar: "JJ",
  },
  {
    id: 10,
    name: "Charlotte White",
    age: 6,
    gender: "Female",
    disorder: "Phonological",
    status: "Inactive",
    nextSession: "Next Week",
    progress: "Moderate",
    avatar: "CW",
  },
]

export function ClientsTable() {
  const [page, setPage] = useState(1)
  const pageSize = 8
  const totalPages = Math.ceil(clients.length / pageSize)

  const paginatedClients = clients.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Disorder</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Next Session</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedClients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{client.avatar}</AvatarFallback>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                  </Avatar>
                  <div>
                    <div className="font-medium">{client.name}</div>
                    <div className="text-xs text-muted-foreground">{client.gender}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>{client.age}</TableCell>
              <TableCell>
                <Badge variant="outline">{client.disorder}</Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    client.status === "Active" ? "default" : client.status === "On Hold" ? "secondary" : "outline"
                  }
                >
                  {client.status}
                </Badge>
              </TableCell>
              <TableCell>{client.nextSession}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`
                    ${client.progress === "Excellent" ? "border-green-200 bg-green-100 text-green-800" : ""}
                    ${client.progress === "Good" ? "border-blue-200 bg-blue-100 text-blue-800" : ""}
                    ${client.progress === "Moderate" ? "border-yellow-200 bg-yellow-100 text-yellow-800" : ""}
                  `}
                >
                  {client.progress}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/clients/${client.id}`}>
                      <User className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Calendar className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Client</DropdownMenuItem>
                      <DropdownMenuItem>Schedule Session</DropdownMenuItem>
                      <DropdownMenuItem>Generate Report</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-sm text-muted-foreground">
          Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, clients.length)} of {clients.length} clients
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => setPage(page - 1)} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
