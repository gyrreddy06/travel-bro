"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  location?: string
  interests: string[]
  verified: boolean
}

interface FriendRequest {
  id: string
  from: User
  to: User
  status: "pending" | "accepted" | "rejected"
  createdAt: string
}

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  type?: "text" | "image" | "location"
}

interface Chat {
  id: string
  participants: User[]
  messages: Message[]
  lastMessage?: Message
  isGroup: boolean
  name?: string
  unreadCount: number
}

interface Post {
  id: string
  user: User
  content: string
  image?: string
  location?: string
  likes: number
  comments: number
  timestamp: string
  liked: boolean
}

interface Trip {
  id: string
  from: string
  to: string
  date: string
  trainNumber?: string
  participants: User[]
  status: "upcoming" | "completed" | "cancelled"
}

interface AppState {
  user: User | null
  friendRequests: FriendRequest[]
  chats: Chat[]
  posts: Post[]
  trips: Trip[]
  onlineUsers: string[]

  // Actions
  setUser: (user: User) => void
  addFriendRequest: (request: FriendRequest) => void
  updateFriendRequest: (id: string, status: "accepted" | "rejected") => void
  addMessage: (chatId: string, message: Message) => void
  addChat: (chat: Chat) => void
  updateChat: (chatId: string, updates: Partial<Chat>) => void
  addPost: (post: Post) => void
  likePost: (postId: string) => void
  setOnlineUsers: (users: string[]) => void
  addTrip: (trip: Trip) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: {
        id: "user-1",
        name: "John Smith",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        bio: "Travel enthusiast | Photographer | Food lover",
        location: "Mumbai, India",
        interests: ["Photography", "Hiking", "Food", "Music"],
        verified: true,
      },
      friendRequests: [
        {
          id: "req-1",
          from: {
            id: "user-2",
            name: "Priya Sharma",
            email: "priya@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Adventure seeker",
            location: "Delhi, India",
            interests: ["Reading", "Photography", "Hiking"],
            verified: true,
          },
          to: {
            id: "user-1",
            name: "John Smith",
            email: "john@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Travel enthusiast",
            location: "Mumbai, India",
            interests: ["Photography", "Hiking", "Food", "Music"],
            verified: true,
          },
          status: "pending",
          createdAt: "2025-01-05T10:30:00Z",
        },
      ],
      chats: [
        {
          id: "chat-1",
          participants: [
            {
              id: "user-1",
              name: "John Smith",
              email: "john@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              bio: "Travel enthusiast",
              location: "Mumbai, India",
              interests: ["Photography", "Hiking", "Food", "Music"],
              verified: true,
            },
            {
              id: "user-2",
              name: "Rahul Singh",
              email: "rahul@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              bio: "Tech enthusiast",
              location: "Bangalore, India",
              interests: ["Technology", "Travel", "Music"],
              verified: true,
            },
          ],
          messages: [
            {
              id: "msg-1",
              senderId: "user-2",
              text: "Hi there! Are you boarding from Mumbai Central?",
              timestamp: "2025-01-05T10:30:00Z",
            },
            {
              id: "msg-2",
              senderId: "user-1",
              text: "Yes, I'll be there by 8 PM. Are you also taking the same train?",
              timestamp: "2025-01-05T10:32:00Z",
            },
          ],
          isGroup: false,
          unreadCount: 1,
        },
      ],
      posts: [
        {
          id: "post-1",
          user: {
            id: "user-3",
            name: "Priya Sharma",
            email: "priya@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Adventure seeker",
            location: "Delhi, India",
            interests: ["Reading", "Photography", "Hiking"],
            verified: true,
          },
          content:
            "Finally visited the Taj Mahal! The architecture is breathtaking and the history behind it is so romantic. Definitely a must-visit if you're in India. #TajMahal #India #Travel",
          image: "/placeholder.svg?height=400&width=600",
          location: "Taj Mahal, Agra",
          likes: 124,
          comments: 23,
          timestamp: "2025-01-05T08:00:00Z",
          liked: false,
        },
        {
          id: "post-2",
          user: {
            id: "user-4",
            name: "Amit Kumar",
            email: "amit@example.com",
            avatar: "/placeholder.svg?height=40&width=40",
            bio: "Foodie and traveler",
            location: "Goa, India",
            interests: ["Music", "Movies", "Food"],
            verified: true,
          },
          content:
            "Beach vibes in Goa! Perfect weather, amazing food, and great company. Found some awesome co-travelers through TravelBuddy! #BeachLife #Goa #TravelBuddy",
          image: "/placeholder.svg?height=400&width=600",
          location: "Goa Beach",
          likes: 156,
          comments: 34,
          timestamp: "2025-01-04T15:30:00Z",
          liked: true,
        },
      ],
      trips: [
        {
          id: "trip-1",
          from: "Mumbai",
          to: "Delhi",
          date: "2025-05-15",
          trainNumber: "12952",
          participants: [
            {
              id: "user-1",
              name: "John Smith",
              email: "john@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              bio: "Travel enthusiast",
              location: "Mumbai, India",
              interests: ["Photography", "Hiking", "Food", "Music"],
              verified: true,
            },
            {
              id: "user-2",
              name: "Rahul Singh",
              email: "rahul@example.com",
              avatar: "/placeholder.svg?height=40&width=40",
              bio: "Tech enthusiast",
              location: "Bangalore, India",
              interests: ["Technology", "Travel", "Music"],
              verified: true,
            },
          ],
          status: "upcoming",
        },
      ],
      onlineUsers: ["user-2", "user-3"],

      // Actions
      setUser: (user) => set({ user }),

      addFriendRequest: (request) =>
        set((state) => ({
          friendRequests: [...state.friendRequests, request],
        })),

      updateFriendRequest: (id, status) =>
        set((state) => ({
          friendRequests: state.friendRequests.map((req) => (req.id === id ? { ...req, status } : req)),
        })),

      addMessage: (chatId, message) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, message],
                  lastMessage: message,
                  unreadCount: message.senderId !== state.user?.id ? chat.unreadCount + 1 : chat.unreadCount,
                }
              : chat,
          ),
        })),

      addChat: (chat) =>
        set((state) => ({
          chats: [...state.chats, chat],
        })),

      updateChat: (chatId, updates) =>
        set((state) => ({
          chats: state.chats.map((chat) => (chat.id === chatId ? { ...chat, ...updates } : chat)),
        })),

      addPost: (post) =>
        set((state) => ({
          posts: [post, ...state.posts],
        })),

      likePost: (postId) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  liked: !post.liked,
                  likes: post.liked ? post.likes - 1 : post.likes + 1,
                }
              : post,
          ),
        })),

      setOnlineUsers: (users) => set({ onlineUsers: users }),

      addTrip: (trip) =>
        set((state) => ({
          trips: [...state.trips, trip],
        })),
    }),
    {
      name: "travel-buddy-store",
    },
  ),
)
