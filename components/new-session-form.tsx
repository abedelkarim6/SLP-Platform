"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Save } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { createBrowserClient } from "@/lib/supabase"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface NewSessionFormProps {
  patientId?: string
  onSuccess?: () => void
}

export function NewSessionForm({ patientId, onSuccess }: NewSessionFormProps) {
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createBrowserClient()

  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("")
  const [duration, setDuration] = useState("45")
  const [sessionType, setSessionType] = useState("In-person")
  const [focusArea, setFocusArea] = useState("")
  const [notes, setNotes] = useState("")
  const [homework, setHomework] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !patientId || !user) return

    setIsSubmitting(true)

    try {
      // Combine date and time
      const [hours, minutes] = time.split(":")
      const sessionDateTime = new Date(date)
      sessionDateTime.setHours(Number.parseInt(hours), Number.parseInt(minutes))

      const { error } = await supabase.from("sessions").insert({
        patient_id: patientId,
        user_id: user.id,
        session_date: sessionDateTime.toISOString(),
        duration: Number.parseInt(duration),
        session_type: sessionType,
        focus_area: focusArea,
        notes,
        homework,
      })

      if (error) throw error

      // Reset form
      setDate(undefined)
      setTime("")
      setDuration("45")
      setSessionType("In-person")
      setFocusArea("")
      setNotes("")
      setHomework("")

      onSuccess?.()
      router.refresh()
    } catch (err) {
      console.error("Error creating session:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Schedule New Session
        </CardTitle>
        <CardDescription>Create a new therapy session for this patient</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Session Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Session Time</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session-type">Session Type</Label>
              <Select value={sessionType} onValueChange={setSessionType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In-person">In-person</SelectItem>
                  <SelectItem value="Virtual">Virtual</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="focus-area">Focus Area</Label>
            <Input
              id="focus-area"
              placeholder="e.g., Articulation - /r/ sound"
              value={focusArea}
              onChange={(e) => setFocusArea(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Session Notes</Label>
            <Textarea
              id="notes"
              placeholder="Session objectives and planned activities..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="homework">Homework Assignment</Label>
            <Textarea
              id="homework"
              placeholder="Home practice activities..."
              value={homework}
              onChange={(e) => setHomework(e.target.value)}
              rows={2}
            />
          </div>

          <Button type="submit" disabled={isSubmitting || !date || !time} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Creating Session..." : "Create Session"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
