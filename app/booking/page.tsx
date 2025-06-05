"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Calendar, Train, Bus, Filter, Ticket } from "lucide-react"
import { motion } from "framer-motion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BookingList from "@/components/booking-list"

export default function BookingPage() {
  const [activeTab, setActiveTab] = useState("train")

  return (
    <div className="py-4 px-4 space-y-6">
      {/* 3D Ticket Model */}
      <div className="h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-r from-secondary to-orange-500 relative">
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 text-white">
          <h2 className="text-2xl font-bold">Book Tickets</h2>
          <p className="text-sm opacity-90">Find the best deals for your journey</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl">
            <Ticket className="h-16 w-16 mb-2 mx-auto" />
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5 text-primary" />
              Search Tickets
            </CardTitle>
            <CardDescription>Find the best options for your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="train" value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="train" className="flex items-center gap-2 rounded-full">
                  <Train className="h-4 w-4" /> Train
                </TabsTrigger>
                <TabsTrigger value="bus" className="flex items-center gap-2 rounded-full">
                  <Bus className="h-4 w-4" /> Bus
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 rounded-full" placeholder="From" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 rounded-full" placeholder="To" />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 rounded-full" placeholder="Date" type="date" />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 rounded-full" placeholder={activeTab === "train" ? "Class" : "Type"} />
              </div>
            </div>
            <Button className="mt-4 w-full rounded-full">
              <Search className="mr-2 h-4 w-4" /> Search Tickets
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      <BookingList type={activeTab} />
    </div>
  )
}
