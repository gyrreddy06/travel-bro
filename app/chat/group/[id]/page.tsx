"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Send,
  Paperclip,
  Mic,
  Image,
  MapPin,
  ArrowLeft,
  Users,
  MoreVertical,
  Info,
  Calendar,
  UserPlus,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const groupData = {
  1: {
    name: "Delhi Travelers",
    members: [
      { id: 1, name: "Rahul Singh", avatar: "/placeholder.svg?height=40&width=40", online: true, isAdmin: true },
      { id: 2, name: "Priya Sharma", avatar: "/placeholder.svg?height=40&width=40", online: false },
      { id: 3, name: "Amit Kumar", avatar: "/placeholder.svg?height=40&width=40", online: true },
      { id: 4, name: "Neha Patel", avatar: "/placeholder.svg?height=40&width=40", online: false },
      { id: 5, name: "Vikram Singh", avatar: "/placeholder.svg?height=40&width=40", online: false },
    ],
    trip: "Mumbai → Delhi",
    date: "May 15, 2025",
    messages: [
      {
        id: 1,
        sender: "Rahul Singh",
        text: "Hey everyone! Excited for our trip to Delhi!",
        time: "10:30 AM",
        senderId: 1,
      },
      {
        id: 2,
        sender: "Priya Sharma",
        text: "Me too! Is everyone boarding from Mumbai Central?",
        time: "10:32 AM",
        senderId: 2,
      },
      {
        id: 3,
        sender: "Amit Kumar",
        text: "Yes, I'll be there by 8 PM. Anyone bringing card games?",
        time: "10:35 AM",
        senderId: 3,
      },
      { id: 4, sender: "You", text: "I can bring UNO and a deck of cards.", time: "10:38 AM", senderId: 0 },
      {
        id: 5,
        sender: "Neha Patel",
        text: "Great! I'll bring some snacks for the journey.",
        time: "10:40 AM",
        senderId: 4,
      },
      {
        id: 6,
        sender: "Rahul Singh",
        text: "Perfect! Let's meet near the food court at the station.",
        time: "10:45 AM",
        senderId: 1,
      },
    ],
    created: "3 days ago",
  },
  2: {
    name: "Goa Beach Party",
    members: [
      { id: 1, name: "Rahul Singh", avatar: "/placeholder.svg?height=40&width=40", online: true, isAdmin: true },
      { id: 2, name: "Priya Sharma", avatar: "/placeholder.svg?height=40&width=40", online: false },
      { id: 3, name: "Amit Kumar", avatar: "/placeholder.svg?height=40&width=40", online: true },
    ],
    trip: "Mumbai → Goa",
    date: "June 10, 2025",
    messages: [
      { id: 1, sender: "Rahul Singh", text: "Hey beach lovers! Ready for Goa?", time: "11:30 AM", senderId: 1 },
      {
        id: 2,
        sender: "Priya Sharma",
        text: "Can't wait! Let's meet at Calangute Beach",
        time: "11:32 AM",
        senderId: 2,
      },
      { id: 3, sender: "You", text: "Sounds good! I've booked a beachside cottage.", time: "11:35 AM", senderId: 0 },
    ],
    created: "1 week ago",
  },
}

export default function GroupChatDetailPage() {
  const [newMessage, setNewMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const messagesEndRef = useRef(null)
  const params = useParams()
  const router = useRouter()
  const { id } = params

  const group = groupData[id]

  useEffect(() => {
    if (group) {
      setChatMessages(group.messages)
    }
  }, [id, group])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatMessages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        sender: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        senderId: 0,
      }
      setChatMessages([...chatMessages, newMsg])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  if (!group) {
    return <div>Group not found</div>
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
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mr-3">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-base">{group.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{group.members.length} members</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Group Info</SheetTitle>
                    <SheetDescription>View and manage group details</SheetDescription>
                  </SheetHeader>
                  <div className="py-6">
                    <div className="flex flex-col items-center mb-6">
                      <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mb-3">
                        <Users className="h-10 w-10" />
                      </div>
                      <h2 className="text-xl font-bold">{group.name}</h2>
                      <p className="text-sm text-muted-foreground">Created {group.created}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <h3 className="font-medium text-sm">Trip Details</h3>
                        </div>
                        <p className="text-sm">{group.trip}</p>
                        <p className="text-xs text-muted-foreground">{group.date}</p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <h3 className="font-medium text-sm">Members ({group.members.length})</h3>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 rounded-full">
                            <UserPlus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>

                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {group.members.map((member) => (
                            <div
                              key={member.id}
                              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
                            >
                              <div className="flex items-center gap-2">
                                <Avatar>
                                  <AvatarImage src={member.avatar} alt={member.name} />
                                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="text-sm font-medium">{member.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {member.isAdmin ? "Admin" : "Member"} • {member.online ? "Online" : "Offline"}
                                  </p>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Message Privately</DropdownMenuItem>
                                  {member.isAdmin ? (
                                    <DropdownMenuItem disabled>Remove Admin</DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem>Make Admin</DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem className="text-destructive">Remove from Group</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <Button variant="outline" className="w-full rounded-full">
                        Leave Group
                      </Button>
                      <Button variant="destructive" className="w-full rounded-full">
                        Delete Group
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                  <DropdownMenuItem>Search in Chat</DropdownMenuItem>
                  <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Leave Group</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${message.senderId === 0 ? "justify-end" : "justify-start"}`}
            >
              {message.senderId !== 0 && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div className="max-w-[70%]">
                {message.senderId !== 0 && <p className="text-xs text-muted-foreground mb-1">{message.sender}</p>}
                <div
                  className={`rounded-2xl p-3 ${
                    message.senderId === 0
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted rounded-tl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-[10px] opacity-70 text-right mt-1">{message.time}</p>
                </div>
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
                  <Image className="h-4 w-4" />
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
