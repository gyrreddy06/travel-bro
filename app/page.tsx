"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ShoppingCart, Gamepad2, FileText, ArrowRight, Calendar, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"
import SocketService from "@/lib/socket"
import FriendRequests from "@/components/friend-requests"
import SocialFeed from "@/components/social-feed"

export default function HomePage() {
  const { user, chats, trips } = useAppStore()

  useEffect(() => {
    if (user) {
      const socket = SocketService.getInstance().connect(user.id)

      socket.on("friend_request_received", (request) => {
        useAppStore.getState().addFriendRequest(request)
      })

      socket.on("message_received", (data) => {
        useAppStore.getState().addMessage(data.chatId, data.message)
      })

      return () => {
        SocketService.getInstance().disconnect()
      }
    }
  }, [user])

  const upcomingTrip = trips.find((trip) => trip.status === "upcoming")
  const recentChats = chats.slice(0, 2)

  return (
    <div className="py-4 px-4 space-y-6">
      {/* Welcome Header */}
      <div className="h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 relative">
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 text-white">
          <h2 className="text-2xl font-bold">Welcome back, {user?.name?.split(" ")[0]}!</h2>
          <p className="text-sm opacity-90">Ready for your next adventure?</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold">
              TB
            </div>
          </div>
        </div>
      </div>

      {/* Friend Requests */}
      <FriendRequests />

      {/* Upcoming Trips Card */}
      {upcomingTrip && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="card-3d border-2 border-primary/20 overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Upcoming Trips
              </CardTitle>
              <CardDescription>Your scheduled journeys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border p-3 bg-muted/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12"></div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">
                      {upcomingTrip.from} → {upcomingTrip.to}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Train #{upcomingTrip.trainNumber} • {new Date(upcomingTrip.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Link href={`/trips/${upcomingTrip.id}`}>
                    <Button size="sm" variant="outline" className="rounded-full">
                      View
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {upcomingTrip.participants.slice(0, 3).map((participant, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border-2 border-background"
                      >
                        <span className="text-xs font-medium">{participant.name.charAt(0)}</span>
                      </div>
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{upcomingTrip.participants.length} co-travelers</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Recent Messages Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Recent Messages
              </CardTitle>
              <Link href="/chat" className="text-sm text-primary flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentChats.map((chat, i) => {
                const otherParticipant = chat.participants.find((p) => p.id !== user?.id)
                return (
                  <Link key={chat.id} href={`/chat/${chat.id}`}>
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                        <span className="text-sm font-medium">{otherParticipant?.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-sm">{otherParticipant?.name}</h4>
                          <span className="text-xs text-muted-foreground">
                            {chat.lastMessage
                              ? new Date(chat.lastMessage.timestamp).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : ""}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {chat.lastMessage?.text || "No messages yet"}
                        </p>
                      </div>
                      {chat.unreadCount > 0 && (
                        <div className="h-5 w-5 rounded-full bg-secondary flex items-center justify-center text-[10px] text-secondary-foreground">
                          {chat.unreadCount}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            title: "Find Travelers",
            icon: MapPin,
            href: "/find-travelers",
            color: "from-blue-500 to-blue-600",
            delay: 0.3,
          },
          {
            title: "Book Tickets",
            icon: ShoppingCart,
            href: "/booking",
            color: "from-secondary to-orange-600",
            delay: 0.4,
          },
          { title: "Play Games", icon: Gamepad2, href: "/games", color: "from-purple-500 to-purple-600", delay: 0.5 },
          { title: "Travel Feed", icon: FileText, href: "/feed", color: "from-accent to-green-600", delay: 0.6 },
        ].map((action, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: action.delay }}
          >
            <Link href={action.href}>
              <Card className="h-full hover:shadow-md transition-all card-3d border-2 border-primary/10 overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className={`p-3 rounded-full bg-gradient-to-r ${action.color} mb-3 text-white`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium">{action.title}</h3>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Social Feed */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Travel Stories</h2>
          <Link href="/feed">
            <Button variant="outline" size="sm" className="rounded-full">
              View All
            </Button>
          </Link>
        </div>
        <SocialFeed />
      </motion.div>
    </div>
  )
}
