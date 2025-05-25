import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PatientInfo } from "@/components/patient-info"
import { SessionHistory } from "@/components/session-history"
import { AIRecommendations } from "@/components/ai-recommendations"
import { ProgressTracking } from "@/components/progress-tracking"
import { Calendar, FileText, Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ClientProfile({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the client data based on the ID
  const client = {
    id: Number.parseInt(params.id),
    name: "Alex Johnson",
    age: 8,
    gender: "Male",
    disorder: "Articulation",
    status: "Active",
    nextSession: "Today, 10:00 AM",
    progress: "Good",
    avatar: "AJ",
    parentName: "Sarah Johnson",
    parentPhone: "(555) 123-4567",
    parentEmail: "sarah.johnson@example.com",
    address: "123 Main St, Anytown, USA",
    startDate: "January 15, 2023",
    referredBy: "Dr. Emily Williams",
    notes: "Alex has difficulty with /r/ and /s/ sounds. Shows good progress with /s/ blends.",
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/clients">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Patient Profile</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle>{client.name}</CardTitle>
              <CardDescription>Patient #{client.id}</CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl">{client.avatar}</AvatarFallback>
                <AvatarImage src={`/placeholder.svg?height=96&width=96`} />
              </Avatar>
              <div className="flex flex-wrap gap-2">
                <Badge>{client.age} years old</Badge>
                <Badge>{client.gender}</Badge>
                <Badge variant="outline">{client.disorder}</Badge>
                <Badge
                  variant={
                    client.status === "Active" ? "default" : client.status === "On Hold" ? "secondary" : "outline"
                  }
                >
                  {client.status}
                </Badge>
              </div>
              <div className="grid w-full grid-cols-2 gap-4">
                <Button className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Report
                </Button>
              </div>
            </div>
            <div className="mt-6">
              <PatientInfo client={client} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <Tabs defaultValue="sessions">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="ai">AI Insights</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sessions">
              <TabsContent value="sessions">
                <SessionHistory clientId={client.id} />
              </TabsContent>
              <TabsContent value="progress">
                <ProgressTracking clientId={client.id} />
              </TabsContent>
              <TabsContent value="ai">
                <AIRecommendations clientId={client.id} />
              </TabsContent>
              <TabsContent value="documents">
                <div className="flex flex-col gap-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Initial Assessment</h3>
                    <p className="text-sm text-muted-foreground">Uploaded on January 15, 2023</p>
                    <Button variant="link" className="px-0">
                      View Document
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Progress Report - Q1 2023</h3>
                    <p className="text-sm text-muted-foreground">Uploaded on March 30, 2023</p>
                    <Button variant="link" className="px-0">
                      View Document
                    </Button>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium">Progress Report - Q2 2023</h3>
                    <p className="text-sm text-muted-foreground">Uploaded on June 30, 2023</p>
                    <Button variant="link" className="px-0">
                      View Document
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
