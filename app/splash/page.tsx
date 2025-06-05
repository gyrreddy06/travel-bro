"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Train } from "lucide-react"

export default function SplashScreen() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      router.push("/onboarding")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary/5 to-primary/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="h-40 w-40 mb-6 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
            <Train className="h-16 w-16 text-primary" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-primary-foreground text-2xl font-bold mb-4 mx-auto"
        >
          TB
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
        >
          TravelBuddy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="text-muted-foreground"
        >
          Never Travel Alone!
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 1 : 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="mt-12"
      >
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce"></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </motion.div>
    </div>
  )
}
