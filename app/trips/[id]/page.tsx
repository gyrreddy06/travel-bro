"use client"

import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, MapPin, Calendar, Train, Users, MessageSquare, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function TripDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const { trips } = useAppStore()

  const trip = trips.find((t) => t.id === id)

  if (!trip) {
    return <div>Trip not found</div>
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${trip.from} to ${trip.to} Trip`,
        text: `Join me on my trip from ${trip.from} to ${trip.to} on ${new Date(trip.date).toLocaleDateString()}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="py-4 px-4 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Trip Details</h1>
        </div>
        <Button variant="outline" size="sm" onClick={handleShare} className="rounded-full">
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle className="flex items-center">
              <Train className="mr-2 h-5 w-5 text-primary" />
              {trip.from} → {trip.to}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Trip Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Date</span>
                </div>
                <p className="font-medium">{new Date(trip.date).toLocaleDateString()}</p>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Train className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Train</span>
                </div>
                <p className="font-medium">#{trip.trainNumber}</p>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Route</span>
                </div>
                <p className="font-medium">
                  {trip.from} - {trip.to}
                </p>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Travelers</span>
                </div>
                <p className="font-medium">{trip.participants.length} people</p>
              </div>
            </div>

            {/* Co-Travelers */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Users className="h-4 w-4 mr-2 text-primary" />
                Co-Travelers ({trip.participants.length})
              </h3>
              <div className="space-y-3">
                {trip.participants.map((participant, index) => (
                  <motion.div
                    key={participant.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                        <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{participant.name}</h4>
                        <p className="text-xs text-muted-foreground">{participant.location}</p>
                      </div>
                    </div>
                    <Link href={`/chat/${participant.id}`}>
                      <Button size="sm" variant="outline" className="rounded-full">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Chat
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Link href={`/booking/${trip.id}`} className="flex-1">
                <Button className="w-full rounded-full">View Booking</Button>
              </Link>
              <Link href="/chat/group">
                <Button variant="outline" className="rounded-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Group Chat
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
