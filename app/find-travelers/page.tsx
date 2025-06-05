"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Calendar, Train, Filter } from "lucide-react"
import TravelersList from "@/components/travelers-list"
import { motion } from "framer-motion"
import { useState } from "react"

export default function FindTravelersPage() {
  const [showMap, setShowMap] = useState(false)

  return (
    <div className="py-4 px-4 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5 text-primary" />
              Find Travelers
            </CardTitle>
          </CardHeader>
          <CardContent>
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
                <Train className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9 rounded-full" placeholder="Travel Mode" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="w-full rounded-full">
                <Search className="mr-2 h-4 w-4" /> Search Travelers
              </Button>
              <Button variant="outline" size="icon" className="rounded-full" onClick={() => setShowMap(!showMap)}>
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {showMap && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 300 }}
          exit={{ opacity: 0, height: 0 }}
          className="w-full rounded-2xl overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 relative"
        >
          <div className="h-full w-full flex items-center justify-center text-white">
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl">
              <MapPin className="h-12 w-12 mb-2 mx-auto" />
              <p className="text-center">Interactive Map View</p>
            </div>
          </div>
        </motion.div>
      )}

      <TravelersList />
    </div>
  )
}
