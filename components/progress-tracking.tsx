"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface ProgressTrackingProps {
  clientId: number
}

export function ProgressTracking({ clientId }: ProgressTrackingProps) {
  // In a real app, you would fetch the progress data based on the client ID
  const progressData = [
    {
      name: "Jan",
      rSound: 20,
      sSound: 30,
    },
    {
      name: "Feb",
      rSound: 30,
      sSound: 45,
    },
    {
      name: "Mar",
      rSound: 40,
      sSound: 60,
    },
    {
      name: "Apr",
      rSound: 50,
      sSound: 75,
    },
  ]

  const currentSkills = [
    {
      skill: "/r/ sound in isolation",
      progress: 80,
    },
    {
      skill: "/r/ sound in initial position",
      progress: 65,
    },
    {
      skill: "/r/ sound in medial position",
      progress: 40,
    },
    {
      skill: "/r/ sound in final position",
      progress: 30,
    },
    {
      skill: "/r/ blends",
      progress: 20,
    },
    {
      skill: "/s/ sound in isolation",
      progress: 90,
    },
    {
      skill: "/s/ sound in initial position",
      progress: 85,
    },
    {
      skill: "/s/ sound in medial position",
      progress: 75,
    },
    {
      skill: "/s/ sound in final position",
      progress: 70,
    },
    {
      skill: "/s/ blends",
      progress: 60,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Progress Over Time</CardTitle>
          <CardDescription>Tracking accuracy percentage for target sounds</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis label={{ value: "Accuracy %", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="rSound" name="/r/ Sound" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="sSound" name="/s/ Sound" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Skills</CardTitle>
          <CardDescription>Current accuracy levels for specific skills</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="r-sound">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="r-sound">/r/ Sound</TabsTrigger>
              <TabsTrigger value="s-sound">/s/ Sound</TabsTrigger>
            </TabsList>
            <TabsContent value="r-sound" className="space-y-4 pt-4">
              {currentSkills
                .filter((skill) => skill.skill.includes("/r/"))
                .map((skill) => (
                  <div key={skill.skill} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
            </TabsContent>
            <TabsContent value="s-sound" className="space-y-4 pt-4">
              {currentSkills
                .filter((skill) => skill.skill.includes("/s/"))
                .map((skill) => (
                  <div key={skill.skill} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <span className="text-sm text-muted-foreground">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
