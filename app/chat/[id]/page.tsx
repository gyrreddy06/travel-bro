"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Paperclip, Mic, ImageIcon, MapPin, ArrowLeft, Phone, Video } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"
import SocketService from "@/lib/socket"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ChatDetailPage() {
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const { user, chats, addMessage } = useAppStore()

  const chat = chats.find((c) => c.id === id)
  const otherParticipant = chat?.participants.find((p) => p.id !== user?.id)

  useEffect(() => {
    if (chat && user) {
      const socket = SocketService.getInstance().getSocket()
      if (socket) {
        socket.emit("join_chat", chat.id)

        socket.on("message_received", (data) => {
          if (data.chatId === chat.id) {
            addMessage(chat.id, data.message)
          }
        })

        return () => {
          socket.emit("leave_chat", chat.id)
          socket.off("message_received")
        }
      }
    }
  }, [chat, user, addMessage])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat?.messages])

  const handleSendMessage = () => {
    if (newMessage.trim() && chat && user) {
      const message = {
        id: `msg-${Date.now()}`,
        senderId: user.id,
        text: newMessage,
        timestamp: new Date().toISOString(),
      }

      addMessage(chat.id, message)
      SocketService.getInstance().sendMessage(chat.id, message)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!chat || !otherParticipant) {
    return <div>Chat not found</div>
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <Card className="flex-1 flex flex-col h-full border-0 rounded-none">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={otherParticipant.avatar || "/placeholder.svg"} alt={otherParticipant.name} />
                <AvatarFallback>{otherParticipant.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{otherParticipant.name}</CardTitle>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Video className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {chat.messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${message.senderId === user?.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] ${
                  message.senderId === user?.id
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted rounded-tl-none"
                } rounded-2xl p-3`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-[10px] opacity-70 text-right mt-1">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter className="border-t p-2">
          <div className="flex items-center w-full gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Paperclip className="h-5 w-5" />
            </Button>
            <div className="relative flex-1">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="rounded-full pr-20"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {newMessage.trim() ? (
              <Button size="icon" className="rounded-full" onClick={handleSendMessage}>
                <Send className="h-5 w-5" />
              </Button>
            ) : (
              <Button size="icon" className="rounded-full" variant="secondary">
                <Mic className="h-5 w-5" />
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
