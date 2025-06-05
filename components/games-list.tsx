"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Play } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const games = [
  {
    id: 1,
    title: "Tic Tac Toe",
    description: "Classic strategy game for two players",
    players: 16,
    image: "/placeholder.svg?height=200&width=300",
    category: "Strategy",
    route: "/games/tic-tac-toe",
  },
  {
    id: 2,
    title: "Word Connect",
    description: "Form words from given letters",
    players: 18,
    image: "/placeholder.svg?height=200&width=300",
    category: "Word Games",
    route: "/games/word-connect",
  },
  {
    id: 3,
    title: "Trivia Challenge",
    description: "Test your knowledge with travel-themed questions",
    players: 24,
    image: "/placeholder.svg?height=200&width=300",
    category: "Trivia",
    route: "/games/trivia",
  },
  {
    id: 4,
    title: "Memory Match",
    description: "Match pairs of travel destination cards",
    players: 12,
    image: "/placeholder.svg?height=200&width=300",
    category: "Memory",
    route: "/games/memory",
  },
]

export default function GamesList() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Popular Games</h2>
      <div className="grid grid-cols-2 gap-4">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden card-3d border-2 border-primary/10">
              <div className="relative">
                <img src={game.image || "/placeholder.svg"} alt={game.title} className="w-full h-32 object-cover" />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {game.category}
                </div>
              </div>
              <CardHeader className="p-3 pb-0">
                <CardTitle className="text-base">{game.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-1">
                <p className="text-xs text-muted-foreground">{game.description}</p>
              </CardContent>
              <CardFooter className="p-3 pt-0 flex justify-between items-center">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Users className="h-3 w-3 mr-1" />
                  <span>{game.players} playing</span>
                </div>
                <Link href={game.route}>
                  <Button size="sm" className="rounded-full text-xs h-8">
                    <Play className="h-3 w-3 mr-1" />
                    Play Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
