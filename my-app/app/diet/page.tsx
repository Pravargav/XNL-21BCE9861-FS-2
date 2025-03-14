"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Apple, Beef, Carrot, Egg, Fish, Salad } from "lucide-react"

const COLORS = ["#10b981", "#3b82f6", "#ef4444", "#f59e0b"]

const calorieData = [
  { name: "Protein", value: 30 },
  { name: "Carbs", value: 40 },
  { name: "Fat", value: 20 },
  { name: "Fiber", value: 10 },
]

const mealPlans = [
  {
    id: "balanced",
    name: "Balanced Diet",
    description: "A well-balanced diet with optimal macronutrient distribution",
    meals: [
      {
        time: "Breakfast",
        name: "Greek Yogurt with Berries",
        calories: 320,
        protein: 20,
        carbs: 30,
        fat: 10,
        icon: Apple,
      },
      {
        time: "Lunch",
        name: "Grilled Chicken Salad",
        calories: 450,
        protein: 35,
        carbs: 25,
        fat: 15,
        icon: Salad,
      },
      {
        time: "Dinner",
        name: "Baked Salmon with Vegetables",
        calories: 520,
        protein: 40,
        carbs: 30,
        fat: 20,
        icon: Fish,
      },
      {
        time: "Snack",
        name: "Protein Smoothie",
        calories: 220,
        protein: 15,
        carbs: 20,
        fat: 5,
        icon: Carrot,
      },
    ],
  },
  {
    id: "keto",
    name: "Ketogenic Diet",
    description: "High-fat, low-carb diet to promote ketosis",
    meals: [
      {
        time: "Breakfast",
        name: "Avocado and Eggs",
        calories: 380,
        protein: 18,
        carbs: 5,
        fat: 32,
        icon: Egg,
      },
      {
        time: "Lunch",
        name: "Tuna Salad with Olive Oil",
        calories: 420,
        protein: 35,
        carbs: 3,
        fat: 30,
        icon: Fish,
      },
      {
        time: "Dinner",
        name: "Ribeye Steak with Asparagus",
        calories: 580,
        protein: 45,
        carbs: 8,
        fat: 40,
        icon: Beef,
      },
      {
        time: "Snack",
        name: "Cheese and Nuts",
        calories: 280,
        protein: 12,
        carbs: 4,
        fat: 24,
        icon: Carrot,
      },
    ],
  },
]

export default function DietPage() {
  const [selectedPlan, setSelectedPlan] = useState("balanced")
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([])

  const currentPlan = mealPlans.find((plan) => plan.id === selectedPlan) || mealPlans[0]

  const totalCalories = currentPlan.meals.reduce((sum, meal) => sum + meal.calories, 0)

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Diet Plan</h1>
        <p className="text-muted-foreground">Personalized nutrition recommendations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>AI-Generated Meal Plan</CardTitle>
              <CardDescription>Customized based on your goals and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Label htmlFor="meal-plan">Select Meal Plan</Label>
                <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                  <SelectTrigger id="meal-plan" className="w-full">
                    <SelectValue placeholder="Select a meal plan" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealPlans.map((plan) => (
                      <SelectItem key={plan.id} value={plan.id}>
                        {plan.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 font-medium">{currentPlan.name}</h3>
                <p className="text-sm text-muted-foreground">{currentPlan.description}</p>
              </div>

              <div className="space-y-4">
                {currentPlan.meals.map((meal, index) => {
                  const Icon = meal.icon
                  return (
                    <div key={index} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{meal.time}</h4>
                            <p className="text-sm">{meal.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{meal.calories} cal</p>
                          <p className="text-xs text-muted-foreground">
                            P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Generate New Plan</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Nutrition</CardTitle>
              <CardDescription>Macronutrient breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-center">
                <div className="text-3xl font-bold">{totalCalories}</div>
                <p className="text-sm text-muted-foreground">Total Calories</p>
              </div>

              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={calorieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {calorieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dietary Preferences</CardTitle>
              <CardDescription>Customize your meal plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegetarian"
                    checked={dietaryPreferences.includes("vegetarian")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setDietaryPreferences([...dietaryPreferences, "vegetarian"])
                      } else {
                        setDietaryPreferences(dietaryPreferences.filter((pref) => pref !== "vegetarian"))
                      }
                    }}
                  />
                  <Label htmlFor="vegetarian">Vegetarian</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vegan"
                    checked={dietaryPreferences.includes("vegan")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setDietaryPreferences([...dietaryPreferences, "vegan"])
                      } else {
                        setDietaryPreferences(dietaryPreferences.filter((pref) => pref !== "vegan"))
                      }
                    }}
                  />
                  <Label htmlFor="vegan">Vegan</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="gluten-free"
                    checked={dietaryPreferences.includes("gluten-free")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setDietaryPreferences([...dietaryPreferences, "gluten-free"])
                      } else {
                        setDietaryPreferences(dietaryPreferences.filter((pref) => pref !== "gluten-free"))
                      }
                    }}
                  />
                  <Label htmlFor="gluten-free">Gluten-Free</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dairy-free"
                    checked={dietaryPreferences.includes("dairy-free")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setDietaryPreferences([...dietaryPreferences, "dairy-free"])
                      } else {
                        setDietaryPreferences(dietaryPreferences.filter((pref) => pref !== "dairy-free"))
                      }
                    }}
                  />
                  <Label htmlFor="dairy-free">Dairy-Free</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="keto"
                    checked={dietaryPreferences.includes("keto")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setDietaryPreferences([...dietaryPreferences, "keto"])
                      } else {
                        setDietaryPreferences(dietaryPreferences.filter((pref) => pref !== "keto"))
                      }
                    }}
                  />
                  <Label htmlFor="keto">Ketogenic</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Preferences</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

