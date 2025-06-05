"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Bell, MessageSquare, UserPlus, Calendar, Clock, Ticket, CreditCard, AlertTriangle, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const notifications = [
  {
    id: 1,
    type: "message",
    title: "New message from Rahul Singh",
    description: "Are you boarding from Mumbai Central?",
    time: "2 hours ago",
    read: false,
    icon: MessageSquare,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: 2,
    type: "connection",
    title: "New connection request",
    description: "Priya Sharma wants to connect with you",
    time: "5 hours ago",
    read: false,
    icon: UserPlus,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    id: 3,
    type: "trip",
    title: "Trip reminder",
    description: "Your trip to Delhi is tomorrow",
    time: "1 day ago",
    read: true,
    icon: Calendar,
    color: "text-purple-500",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  {
    id: 4,
    type: "alert",
    title: "Train delay alert",
    description: "Rajdhani Express is delayed by 30 minutes",
    time: "1 day ago",
    read: true,
    icon: Clock,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
  },
  {
    id: 5,
    type: "booking",
    title: "Booking confirmed",
    description: "Your ticket to Delhi has been confirmed",
    time: "2 days ago",
    read: true,
    icon: Ticket,
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  {
    id: 6,
    type: "payment",
    title: "Payment successful",
    description: "Payment of ₹1,250 for Delhi ticket was successful",
    time: "2 days ago",
    read: true,
    icon: CreditCard,
    color: "text-blue-500",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    id: 7,
    type: "alert",
    title: "Weather alert",
    description: "Heavy rain expected in Delhi on your travel date",
    time: "3 days ago",
    read: true,
    icon: AlertTriangle,
    color: "text-orange-500",
    bgColor: "bg-orange-100 dark:bg-orange-900/30",
  },
]

export default function NotificationsPage() {
  return (
    <div className="py-4 px-4 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
              <Button variant="ghost" size="sm" className="rounded-full text-xs">
                Mark all as read
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid grid-cols-4 w-full rounded-none border-b">
                <TabsTrigger value="all" className="relative">
                  All
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    {notifications.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="unread" className="relative">
                  Unread
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="trips">Trips</TabsTrigger>
                <TabsTrigger value="alerts">Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="p-0">
                <div className="divide-y">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 flex items-start gap-3 ${!notification.read ? "bg-primary/5" : ""}`}
                    >
                      <div
                        className={`h-10 w-10 rounded-full ${notification.bgColor} flex items-center justify-center ${notification.color}`}
                      >
                        <notification.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-sm">{notification.title}</h3>
                            <p className="text-xs text-muted-foreground">{notification.description}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full -mt-1 -mr-1">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                          {!notification.read && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="p-0">
                <div className="divide-y">
                  {notifications
                    .filter((n) => !n.read)
                    .map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-4 flex items-start gap-3 bg-primary/5"
                      >
                        <div
                          className={`h-10 w-10 rounded-full ${notification.bgColor} flex items-center justify-center ${notification.color}`}
                        >
                          <notification.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-sm">{notification.title}</h3>
                              <p className="text-xs text-muted-foreground">{notification.description}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full -mt-1 -mr-1">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            <span className="h-2 w-2 rounded-full bg-primary"></span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="trips" className="p-0">
                <div className="divide-y">
                  {notifications
                    .filter((n) => n.type === "trip" || n.type === "booking")
                    .map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 flex items-start gap-3 ${!notification.read ? "bg-primary/5" : ""}`}
                      >
                        <div
                          className={`h-10 w-10 rounded-full ${notification.bgColor} flex items-center justify-center ${notification.color}`}
                        >
                          <notification.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-sm">{notification.title}</h3>
                              <p className="text-xs text-muted-foreground">{notification.description}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full -mt-1 -mr-1">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            {!notification.read && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="alerts" className="p-0">
                <div className="divide-y">
                  {notifications
                    .filter((n) => n.type === "alert")
                    .map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 flex items-start gap-3 ${!notification.read ? "bg-primary/5" : ""}`}
                      >
                        <div
                          className={`h-10 w-10 rounded-full ${notification.bgColor} flex items-center justify-center ${notification.color}`}
                        >
                          <notification.icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-sm">{notification.title}</h3>
                              <p className="text-xs text-muted-foreground">{notification.description}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full -mt-1 -mr-1">
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            {!notification.read && <span className="h-2 w-2 rounded-full bg-primary"></span>}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-center">
        <Button variant="outline" className="rounded-full">
          Load More
        </Button>
      </div>
    </div>
  )
}
