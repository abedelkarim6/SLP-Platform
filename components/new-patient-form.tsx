"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, UserPlus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { createBrowserClient } from "@/lib/supabase"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

interface NewPatientFormProps {
  onSuccess?: () => void
}

export function NewPatientForm({ onSuccess }: NewPatientFormProps) {
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createBrowserClient()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState<Date>()
  const [gender, setGender] = useState("")
  const [parentName, setParentName] = useState("")
  const [parentPhone, setParentPhone] = useState("")
  const [parentEmail, setParentEmail] = useState("")
  const [address, setAddress] = useState("")
  const [referredBy, setReferredBy] = useState("")
  const [notes, setNotes] = useState("")
  const [selectedDisorders, setSelectedDisorders] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const disorders = [
    { id: "articulation", name: "Articulation" },
    { id: "language-delay", name: "Language Delay" },
    { id: "fluency", name: "Fluency" },
    { id: "phonological", name: "Phonological" },
    { id: "voice", name: "Voice" },
  ]

  const handleDisorderChange = (disorderId: string, checked: boolean) => {
    if (checked) {
      setSelectedDisorders([...selectedDisorders, disorderId])
    } else {
      setSelectedDisorders(selectedDisorders.filter((id) => id !== disorderId))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !dateOfBirth || !gender || !user) return

    setIsSubmitting(true)

    try {
      // Create patient
      const { data: patient, error: patientError } = await supabase
        .from("patients")
        .insert({
          user_id: user.id,
          first_name: firstName,
          last_name: lastName,
          date_of_birth: dateOfBirth.toISOString().split("T")[0],
          gender,
          parent_name: parentName,
          parent_phone: parentPhone,
          parent_email: parentEmail,
          address,
          referred_by: referredBy,
          notes,
        })
        .select()
        .single()

      if (patientError) throw patientError

      // Add disorders if any selected
      if (selectedDisorders.length > 0 && patient) {
        // First get disorder IDs from the disorders table
        const { data: disorderData, error: disorderError } = await supabase
          .from("disorders")
          .select("id, name")
          .in(
            "name",
            selectedDisorders.map((d) => disorders.find((disorder) => disorder.id === d)?.name).filter(Boolean),
          )

        if (disorderError) throw disorderError

        if (disorderData && disorderData.length > 0) {
          const patientDisorders = disorderData.map((disorder) => ({
            patient_id: patient.id,
            disorder_id: disorder.id,
          }))

          const { error: linkError } = await supabase.from("patient_disorders").insert(patientDisorders)

          if (linkError) throw linkError
        }
      }

      // Reset form
      setFirstName("")
      setLastName("")
      setDateOfBirth(undefined)
      setGender("")
      setParentName("")
      setParentPhone("")
      setParentEmail("")
      setAddress("")
      setReferredBy("")
      setNotes("")
      setSelectedDisorders([])

      onSuccess?.()
      router.push(`/clients/${patient.id}`)
    } catch (err) {
      console.error("Error creating patient:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          Add New Patient
        </CardTitle>
        <CardDescription>Create a new patient profile</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name *</Label>
              <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name *</Label>
              <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Date of Birth *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfBirth && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfBirth ? format(dateOfBirth, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                    initialFocus
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    captionLayout="dropdown-buttons"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Speech Disorders</Label>
            <div className="grid grid-cols-2 gap-2">
              {disorders.map((disorder) => (
                <div key={disorder.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={disorder.id}
                    checked={selectedDisorders.includes(disorder.id)}
                    onCheckedChange={(checked) => handleDisorderChange(disorder.id, checked as boolean)}
                  />
                  <Label htmlFor={disorder.id} className="text-sm font-normal">
                    {disorder.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="parent-name">Parent/Guardian Name</Label>
            <Input id="parent-name" value={parentName} onChange={(e) => setParentName(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="parent-phone">Parent Phone</Label>
              <Input
                id="parent-phone"
                type="tel"
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parent-email">Parent Email</Label>
              <Input
                id="parent-email"
                type="email"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="referred-by">Referred By</Label>
            <Input id="referred-by" value={referredBy} onChange={(e) => setReferredBy(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !firstName || !lastName || !dateOfBirth || !gender}
            className="w-full"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSubmitting ? "Creating Patient..." : "Create Patient"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
