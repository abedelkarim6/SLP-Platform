"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus } from "lucide-react"
import { NewSessionForm } from "./new-session-form"
import { useState } from "react"

interface SessionHistoryProps {
  clientId: number
}

export function SessionHistory({ clientId }: SessionHistoryProps) {
  // In a real app, you would fetch the session history based on the client ID
  const sessions = [
    {
      id: 1,
      date: "April 15, 2023",
      time: "10:00 AM",
      duration: "45 min",
      type: "In-person",
      focus: "Articulation - /r/ sound",
      notes: "Worked on initial /r/ sounds in words. Alex showed improvement with visual cues.",
      homework: "Practice /r/ words with picture cards 10 minutes daily.",
    },
    {
      id: 2,
      date: "April 8, 2023",
      time: "10:00 AM",
      duration: "45 min",
      type: "In-person",
      focus: "Articulation - /s/ blends",
      notes: "Practiced /s/ blends in sentences. Alex demonstrated 80% accuracy.",
      homework: "Read story with /s/ blend words highlighted.",
    },
    {
      id: 3,
      date: "April 1, 2023",
      time: "10:00 AM",
      duration: "45 min",
      type: "Virtual",
      focus: "Articulation - /s/ sound",
      notes: "Worked on /s/ sound in isolation and in syllables. Alex showed good progress.",
      homework: "Practice /s/ sound in mirror for 5 minutes daily.",
    },
    {
      id: 4,
      date: "March 25, 2023",
      time: "10:00 AM",
      duration: "45 min",
      type: "In-person",
      focus: "Assessment",
      notes: "Conducted follow-up assessment. Alex shows 40% improvement in target sounds since initial evaluation.",
      homework: "None assigned.",
    },
  ]

  const [showNewSessionForm, setShowNewSessionForm] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Session History</h3>
        <Button size="sm" onClick={() => setShowNewSessionForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Session
        </Button>
      </div>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div key={session.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{session.date}</h4>
                <span className="text-sm text-muted-foreground">
                  {session.time} ({session.duration})
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{session.type}</Badge>
                <Button variant="ghost" size="icon">
                  <FileText className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="secondary">{session.focus}</Badge>
            </div>
            <div className="mt-2">
              <h5 className="text-sm font-medium">Session Notes:</h5>
              <p className="text-sm">{session.notes}</p>
            </div>
            <div className="mt-2">
              <h5 className="text-sm font-medium">Homework:</h5>
              <p className="text-sm">{session.homework}</p>
            </div>
          </div>
        ))}
      </div>
      {showNewSessionForm && (
        <div className="mt-6">
          <NewSessionForm patientId={clientId.toString()} onSuccess={() => setShowNewSessionForm(false)} />
        </div>
      )}
    </div>
  )
}
