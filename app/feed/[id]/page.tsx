"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, MapPin, Calendar, Send } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const postData = {
  1: {
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
    comments: [
      {
        id: 1,
        user: "Rahul Singh",
        avatar: "/placeholder.svg?height=30&width=30",
        text: "Beautiful! I'm planning to visit next month.",
        time: "1 hour ago",
      },
      {
        id: 2,
        user: "Amit Kumar",
        avatar: "/placeholder.svg?height=30&width=30",
        text: "The Taj Mahal is truly a wonder. Great pic!",
        time: "2 hours ago",
      },
      {
        id: 3,
        user: "Neha Patel",
        avatar: "/placeholder.svg?height=30&width=30",
        text: "Did you try the local food there?",
        time: "3 hours ago",
      },
    ],
    time: "2 hours ago",
    date: "May 10, 2025",
  },
  2: {
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
    comments: [
      {
        id: 1,
        user: "Priya Sharma",
        avatar: "/placeholder.svg?height=30&width=30",
        text: "This looks amazing! Adding to my bucket list.",
        time: "1 hour ago",
      },
      {
        id: 2,
        user: "Vikram Singh",
        avatar: "/placeholder.svg?height=30&width=30",
        text: "I took this journey last year. Unforgettable!",
        time: "4 hours ago",
      },
    ],
    time: "5 hours ago",
    date: "May 8, 2025",
  },
}

export default function PostDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { id } = params
  const [newComment, setNewComment] = useState("")
  const [liked, setLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [comments, setComments] = useState([])

  const post = postData[id]

  if (!post) {
    return <div>Post not found</div>
  }

  useEffect(() => {
    setLikesCount(post.likes)
    setComments(post.comments || [])
  }, [post])

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1)
    } else {
      setLikesCount(likesCount + 1)
    }
    setLiked(!liked)
  }

  const handleComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        user: "You",
        avatar: "/placeholder.svg?height=30&width=30",
        text: newComment,
        time: "Just now",
      }
      setComments([newCommentObj, ...comments])
      setNewComment("")
    }
  }

  return (
    <div className="py-4 px-4 space-y-6">
      <div className="flex items-center mb-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Post</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/10 overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={post.user.avatar} alt={post.user.name} />
                  <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{post.user.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{post.location}</span>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Save Post</DropdownMenuItem>
                  <DropdownMenuItem>Report Post</DropdownMenuItem>
                  <DropdownMenuItem>Copy Link</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm mb-3">{post.content}</p>

            <div className="rounded-xl overflow-hidden mb-3">
              <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-auto" />
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-1 px-2 ${liked ? "text-red-500" : ""}`}
                  onClick={handleLike}
                >
                  <Heart className="h-4 w-4" fill={liked ? "currentColor" : "none"} />
                  <span>{likesCount}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{comments.length}</span>
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>

            <div className="border-t pt-3">
              <h3 className="font-medium text-sm mb-3">Comments</h3>

              <div className="flex items-center gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="relative flex-1">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="rounded-full pr-10"
                  />
                  <Button
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full"
                    disabled={!newComment.trim()}
                    onClick={handleComment}
                  >
                    <Send className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {comments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.avatar} alt={comment.user} />
                      <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-muted/50 p-2 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-medium">{comment.user}</h4>
                        <span className="text-[10px] text-muted-foreground">{comment.time}</span>
                      </div>
                      <p className="text-sm">{comment.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
