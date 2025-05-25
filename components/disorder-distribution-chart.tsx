"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Articulation", value: 15, color: "#8884d8" },
  { name: "Language Delay", value: 10, color: "#82ca9d" },
  { name: "Fluency", value: 8, color: "#ffc658" },
  { name: "Phonological", value: 5, color: "#ff8042" },
  { name: "Voice", value: 4, color: "#0088fe" },
]

export function DisorderDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
