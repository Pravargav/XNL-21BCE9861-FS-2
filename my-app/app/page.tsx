import { Activity, Flame, Heart, Footprints } from "lucide-react"
import { ActivityChart } from "@/components/activity-chart"
import { Leaderboard } from "@/components/leaderboard"
import { StatsCard } from "@/components/stats-card"
import { WorkoutCard } from "@/components/workout-card"

const workouts = [
  {
    title: "HIIT Cardio Blast",
    description: "High-intensity interval training to boost your metabolism and burn calories.",
    duration: 30,
    intensity: "High" as const,
    calories: 350,
    image: "/placeholder.svg?height=160&width=320",
  },
  {
    title: "Full Body Strength",
    description: "Build muscle and increase strength with this comprehensive workout.",
    duration: 45,
    intensity: "Medium" as const,
    calories: 280,
    image: "/placeholder.svg?height=160&width=320",
  },
  {
    title: "Yoga Flow",
    description: "Improve flexibility and reduce stress with this calming yoga session.",
    duration: 60,
    intensity: "Low" as const,
    calories: 180,
    image: "/placeholder.svg?height=160&width=320",
  },
]

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, John! Heres your fitness summary.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Daily Steps" value="8,946" description="Goal: 10,000 steps" icon={Footprints} change={12} />
        <StatsCard title="Calories Burned" value="756" description="Goal: 850 calories" icon={Flame} change={-3} />
        <StatsCard title="Active Minutes" value="48" description="Goal: 60 minutes" icon={Activity} change={5} />
        <StatsCard title="Avg. Heart Rate" value="72 bpm" description="Resting: 65 bpm" icon={Heart} change={-2} />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3 lg:grid-cols-4">
        <ActivityChart />
        <Leaderboard />
      </div>

      <div className="mt-6">
        <h2 className="mb-4 text-2xl font-bold">Recommended Workouts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.title} {...workout} />
          ))}
        </div>
      </div>
    </div>
  )
}

