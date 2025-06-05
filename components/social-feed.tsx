"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, MapPin, MoreHorizontal } from "lucide-react"
import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function SocialFeed() {
  const { posts, likePost } = useAppStore()

  const handleLike = (postId: string) => {
    likePost(postId)
  }

  const handleShare = (post: any) => {
    if (navigator.share) {
      navigator.share({
        title: `${post.user.name}'s travel post`,
        text: post.content,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="card-3d border-2 border-primary/10 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{post.user.name}</h3>
                    <div className="flex items-center gap-2">
                      {post.location && (
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{post.location}</span>
                        </div>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.timestamp).toLocaleDateString()}
                      </span>
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

              {post.image && (
                <div className="rounded-xl overflow-hidden mb-3">
                  <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-auto" />
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-1 px-2 ${post.liked ? "text-red-500" : ""}`}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className="h-4 w-4" fill={post.liked ? "currentColor" : "none"} />
                    <span>{post.likes}</span>
                  </Button>
                  <Link href={`/feed/${post.id}`}>
                    <Button variant="ghost" size="sm" className="flex items-center gap-1 px-2">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </Link>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 px-2"
                  onClick={() => handleShare(post)}
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
