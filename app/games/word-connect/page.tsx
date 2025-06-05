"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RotateCcw, Trophy, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const WORDS = [
  { word: "TRAVEL", hint: "Journey to different places" },
  { word: "TRAIN", hint: "Railway transportation" },
  { word: "FRIEND", hint: "Close companion" },
  { word: "ADVENTURE", hint: "Exciting experience" },
  { word: "JOURNEY", hint: "Trip or voyage" },
]

export default function WordConnectPage() {
  const router = useRouter()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wrongGuesses, setWrongGuesses] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [gameActive, setGameActive] = useState(true)

  const currentWord = WORDS[currentWordIndex]
  const maxWrongGuesses = 6

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setGameActive(false)
      setGameLost(true)
    }
  }, [timeLeft, gameActive])

  useEffect(() => {
    const wordLetters = currentWord.word.split("")
    const isWordComplete = wordLetters.every((letter) => guessedLetters.includes(letter))

    if (isWordComplete && !gameWon) {
      setGameWon(true)
      setScore(score + currentWord.word.length * 10 + timeLeft * 2)

      // Move to next word after a delay
      setTimeout(() => {
        if (currentWordIndex < WORDS.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1)
          setGuessedLetters([])
          setWrongGuesses(0)
          setGameWon(false)
          setTimeLeft(60)
        } else {
          setGameActive(false)
        }
      }, 2000)
    }
  }, [guessedLetters, currentWord, gameWon, score, timeLeft, currentWordIndex])

  useEffect(() => {
    if (wrongGuesses >= maxWrongGuesses) {
      setGameLost(true)
      setGameActive(false)
    }
  }, [wrongGuesses])

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || !gameActive) return

    setGuessedLetters([...guessedLetters, letter])

    if (!currentWord.word.includes(letter)) {
      setWrongGuesses(wrongGuesses + 1)
    }
  }

  const resetGame = () => {
    setCurrentWordIndex(0)
    setGuessedLetters([])
    setWrongGuesses(0)
    setGameWon(false)
    setGameLost(false)
    setScore(0)
    setTimeLeft(60)
    setGameActive(true)
  }

  const renderWord = () => {
    return currentWord.word.split("").map((letter, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`
          w-12 h-12 border-2 border-primary/20 rounded-lg flex items-center justify-center
          text-xl font-bold bg-muted/50
          ${guessedLetters.includes(letter) ? "bg-primary text-primary-foreground" : ""}
        `}
      >
        {guessedLetters.includes(letter) ? letter : ""}
      </motion.div>
    ))
  }

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  return (
    <div className="py-4 px-4 space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Word Connect</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">{score}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium">{timeLeft}s</span>
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle className="flex items-center justify-between">
              <span>
                Word {currentWordIndex + 1} of {WORDS.length}
              </span>
              <span className="text-sm text-muted-foreground">
                Wrong: {wrongGuesses}/{maxWrongGuesses}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {/* Hint */}
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">Hint: {currentWord.hint}</p>
            </div>

            {/* Word Display */}
            <div className="flex justify-center gap-2 mb-6">{renderWord()}</div>

            {/* Game Status */}
            {gameWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg"
              >
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <p className="font-medium text-green-700 dark:text-green-300">Word Complete!</p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  +{currentWord.word.length * 10 + timeLeft * 2} points
                </p>
              </motion.div>
            )}

            {gameLost && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg"
              >
                <p className="font-medium text-red-700 dark:text-red-300">Game Over!</p>
                <p className="text-sm text-red-600 dark:text-red-400">The word was: {currentWord.word}</p>
              </motion.div>
            )}

            {/* Alphabet */}
            <div className="grid grid-cols-6 gap-2 mb-6">
              {alphabet.map((letter) => (
                <Button
                  key={letter}
                  variant={
                    guessedLetters.includes(letter)
                      ? currentWord.word.includes(letter)
                        ? "default"
                        : "destructive"
                      : "outline"
                  }
                  size="sm"
                  className="aspect-square rounded-lg"
                  onClick={() => handleLetterGuess(letter)}
                  disabled={guessedLetters.includes(letter) || !gameActive}
                >
                  {letter}
                </Button>
              ))}
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <Button onClick={resetGame} className="rounded-full">
                <RotateCcw className="h-4 w-4 mr-2" />
                New Game
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
