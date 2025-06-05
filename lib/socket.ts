"use client"

import { io, type Socket } from "socket.io-client"

class SocketService {
  private socket: Socket | null = null
  private static instance: SocketService

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService()
    }
    return SocketService.instance
  }

  connect(userId: string) {
    if (!this.socket) {
      this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:3001", {
        query: { userId },
        transports: ["websocket", "polling"],
      })

      this.socket.on("connect", () => {
        console.log("Connected to socket server")
      })

      this.socket.on("disconnect", () => {
        console.log("Disconnected from socket server")
      })
    }
    return this.socket
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
      this.socket = null
    }
  }

  getSocket() {
    return this.socket
  }

  // Message events
  sendMessage(chatId: string, message: any) {
    this.socket?.emit("send_message", { chatId, message })
  }

  joinChat(chatId: string) {
    this.socket?.emit("join_chat", chatId)
  }

  leaveChat(chatId: string) {
    this.socket?.emit("leave_chat", chatId)
  }

  // Friend request events
  sendFriendRequest(userId: string) {
    this.socket?.emit("send_friend_request", userId)
  }

  acceptFriendRequest(requestId: string) {
    this.socket?.emit("accept_friend_request", requestId)
  }

  // Game events
  joinGame(gameId: string) {
    this.socket?.emit("join_game", gameId)
  }

  makeGameMove(gameId: string, move: any) {
    this.socket?.emit("game_move", { gameId, move })
  }
}

export default SocketService
