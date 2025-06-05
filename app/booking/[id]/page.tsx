"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Clock,
  Users,
  Ticket,
  QrCode,
  Share2,
  Download,
  Train,
  Coffee,
  Wifi,
  Smartphone,
  AlertTriangle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function BookingDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const [activeTab, setActiveTab] = useState("details")

  // Mock data for the booking
  const booking = {
    id: id,
    name: "Rajdhani Express",
    number: "12952",
    from: "Mumbai",
    to: "Delhi",
    departure: "21:35",
    departureDate: "May 15, 2025",
    arrival: "08:15",
    arrivalDate: "May 16, 2025",
    duration: "10h 40m",
    price: 1250,
    status: "Confirmed",
    class: "3A",
    coach: "B4",
    seat: "32 (Lower)",
    pnr: "2457896541",
    amenities: ["Wifi", "Food", "Charging"],
    coTravelers: [
      { name: "Rahul Singh", avatar: "/placeholder.svg?height=40&width=40", status: "Confirmed" },
      { name: "Priya Sharma", avatar: "/placeholder.svg?height=40&width=40", status: "Confirmed" },
      { name: "Amit Kumar", avatar: "/placeholder.svg?height=40&width=40", status: "Pending" },
    ],
    stations: [
      { name: "Mumbai Central", time: "21:35", status: "Departed", progress: 100 },
      { name: "Surat", time: "00:15", status: "Departed", progress: 100 },
      { name: "Vadodara", time: "01:55", status: "Departed", progress: 100 },
      { name: "Ahmedabad", time: "03:35", status: "In Transit", progress: 50 },
      { name: "Jaipur", time: "06:10", status: "Upcoming", progress: 0 },
      { name: "Delhi", time: "08:15", status: "Upcoming", progress: 0 },
    ],
  }

  return (
    <div className="py-4 px-4 space-y-6">
      <div className="flex items-center mb-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Booking Details</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Train className="mr-2 h-5 w-5 text-primary" />
                {booking.name}
              </CardTitle>
              <Badge variant="outline" className="rounded-full">
                {booking.status}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              #{booking.number} • PNR: {booking.pnr}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full rounded-none border-b">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="travelers">Co-Travelers</TabsTrigger>
                <TabsTrigger value="journey">Journey</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-lg font-bold">{booking.departure}</p>
                    <p className="text-sm">{booking.from}</p>
                    <p className="text-xs text-muted-foreground">{booking.departureDate}</p>
                  </div>
                  <div className="flex-1 mx-4 flex flex-col items-center">
                    <p className="text-xs text-muted-foreground">{booking.duration}</p>
                    <div className="w-full h-0.5 bg-primary/20 relative my-1">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="flex gap-1">
                      {booking.amenities.includes("Wifi") && <Wifi className="h-3 w-3 text-muted-foreground" />}
                      {booking.amenities.includes("Food") && <Coffee className="h-3 w-3 text-muted-foreground" />}
                      {booking.amenities.includes("Charging") && (
                        <div className="text-xs text-muted-foreground">🔌</div>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{booking.arrival}</p>
                    <p className="text-sm">{booking.to}</p>
                    <p className="text-xs text-muted-foreground">{booking.arrivalDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Class</p>
                    <p className="font-medium">{booking.class}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Seat</p>
                    <p className="font-medium">
                      {booking.coach} • {booking.seat}
                    </p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="font-medium">₹{booking.price}</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground">Payment</p>
                    <p className="font-medium">Completed</p>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <div className="bg-muted/50 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-primary" />
                  </div>
                </div>

                <div className="flex justify-between mt-4">
                  <Button variant="outline" className="rounded-full flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                  <Button variant="outline" className="rounded-full flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    <span>Download</span>
                  </Button>
                  <Button variant="outline" className="rounded-full flex items-center gap-1">
                    <Smartphone className="h-4 w-4" />
                    <span>Add to Wallet</span>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="travelers" className="p-4 space-y-4">
                <div className="space-y-3">
                  {booking.coTravelers.map((traveler, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={traveler.avatar} alt={traveler.name} />
                          <AvatarFallback>{traveler.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{traveler.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            Seat: {booking.coach} • {Number.parseInt(booking.seat) + index}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={traveler.status === "Confirmed" ? "outline" : "secondary"}
                        className="rounded-full"
                      >
                        {traveler.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <Button className="w-full rounded-full mt-4">
                  <Users className="mr-2 h-4 w-4" />
                  Invite More Travelers
                </Button>

                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg flex items-start gap-3 mt-4">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-sm">Travel Advisory</h3>
                    <p className="text-xs text-muted-foreground">
                      Please arrive at the station at least 30 minutes before departure.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="journey" className="p-4 space-y-4">
                <div className="space-y-4">
                  {booking.stations.map((station, index) => (
                    <div key={index} className="relative">
                      {index < booking.stations.length - 1 && (
                        <div className="absolute top-6 bottom-0 left-4 w-0.5 bg-primary/20"></div>
                      )}
                      <div className="flex items-start gap-3">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center z-10 
                          ${
                            station.status === "Departed"
                              ? "bg-primary text-primary-foreground"
                              : station.status === "In Transit"
                                ? "bg-yellow-500 text-white"
                                : "bg-muted border border-primary/20"
                          }`}
                        >
                          {station.status === "Departed" ? "✓" : station.status === "In Transit" ? "•" : "○"}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{station.name}</h3>
                            <span className="text-sm">{station.time}</span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <span
                              className={`text-xs ${
                                station.status === "Departed"
                                  ? "text-primary"
                                  : station.status === "In Transit"
                                    ? "text-yellow-500"
                                    : "text-muted-foreground"
                              }`}
                            >
                              {station.status}
                            </span>
                            {station.status === "In Transit" && (
                              <Progress value={station.progress} className="h-1 w-20" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-muted/50 p-3 rounded-lg mt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Current Status</p>
                      <p className="font-medium">On Time</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Clock className="h-4 w-4 mr-1" />
                      Live Status
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <Button className="w-full rounded-full">
              <Ticket className="mr-2 h-4 w-4" />
              View E-Ticket
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
