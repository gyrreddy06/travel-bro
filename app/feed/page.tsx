"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image, Send, Heart, MessageCircle, Share2, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"

const feedPosts = [
  {
    id: 1,
    user: {
      name: "Priya Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    location: "Taj Mahal, Agra",
    content:
      "Finally visited the Taj Mahal! The architecture is breathtaking and the history behind it is so romantic. Definitely a must-visit if you're in India. #TajMahal #India #Travel",
    image: "/placeholder.svg?height=400&width=600",
    likes: 124,
    comments: 23,
    time: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Rahul Singh",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    location: "Darjeeling Express",
    content:
      "The view from the Darjeeling Himalayan Railway is absolutely stunning! The train journey through the mountains is an experience of a lifetime. #TrainJourney #Darjeeling #Mountains",
    image: "/placeholder.svg?height=400&width=600",
    likes: 89,
    comments: 12,
    time: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Amit Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    location: "Goa Beach",
    content:
      "Beach vibes in Goa! Perfect weather, amazing food, and great company. Found some awesome co-travelers through TravelBuddy! #BeachLife #Goa #TravelBuddy",
    image: "/placeholder.svg?height=400&width=600",
    likes: 156,
    comments: 34,
    time: "1 day ago",
  },
]

export default function FeedPage() {
  const [newPost, setNewPost] = useState("")

  return (
    <div className="py-4 px-4 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle>Travel Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <Textarea
                  placeholder="Share your travel story..."
                  className="min-h-[80px] resize-none rounded-xl"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Image className="h-4 w-4 mr-2" />
                    Add Photo
                  </Button>
                  <Button size="sm" className="rounded-full" disabled={!newPost.trim()}>
                    <Send className="h-4 w-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Button variant="outline" size="sm" className="rounded-full">
            Trending
          </Button>
        </div>

        {feedPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="card-3d border-2 border-primary/10 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{post.user.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {post.location} • {post.time}
                    </p>
                  </div>
                </div>

                <p className="text-sm mb-3">{post.content}</p>

                <div className="rounded-xl overflow-hidden mb-3">
                  <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-auto" />
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        <div className="flex justify-center mt-6">
          <Button variant="outline" className="rounded-full flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Load More
          </Button>
        </div>
      </div>
    </div>
  )
}
