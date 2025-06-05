"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, Users, MessageSquare } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const groups = [
  {
    id: 1,
    name: "Delhi Travelers",
    lastMessage: "Anyone bringing card games?",
    time: "5h ago",
    unread: 0,
    members: 8,
    avatar: "/placeholder.svg?height=50&width=50",
    trip: "Mumbai → Delhi",
    date: "May 15, 2025",
  },
  {
    id: 2,
    name: "Goa Beach Party",
    lastMessage: "Let's meet at Calangute Beach",
    time: "Yesterday",
    unread: 3,
    members: 12,
    avatar: "/placeholder.svg?height=50&width=50",
    trip: "Mumbai → Goa",
    date: "June 10, 2025",
  },
  {
    id: 3,
    name: "Rajasthan Tour Group",
    lastMessage: "Don't forget to bring sunscreen!",
    time: "2 days ago",
    unread: 0,
    members: 15,
    avatar: "/placeholder.svg?height=50&width=50",
    trip: "Delhi → Jaipur",
    date: "July 5, 2025",
  },
]

export default function GroupChatPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.trip.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="py-4 px-4 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-primary" />
                Group Chats
              </CardTitle>
              <Button size="sm" className="rounded-full">
                <Plus className="h-4 w-4 mr-1" />
                New Group
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 rounded-full"
                placeholder="Search groups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-3">
        {filteredGroups.length > 0 ? (
          filteredGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/chat/group/${group.id}`}>
                <Card className="hover:shadow-md transition-all card-3d border-2 border-primary/10 overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                          <Users className="h-6 w-6" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-background rounded-full border border-primary/20 px-1 flex items-center text-[10px]">
                          {group.members}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{group.name}</h4>
                          <span className="text-xs text-muted-foreground">{group.time}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{group.lastMessage}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className="text-[10px] h-4 rounded-full px-1.5 bg-primary/5">
                            {group.trip}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] h-4 rounded-full px-1.5 bg-primary/5">
                            {group.date}
                          </Badge>
                        </div>
                      </div>
                      {group.unread > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-xs text-secondary-foreground">
                          {group.unread}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-3" />
            <h3 className="font-medium text-lg">No groups found</h3>
            <p className="text-sm text-muted-foreground">Try a different search term or create a new group</p>
            <Button className="mt-4 rounded-full">
              <Plus className="h-4 w-4 mr-1" />
              Create New Group
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
