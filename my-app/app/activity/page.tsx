"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  Clock,
  Dumbbell,
  Flame,
  Play,
  Plus,
  MonitorIcon as Running,
  Square,
  Timer,
  Heart,
} from "lucide-react"

export default function ActivityPage() {
  const [workoutType, setWorkoutType] = useState("")
  const [duration, setDuration] = useState(30)
  const [intensity, setIntensity] = useState(50)
  const [isTracking, setIsTracking] = useState(false)
  const [progress, setProgress] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  const handleStartTracking = () => {
    setIsTracking(true)
    setProgress(0)
    setElapsedTime(0)

    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsTracking(false)
          return 100
        }
        return newProgress
      })

      setElapsedTime((prev) => prev + 1)
    }, 1000)
  }

  const handleStopTracking = () => {
    setIsTracking(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Activity Tracking</h1>
        <p className="text-muted-foreground">Log and track your workouts</p>
      </div>

      <Tabs defaultValue="log" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="log">Log Workout</TabsTrigger>
          <TabsTrigger value="track">Track Workout</TabsTrigger>
        </TabsList>

        <TabsContent value="log">
          <Card>
            <CardHeader>
              <CardTitle>Log a New Workout</CardTitle>
              <CardDescription>Record your completed workout details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="workout-type">Workout Type</Label>
                <Select value={workoutType} onValueChange={setWorkoutType}>
                  <SelectTrigger id="workout-type">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="strength">Strength Training</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="hiit">HIIT</SelectItem>
                    <SelectItem value="pilates">Pilates</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Input id="date" type="date" />
                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <div className="relative">
                    <Input id="time" type="time" />
                    <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Duration (minutes): {duration}</Label>
                <Slider
                  value={[duration]}
                  min={5}
                  max={120}
                  step={5}
                  onValueChange={(value) => setDuration(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Intensity: {intensity}%</Label>
                <Slider
                  value={[intensity]}
                  min={10}
                  max={100}
                  step={10}
                  onValueChange={(value) => setIntensity(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="calories">Calories Burned (estimated)</Label>
                <div className="relative">
                  <Input id="calories" type="number" placeholder="e.g., 350" />
                  <Flame className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Add any notes about your workout..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Log Workout
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="track">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Workout Tracking</CardTitle>
              <CardDescription>Track your workout as you go</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="live-workout-type">Workout Type</Label>
                <Select>
                  <SelectTrigger id="live-workout-type">
                    <SelectValue placeholder="Select workout type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="running">
                      <div className="flex items-center">
                        <Running className="mr-2 h-4 w-4" />
                        <span>Running</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="strength">
                      <div className="flex items-center">
                        <Dumbbell className="mr-2 h-4 w-4" />
                        <span>Strength Training</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="hiit">
                      <div className="flex items-center">
                        <Timer className="mr-2 h-4 w-4" />
                        <span>HIIT</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Current Session</h3>
                    <p className="text-sm text-muted-foreground">{isTracking ? "In progress" : "Ready to start"}</p>
                  </div>
                  <div className="text-2xl font-bold font-mono">{formatTime(elapsedTime)}</div>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex justify-center">
                  {!isTracking ? (
                    <Button onClick={handleStartTracking} className="w-full">
                      <Play className="mr-2 h-4 w-4" /> Start Tracking
                    </Button>
                  ) : (
                    <Button onClick={handleStopTracking} variant="destructive" className="w-full">
                      <Square className="mr-2 h-4 w-4" /> Stop Tracking
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border p-4 text-center">
                  <Clock className="mx-auto mb-2 h-5 w-5 text-muted-foreground" />
                  <div className="text-2xl font-bold">{formatTime(elapsedTime)}</div>
                  <p className="text-xs text-muted-foreground">Time</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <Flame className="mx-auto mb-2 h-5 w-5 text-red-500" />
                  <div className="text-2xl font-bold">{Math.round(elapsedTime * 0.4)}</div>
                  <p className="text-xs text-muted-foreground">Calories</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <Heart className="mx-auto mb-2 h-5 w-5 text-pink-500" />
                  <div className="text-2xl font-bold">{70 + Math.round(progress * 0.5)}</div>
                  <p className="text-xs text-muted-foreground">Heart Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

