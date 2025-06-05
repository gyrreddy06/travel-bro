"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wifi, Coffee, ArrowRight, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

const trainBookings = [
  {
    id: 1,
    name: "Rajdhani Express",
    number: "12952",
    from: "Mumbai",
    to: "Delhi",
    departure: "21:35",
    arrival: "08:15",
    duration: "10h 40m",
    date: "May 15, 2025",
    price: 1250,
    availability: "Available",
    amenities: ["Wifi", "Food", "Charging"],
    class: "3A",
  },
  {
    id: 2,
    name: "Duronto Express",
    number: "12264",
    from: "Mumbai",
    to: "Delhi",
    departure: "23:05",
    arrival: "10:25",
    duration: "11h 20m",
    date: "May 15, 2025",
    price: 1100,
    availability: "WL 5",
    amenities: ["Food", "Charging"],
    class: "SL",
  },
  {
    id: 3,
    name: "Garib Rath",
    number: "12910",
    from: "Mumbai",
    to: "Delhi",
    departure: "17:10",
    arrival: "06:45",
    duration: "13h 35m",
    date: "May 15, 2025",
    price: 850,
    availability: "Available",
    amenities: ["Charging"],
    class: "3A",
  },
]

const busBookings = [
  {
    id: 1,
    name: "Volvo A/C Sleeper",
    operator: "Sharma Travels",
    from: "Mumbai",
    to: "Delhi",
    departure: "20:00",
    arrival: "14:30",
    duration: "18h 30m",
    date: "May 15, 2025",
    price: 1500,
    availability: "12 seats left",
    amenities: ["Wifi", "Charging", "Water Bottle"],
    type: "A/C Sleeper",
  },
  {
    id: 2,
    name: "Mercedes A/C Seater",
    operator: "Royal Travels",
    from: "Mumbai",
    to: "Delhi",
    departure: "19:30",
    arrival: "15:00",
    duration: "19h 30m",
    date: "May 15, 2025",
    price: 1300,
    availability: "5 seats left",
    amenities: ["Wifi", "Charging", "TV"],
    type: "A/C Seater",
  },
  {
    id: 3,
    name: "Non A/C Sleeper",
    operator: "Patel Travels",
    from: "Mumbai",
    to: "Delhi",
    departure: "18:00",
    arrival: "14:00",
    duration: "20h 00m",
    date: "May 15, 2025",
    price: 900,
    availability: "20 seats left",
    amenities: ["Water Bottle"],
    type: "Non A/C Sleeper",
  },
]

export default function BookingList({ type = "train" }) {
  const bookings = type === "train" ? trainBookings : busBookings

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Available {type === "train" ? "Trains" : "Buses"}</h2>
        <Button variant="outline" size="sm" className="rounded-full flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>May 15, 2025</span>
        </Button>
      </div>

      {bookings.map((booking, index) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="card-3d border-2 border-primary/10 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{booking.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {type === "train" ? `#${booking.number}` : booking.operator} • {booking.class || booking.type}
                  </p>
                </div>
                <Badge
                  variant={booking.availability.includes("Available") ? "outline" : "secondary"}
                  className="rounded-full"
                >
                  {booking.availability}
                </Badge>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="text-center">
                  <p className="text-lg font-bold">{booking.departure}</p>
                  <p className="text-sm">{booking.from}</p>
                </div>
                <div className="flex-1 mx-4 flex flex-col items-center">
                  <p className="text-xs text-muted-foreground">{booking.duration}</p>
                  <div className="w-full h-0.5 bg-primary/20 relative my-1">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex gap-1">
                    {booking.amenities.includes("Wifi") && <Wifi className="h-3 w-3 text-muted-foreground" />}
                    {booking.amenities.includes("Food") && <Coffee className="h-3 w-3 text-muted-foreground" />}
                    {booking.amenities.includes("Charging") && <div className="text-xs text-muted-foreground">🔌</div>}
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold">{booking.arrival}</p>
                  <p className="text-sm">{booking.to}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0 border-t mt-4">
              <div>
                <p className="text-lg font-bold">₹{booking.price}</p>
                <p className="text-xs text-muted-foreground">per person</p>
              </div>
              <Button className="rounded-full">
                Book Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
