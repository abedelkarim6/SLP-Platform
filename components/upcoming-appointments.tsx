import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Video } from "lucide-react"

const appointments = [
  {
    id: 1,
    patient: "Alex Johnson",
    age: 8,
    time: "10:00 AM",
    duration: "45 min",
    disorder: "Articulation",
    type: "In-person",
    avatar: "AJ",
  },
  {
    id: 2,
    patient: "Emma Wilson",
    age: 12,
    time: "11:30 AM",
    duration: "45 min",
    disorder: "Fluency",
    type: "Virtual",
    avatar: "EW",
  },
  {
    id: 3,
    patient: "Michael Brown",
    age: 6,
    time: "1:15 PM",
    duration: "30 min",
    disorder: "Language Delay",
    type: "In-person",
    avatar: "MB",
  },
  {
    id: 4,
    patient: "Sophia Davis",
    age: 10,
    time: "2:30 PM",
    duration: "45 min",
    disorder: "Articulation",
    type: "Virtual",
    avatar: "SD",
  },
  {
    id: 5,
    patient: "Noah Martinez",
    age: 7,
    time: "4:00 PM",
    duration: "45 min",
    disorder: "Phonological",
    type: "In-person",
    avatar: "NM",
  },
]

export function UpcomingAppointments() {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{appointment.avatar}</AvatarFallback>
              <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{appointment.patient}</h4>
                <span className="text-xs text-muted-foreground">{appointment.age} yrs</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{appointment.time}</span>
                <span>•</span>
                <span>{appointment.duration}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={appointment.type === "Virtual" ? "outline" : "default"}>{appointment.disorder}</Badge>
            <Badge variant="outline">
              {appointment.type === "Virtual" ? <Video className="mr-1 h-3 w-3" /> : null}
              {appointment.type}
            </Badge>
            <Button variant="ghost" size="icon">
              <FileText className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
