import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Users, CalendarIcon, CheckCircle, Clock, ArrowUpRight, Brain } from "lucide-react"
import { UpcomingAppointments } from "@/components/upcoming-appointments"
import { TasksList } from "@/components/tasks-list"
import { PatientsByDisorder } from "@/components/patients-by-disorder"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Dr. Johnson. Here's an overview of your practice.</p>
        </div>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">3 remaining today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12/15</div>
            <Progress value={80} className="h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Session Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 min</div>
            <p className="text-xs text-muted-foreground">-5 min from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Your schedule for the month</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" className="rounded-md border" />
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>You have 5 appointments scheduled for today</CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingAppointments />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Tasks</CardTitle>
              <CardDescription>Your tasks for this week</CardDescription>
            </CardHeader>
            <CardContent>
              <TasksList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Patients by Disorder</CardTitle>
                <Button variant="outline" size="sm">
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardHeader>
              <CardContent className="pt-4">
                <PatientsByDisorder />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Recent AI Insights</CardTitle>
                <Button variant="outline" size="sm">
                  <Brain className="mr-2 h-4 w-4" />
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-4 rounded-lg border p-3">
                      <Brain className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">Patient Progress Insight</h4>
                        <p className="text-sm text-muted-foreground">
                          Alex has shown significant improvement in articulation exercises. Consider increasing
                          complexity in next session.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
