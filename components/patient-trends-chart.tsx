"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    month: "Jan",
    articulation: 12,
    language: 8,
    fluency: 15,
    phonological: 10,
    voice: 7,
  },
  {
    month: "Feb",
    articulation: 15,
    language: 10,
    fluency: 18,
    phonological: 12,
    voice: 9,
  },
  {
    month: "Mar",
    articulation: 18,
    language: 12,
    fluency: 20,
    phonological: 15,
    voice: 11,
  },
  {
    month: "Apr",
    articulation: 22,
    language: 15,
    fluency: 23,
    phonological: 18,
    voice: 14,
  },
]

export function PatientTrendsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis label={{ value: "Improvement %", angle: -90, position: "insideLeft" }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="articulation" name="Articulation" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="language" name="Language" stroke="#82ca9d" />
        <Line type="monotone" dataKey="fluency" name="Fluency" stroke="#ffc658" />
        <Line type="monotone" dataKey="phonological" name="Phonological" stroke="#ff8042" />
        <Line type="monotone" dataKey="voice" name="Voice" stroke="#0088fe" />
      </LineChart>
    </ResponsiveContainer>
  )
}
