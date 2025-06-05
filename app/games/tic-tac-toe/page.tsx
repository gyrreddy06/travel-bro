"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RotateCcw, Trophy, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import SocketService from "@/lib/socket"
import { useAppStore } from "@/lib/store"

type Player = "X" | "O" | null
type Board = Player[]

export default function TicTacToePage() {
  const router = useRouter()
  const { user } = useAppStore()
  const [board, setBoard] = useState<Board>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [winner, setWinner] = useState<Player>(null)
  const [gameMode, setGameMode] = useState<"local" | "online">("local")
  const [isMyTurn, setIsMyTurn] = useState(true)
  const [opponent, setOpponent] = useState<string | null>(null)

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ]

  useEffect(() => {
    if (gameMode === "online" && user) {
      const socket = SocketService.getInstance().getSocket()
      if (socket) {
        socket.emit("join_game", "tic-tac-toe")

        socket.on("game_move", (data) => {
          setBoard(data.board)
          setCurrentPlayer(data.currentPlayer)
          setIsMyTurn(data.currentPlayer === (user.id === data.player1 ? "X" : "O"))
        })

        socket.on("opponent_joined", (opponentName) => {
          setOpponent(opponentName)
        })

        socket.on("game_reset", () => {
          resetGame()
        })

        return () => {
          socket.off("game_move")
          socket.off("opponent_joined")
          socket.off("game_reset")
        }
      }
    }
  }, [gameMode, user])

  const checkWinner = (board: Board): Player => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }
    return board.every((cell) => cell !== null) ? ("Draw" as Player) : null
  }

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return
    if (gameMode === "online" && !isMyTurn) return

    const newBoard = [...board]
    newBoard[index] = currentPlayer
    setBoard(newBoard)

    const gameWinner = checkWinner(newBoard)
    if (gameWinner) {
      setWinner(gameWinner)
    } else {
      const nextPlayer = currentPlayer === "X" ? "O" : "X"
      setCurrentPlayer(nextPlayer)

      if (gameMode === "online") {
        SocketService.getInstance().makeGameMove("tic-tac-toe", {
          board: newBoard,
          currentPlayer: nextPlayer,
          move: index,
        })
        setIsMyTurn(false)
      }
    }
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer("X")
    setWinner(null)
    setIsMyTurn(true)

    if (gameMode === "online") {
      SocketService.getInstance().makeGameMove("tic-tac-toe", { action: "reset" })
    }
  }

  const getStatusMessage = () => {
    if (winner) {
      if (winner === "Draw") return "It's a draw!"
      return `Player ${winner} wins!`
    }

    if (gameMode === "online") {
      return isMyTurn ? "Your turn" : `${opponent || "Opponent"}'s turn`
    }

    return `Player ${currentPlayer}'s turn`
  }

  return (
    <div className="py-4 px-4 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Tic Tac Toe</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant={gameMode === "local" ? "default" : "outline"}
            size="sm"
            onClick={() => setGameMode("local")}
            className="rounded-full"
          >
            Local
          </Button>
          <Button
            variant={gameMode === "online" ? "default" : "outline"}
            size="sm"
            onClick={() => setGameMode("online")}
            className="rounded-full"
          >
            <Users className="h-4 w-4 mr-1" />
            Online
          </Button>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle className="flex items-center justify-between">
              <span>{getStatusMessage()}</span>
              {winner && <Trophy className="h-5 w-5 text-yellow-500" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {board.map((cell, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    aspect-square bg-muted/50 rounded-lg border-2 border-primary/20 
                    flex items-center justify-center text-2xl font-bold
                    transition-colors hover:bg-muted
                    ${cell === "X" ? "text-primary" : cell === "O" ? "text-secondary" : ""}
                    ${(gameMode === "online" && !isMyTurn) || winner ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                  `}
                  onClick={() => handleCellClick(index)}
                  disabled={(gameMode === "online" && !isMyTurn) || !!winner}
                >
                  {cell}
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <Button onClick={resetGame} className="rounded-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                New Game
              </Button>
            </div>

            {gameMode === "online" && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  {opponent ? `Playing against ${opponent}` : "Waiting for opponent..."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
