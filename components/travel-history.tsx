"use client"

import { CalendarDays, MapPin, Train, Bus } from "lucide-react"
import { motion } from "framer-motion"

const travelHistory = [
  {
    id: 1,
    from: "Mumbai",
    to: "Delhi",
    date: "March 15, 2025",
    mode: "Train",
    icon: Train,
  },
  {
    id: 2,
    from: "Delhi",
    to: "Jaipur",
    date: "February 22, 2025",
    mode: "Bus",
    icon: Bus,
  },
  {
    id: 3,
    from: "Jaipur",
    to: "Mumbai",
    date: "February 25, 2025",
    mode: "Train",
    icon: Train,
  },
]

export default function TravelHistory() {
  return (
    <div className="relative pl-6 border-l">
      {travelHistory.map((trip, index) => (
        <motion.div
          key={trip.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.2 }}
          className="mb-6 relative"
        >
          <div className="absolute -left-[25px] h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <trip.icon className="h-5 w-5" />
          </div>
          <div className="pt-1">
            <h3 className="font-medium">
              {trip.from} → {trip.to}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <CalendarDays className="mr-1 h-4 w-4" />
              <span>{trip.date}</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="mr-1 h-4 w-4" />
              <span>
                {trip.mode} #{1000 + trip.id}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
