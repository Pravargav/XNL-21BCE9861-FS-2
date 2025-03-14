import { Clock, Dumbbell, Flame } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface WorkoutCardProps {
  title: string
  description: string
  duration: number
  intensity: "Low" | "Medium" | "High"
  calories: number
  image: string
}

export function WorkoutCard({ title, description, duration, intensity, calories, image }: WorkoutCardProps) {
  const intensityColor = {
    Low: "bg-green-500",
    Medium: "bg-yellow-500",
    High: "bg-red-500",
  }

  return (
    <Card className="overflow-hidden">
      <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className={intensityColor[intensity]}>
            {intensity}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="h-4 w-4 text-red-500" />
            <span>{calories} cal</span>
          </div>
          <div className="flex items-center gap-1">
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
            <span>Strength</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Start Workout</Button>
      </CardFooter>
    </Card>
  )
}

