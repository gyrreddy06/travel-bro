"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus, UserCheck, UserX, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"
import SocketService from "@/lib/socket"

export default function FriendRequests() {
  const { friendRequests, updateFriendRequest } = useAppStore()
  const pendingRequests = friendRequests.filter((req) => req.status === "pending")

  const handleAccept = (requestId: string) => {
    updateFriendRequest(requestId, "accepted")
    SocketService.getInstance().acceptFriendRequest(requestId)
  }

  const handleReject = (requestId: string) => {
    updateFriendRequest(requestId, "rejected")
  }

  if (pendingRequests.length === 0) {
    return null
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="card-3d border-2 border-primary/20 overflow-hidden">
        <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
          <CardTitle className="flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-primary" />
            Friend Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {pendingRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={request.from.avatar || "/placeholder.svg"} alt={request.from.name} />
                    <AvatarFallback>{request.from.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-sm">{request.from.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => handleAccept(request.id)}>
                    <UserCheck className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full" onClick={() => handleReject(request.id)}>
                    <UserX className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
