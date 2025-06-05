"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MessageSquare } from "lucide-react"
import ChatList from "@/components/chat-list"
import { motion } from "framer-motion"

export default function ChatPage() {
  return (
    <div className="py-4 px-4 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 rounded-full" placeholder="Search conversations..." />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ChatList />
    </div>
  )
}
