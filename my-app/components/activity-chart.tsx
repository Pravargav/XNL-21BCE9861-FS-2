"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: "Mon", steps: 8000, calories: 2400, heartRate: 70 },
  { name: "Tue", steps: 9800, calories: 2800, heartRate: 72 },
  { name: "Wed", steps: 7000, calories: 2200, heartRate: 68 },
  { name: "Thu", steps: 10500, calories: 3000, heartRate: 75 },
  { name: "Fri", steps: 8500, calories: 2600, heartRate: 71 },
  { name: "Sat", steps: 6000, calories: 1800, heartRate: 65 },
  { name: "Sun", steps: 7500, calories: 2300, heartRate: 69 },
]

export function ActivityChart() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const textColor = isDark ? "#f8fafc" : "#0f172a"
  const gridColor = isDark ? "#334155" : "#e2e8f0"

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Activity Overview</CardTitle>
        <CardDescription>Your weekly activity metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" stroke={textColor} />
              <YAxis stroke={textColor} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1e293b" : "#ffffff",
                  color: textColor,
                  border: `1px solid ${gridColor}`,
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="steps" stroke="#3b82f6" activeDot={{ r: 8 }} strokeWidth={2} />
              <Line type="monotone" dataKey="calories" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="heartRate" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

