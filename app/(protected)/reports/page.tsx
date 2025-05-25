"use client"

import { useState, useEffect } from "react"
import { FileText, Plus, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { getReports } from "@/lib/db"
import type { Report, Patient, Session } from "@/lib/supabase"

interface ReportWithDetails extends Report {
  patient: Pick<Patient, "first_name" | "last_name">
  session: Pick<Session, "session_date">
}

export default function ReportsPage() {
  const { user } = useAuth()
  const [reports, setReports] = useState<ReportWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (user) {
      loadReports()
    }
  }, [user])

  const loadReports = async () => {
    try {
      const data = await getReports(user!.id)
      setReports(data as ReportWithDetails[])
    } catch (error) {
      console.error("Error loading reports:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${report.patient.first_name} ${report.patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (loading) {
    return <div className="p-6">Loading reports...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Session Reports</h1>
          <p className="text-muted-foreground">View and manage therapy session reports</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredReports.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reports found</h3>
              <p className="text-muted-foreground text-center mb-4">
                {searchTerm ? "No reports match your search criteria." : "You haven't created any reports yet."}
              </p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Report
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{report.title}</CardTitle>
                  <Badge variant="outline">{new Date(report.created_at).toLocaleDateString()}</Badge>
                </div>
                <CardDescription>
                  Patient: {report.patient.first_name} {report.patient.last_name} • Session:{" "}
                  {new Date(report.session.session_date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Created {new Date(report.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
