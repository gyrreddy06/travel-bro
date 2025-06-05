"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Edit, MapPin, Calendar, Award } from "lucide-react"
import TravelHistory from "@/components/travel-history"
import { motion } from "framer-motion"

export default function ProfilePage() {
  return (
    <div className="py-4 px-4 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center md:flex-row md:text-left md:items-start md:gap-6">
              <div className="relative mb-4 md:mb-0">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white">
                  JS
                </div>
                <Button size="icon" variant="outline" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">John Smith</h2>
                <p className="text-muted-foreground">Travel enthusiast | Photographer | Food lover</p>
                <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-1 h-4 w-4" />
                    <span>Mumbai, India</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>Joined May 2023</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Photography", "Hiking", "Food", "Music"].map((interest) => (
                    <span
                      key={interest}
                      className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="mt-4 md:mt-0 rounded-full">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2"
        >
          <Card className="card-3d border-2 border-primary/20 overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" />
                Travel History
              </CardTitle>
              <CardDescription>Your past journeys</CardDescription>
            </CardHeader>
            <CardContent>
              <TravelHistory />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="card-3d border-2 border-primary/20 overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-primary" />
                Badges & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-32 mb-4 flex items-center justify-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Award className="h-16 w-16 text-primary" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { name: "Explorer", icon: "🧭", description: "Visited 5+ cities" },
                  { name: "Social", icon: "👥", description: "Connected with 10+ travelers" },
                  { name: "Gamer", icon: "🎮", description: "Won 3+ games" },
                  { name: "Verified", icon: "✅", description: "Verified profile" },
                  { name: "Punctual", icon: "⏰", description: "Always on time" },
                  { name: "Helpful", icon: "🤝", description: "Helped 5+ travelers" },
                ].map((badge) => (
                  <div key={badge.name} className="flex flex-col items-center text-center">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-lg mb-1">
                      {badge.icon}
                    </div>
                    <h3 className="text-xs font-medium">{badge.name}</h3>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
