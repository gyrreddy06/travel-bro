"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Star, MessageSquare, UserCheck } from "lucide-react"
import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"
import SocketService from "@/lib/socket"
import { toast } from "sonner"

const travelers = [
  {
    id: "user-2",
    name: "Priya Sharma",
    interests: ["Reading", "Photography", "Hiking"],
    status: "Confirmed traveler",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 4.8,
    trips: 12,
    online: true,
    connected: false,
  },
  {
    id: "user-3",
    name: "Amit Kumar",
    interests: ["Music", "Movies", "Food"],
    status: "Looking for co-travelers",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 4.5,
    trips: 8,
    online: false,
    connected: false,
  },
  {
    id: "user-4",
    name: "Neha Patel",
    interests: ["Trekking", "Cooking", "Art"],
    status: "Frequent traveler",
    avatar: "/placeholder.svg?height=50&width=50",
    rating: 4.9,
    trips: 24,
    online: true,
    connected: true,
  },
]

export default function TravelersList() {
  const { user, addFriendRequest, addChat } = useAppStore()
  const [connectionStates, setConnectionStates] = useState<Record<string, "idle" | "pending" | "connected">>(
    travelers.reduce(
      (acc, traveler) => ({
        ...acc,
        [traveler.id]: traveler.connected ? "connected" : "idle",
      }),
      {},
    ),
  )

  const handleConnect = (traveler: any) => {
    if (connectionStates[traveler.id] === "connected") {
      // Start a chat
      const newChat = {
        id: `chat-${Date.now()}`,
        participants: [
          user!,
          {
            id: traveler.id,
            name: traveler.name,
            email: `${traveler.name.toLowerCase().replace(" ", ".")}@example.com`,
            avatar: traveler.avatar,
            bio: traveler.status,
            location: "India",
            interests: traveler.interests,
            verified: true,
          },
        ],
        messages: [],
        isGroup: false,
        unreadCount: 0,
      }
      addChat(newChat)
      toast.success(`Started chat with ${traveler.name}`)
      return
    }

    if (connectionStates[traveler.id] === "pending") {
      toast.info("Friend request already sent")
      return
    }

    // Send friend request
    const friendRequest = {
      id: `req-${Date.now()}`,
      from: user!,
      to: {
        id: traveler.id,
        name: traveler.name,
        email: `${traveler.name.toLowerCase().replace(" ", ".")}@example.com`,
        avatar: traveler.avatar,
        bio: traveler.status,
        location: "India",
        interests: traveler.interests,
        verified: true,
      },
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }

    addFriendRequest(friendRequest)
    SocketService.getInstance().sendFriendRequest(traveler.id)

    setConnectionStates((prev) => ({
      ...prev,
      [traveler.id]: "pending",
    }))

    toast.success(`Friend request sent to ${traveler.name}`)

    // Simulate acceptance after 3 seconds for demo
    setTimeout(() => {
      setConnectionStates((prev) => ({
        ...prev,
        [traveler.id]: "connected",
      }))
      toast.success(`${traveler.name} accepted your friend request!`)
    }, 3000)
  }

  const getButtonContent = (traveler: any) => {
    const state = connectionStates[traveler.id]

    switch (state) {
      case "connected":
        return (
          <>
            <MessageSquare className="h-4 w-4" />
            <span>Chat</span>
          </>
        )
      case "pending":
        return (
          <>
            <UserCheck className="h-4 w-4" />
            <span>Pending</span>
          </>
        )
      default:
        return (
          <>
            <UserPlus className="h-4 w-4" />
            <span>Connect</span>
          </>
        )
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Travelers</h2>

      {travelers.map((traveler, index) => (
        <motion.div
          key={traveler.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="card-3d border-2 border-primary/10 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={traveler.avatar || "/placeholder.svg"}
                    alt={traveler.name}
                    className="h-14 w-14 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-background rounded-full border border-primary/20 px-1 flex items-center text-[10px]">
                    <Star className="h-3 w-3 text-yellow-500 mr-0.5" fill="currentColor" />
                    {traveler.rating}
                  </div>
                  {traveler.online && (
                    <div className="absolute top-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{traveler.name}</h3>
                    <span className="text-xs text-muted-foreground">{traveler.trips} trips</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{traveler.status}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {traveler.interests.map((interest) => (
                      <span
                        key={interest}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={connectionStates[traveler.id] === "connected" ? "default" : "outline"}
                  className="flex items-center gap-1 rounded-full"
                  onClick={() => handleConnect(traveler)}
                  disabled={connectionStates[traveler.id] === "pending"}
                >
                  {getButtonContent(traveler)}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
