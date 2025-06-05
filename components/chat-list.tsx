"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const chats = [
  {
    id: 1,
    name: "Rahul Singh",
    lastMessage: "Are you boarding from Mumbai Central?",
    time: "2h ago",
    unread: 2,
    online: true,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Delhi Travelers",
    lastMessage: "Anyone bringing card games?",
    time: "5h ago",
    unread: 0,
    online: false,
    isGroup: true,
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Meera Joshi",
    lastMessage: "I'll be at the station by 8 PM",
    time: "Yesterday",
    unread: 0,
    online: true,
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

export default function ChatList() {
  return (
    <div className="space-y-3">
      {chats.map((chat, index) => (
        <motion.div
          key={chat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/chat/${chat.id}`}>
            <Card className="hover:shadow-md transition-all card-3d border-2 border-primary/10 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                      <span>{chat.name.charAt(0)}</span>
                    </div>
                    {chat.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{chat.name}</h4>
                      <span className="text-xs text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {chat.unread > 0 && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-secondary-foreground">
                        {chat.unread}
                      </span>
                    )}
                    {!chat.isGroup && (
                      <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full">
                        <Phone className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
