"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LeaderboardUser {
  id: number
  name: string
  avatar: string
  score: number
  rank: number
}

const leaderboardData: LeaderboardUser[] = [
  { id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg", score: 12500, rank: 1 },
  { id: 2, name: "Michael Chen", avatar: "/placeholder.svg", score: 11200, rank: 2 },
  { id: 3, name: "Emma Wilson", avatar: "/placeholder.svg", score: 10800, rank: 3 },
  { id: 4, name: "James Miller", avatar: "/placeholder.svg", score: 9500, rank: 4 },
  { id: 5, name: "Olivia Davis", avatar: "/placeholder.svg", score: 8900, rank: 5 },
]

export function Leaderboard() {
  const [challenge, setChallenge] = useState("steps")

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Leaderboard</CardTitle>
            <CardDescription>See how you rank against others</CardDescription>
          </div>
          <Select defaultValue={challenge} onValueChange={setChallenge}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select challenge" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="steps">Steps Challenge</SelectItem>
              <SelectItem value="workout">Workout Streak</SelectItem>
              <SelectItem value="weight">Weight Loss</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((user) => (
            <div key={user.id} className="flex items-center justify-between rounded-lg p-2 hover:bg-muted">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {user.rank}
                </div>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {challenge === "steps" && `${user.score.toLocaleString()} steps`}
                    {challenge === "workout" && `${Math.floor(user.score / 1000)} day streak`}
                    {challenge === "weight" && `${(user.score / 1000).toFixed(1)} kg lost`}
                  </p>
                </div>
              </div>
              <div className="text-sm font-semibold">
                {user.rank === 1 && "🥇"}
                {user.rank === 2 && "🥈"}
                {user.rank === 3 && "🥉"}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

