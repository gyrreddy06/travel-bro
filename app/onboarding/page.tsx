"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, ChevronLeft, Users, MessageSquare, Ticket } from "lucide-react"

const onboardingSlides = [
  {
    title: "Find & Connect",
    description: "Discover and connect with travelers on the same journey",
    icon: Users,
  },
  {
    title: "Chat & Play",
    description: "Message your co-travelers and play games while traveling",
    icon: MessageSquare,
  },
  {
    title: "Book & Travel",
    description: "Book tickets and enjoy your journey with new friends",
    icon: Ticket,
  },
]

// Replace the 3D models with static elements
function OnboardingModel({ icon: Icon, position = [0, -1, 0] }) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-primary/10 p-6 rounded-full">
        <Icon className="h-16 w-16 text-primary" />
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  const nextSlide = () => {
    if (currentSlide === onboardingSlides.length - 1) {
      router.push("/auth")
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1))
  }

  const skipToSignUp = () => {
    router.push("/auth")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-primary/5 to-primary/20">
      <Card className="w-full max-w-md border-2 border-primary/20 overflow-hidden card-3d">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button variant="ghost" size="sm" onClick={skipToSignUp} className="rounded-full">
              Skip
            </Button>
          </div>

          <div className="relative h-64 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                {/* Update the Canvas section to use the static component */}
                <div className="h-40 w-full mb-4">
                  <OnboardingModel icon={onboardingSlides[currentSlide].icon} />
                </div>
                <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  {onboardingSlides[currentSlide].title}
                </h2>
                <p className="text-muted-foreground">{onboardingSlides[currentSlide].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-6 mb-4">
            {onboardingSlides.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${index === currentSlide ? "bg-primary" : "bg-primary/20"}`}
              />
            ))}
          </div>

          <Button className="w-full rounded-full bg-gradient-to-r from-primary to-secondary" onClick={nextSlide}>
            {currentSlide === onboardingSlides.length - 1 ? "Get Started" : "Next"}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
