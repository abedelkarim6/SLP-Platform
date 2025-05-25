"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { getSessions } from "@/lib/db"
import type { Session, Patient } from "@/lib/supabase"

interface SessionWithPatient extends Session {
  patient: Pick<Patient, "first_name" | "last_name">
}

export default function SchedulePage() {
  const { user } = useAuth()
  const [sessions, setSessions] = useState<SessionWithPatient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      loadSessions()
    }
  }, [user])

  const loadSessions = async () => {
    try {
      const data = await getSessions(user!.id)
      setSessions(data as SessionWithPatient[])
    } catch (error) {
      console.error("Error loading sessions:", error)
    } finally {
      setLoading(false)
    }
  }

  const todaySessions = sessions.filter((session) => {
    const sessionDate = new Date(session.session_date)
    const today = new Date()
    return sessionDate.toDateString() === today.toDateString()
  })

  const upcomingSessions = sessions
    .filter((session) => {
      const sessionDate = new Date(session.session_date)
      const today = new Date()
      return sessionDate > today
    })
    .slice(0, 5)

  if (loading) {
    return <div className="p-6">Loading schedule...</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Schedule</h1>
          <p className="text-muted-foreground">Manage your therapy sessions and appointments</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Sessions
            </CardTitle>
            <CardDescription>{todaySessions.length} sessions scheduled for today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todaySessions.length === 0 ? (
              <p className="text-muted-foreground">No sessions scheduled for today</p>
            ) : (
              todaySessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {session.patient.first_name} {session.patient.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.session_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      <Clock className="mr-1 h-3 w-3" />
                      {session.duration}min
                    </Badge>
                    <Badge variant={session.session_type === "Virtual" ? "secondary" : "default"}>
                      {session.session_type}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Sessions</CardTitle>
            <CardDescription>Next 5 scheduled sessions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.length === 0 ? (
              <p className="text-muted-foreground">No upcoming sessions</p>
            ) : (
              upcomingSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">
                        {session.patient.first_name} {session.patient.last_name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(session.session_date).toLocaleDateString()} at{" "}
                        {new Date(session.session_date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <Badge variant={session.session_type === "Virtual" ? "secondary" : "default"}>
                    {session.session_type}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
