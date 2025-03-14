import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  description: string
  icon: LucideIcon
  change?: number
}

export function StatsCard({ title, value, description, icon: Icon, change }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {change !== undefined && (
          <div className={`mt-1 text-xs ${change >= 0 ? "text-green-500" : "text-red-500"}`}>
            {change >= 0 ? "+" : ""}
            {change}% from last week
          </div>
        )}
      </CardContent>
    </Card>
  )
}

