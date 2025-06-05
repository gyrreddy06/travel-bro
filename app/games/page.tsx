"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Trophy, Gamepad2 } from "lucide-react"
import GamesList from "@/components/games-list"
import { motion } from "framer-motion"
// Remove 3D-related imports

export default function GamesPage() {
  return (
    <div className="py-4 px-4 space-y-6">
      {/* 3D Game Controller */}
      <div className="h-48 w-full rounded-2xl overflow-hidden bg-gradient-to-r from-purple-500 to-indigo-500 relative">
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 text-white">
          <h2 className="text-2xl font-bold">Game Center</h2>
          <p className="text-sm opacity-90">Play with your travel companions</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl">
            <Gamepad2 className="h-16 w-16 mb-2 mx-auto" />
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle>Games</CardTitle>
            <CardDescription>Play with your travel companions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1 rounded-full">
                  <UserPlus className="h-4 w-4" />
                  <span>Invite Friends</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1 rounded-full">
                  <Trophy className="h-4 w-4" />
                  <span>Leaderboard</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <GamesList />
    </div>
  )
}
