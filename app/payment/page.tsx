"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Wallet, QrCode, CheckCircle, ChevronRight, Shield, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentPage() {
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [loading, setLoading] = useState(false)

  const handlePayment = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      router.push("/booking/1")
    }, 2000)
  }

  return (
    <div className="py-4 px-4 space-y-6">
      <div className="flex items-center mb-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold">Payment</h1>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="bg-muted/50 p-3 rounded-lg mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Rajdhani Express</h3>
                  <p className="text-xs text-muted-foreground">Mumbai → Delhi • May 15, 2025</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹1,250</p>
                  <p className="text-xs text-muted-foreground">1 Passenger</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
              <TabsList className="grid grid-cols-3 w-full mb-4">
                <TabsTrigger value="card" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Card
                </TabsTrigger>
                <TabsTrigger value="upi" className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" /> UPI
                </TabsTrigger>
                <TabsTrigger value="wallet" className="flex items-center gap-2">
                  <Wallet className="h-4 w-4" /> Wallet
                </TabsTrigger>
              </TabsList>

              <TabsContent value="card" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="pl-9 rounded-lg" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="expiryDate" placeholder="MM/YY" className="pl-9 rounded-lg" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" className="rounded-lg" type="password" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Smith" className="rounded-lg" />
                </div>
              </TabsContent>

              <TabsContent value="upi" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input id="upiId" placeholder="yourname@upi" className="rounded-lg" />
                </div>

                <div className="flex justify-center my-4">
                  <div className="bg-muted/50 p-4 rounded-lg w-40 h-40 flex items-center justify-center">
                    <QrCode className="h-24 w-24 text-primary" />
                  </div>
                </div>

                <p className="text-xs text-center text-muted-foreground">Scan this QR code with any UPI app to pay</p>
              </TabsContent>

              <TabsContent value="wallet" className="space-y-4">
                <RadioGroup defaultValue="paytm">
                  {[
                    { id: "paytm", name: "Paytm", balance: "₹2,500" },
                    { id: "phonepe", name: "PhonePe", balance: "₹1,800" },
                    { id: "amazonpay", name: "Amazon Pay", balance: "₹950" },
                  ].map((wallet) => (
                    <div key={wallet.id} className="flex items-center space-x-2 border p-3 rounded-lg">
                      <RadioGroupItem value={wallet.id} id={wallet.id} />
                      <Label htmlFor={wallet.id} className="flex-1 flex justify-between items-center">
                        <span>{wallet.name}</span>
                        <span className="text-sm text-muted-foreground">Balance: {wallet.balance}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <Button variant="outline" className="w-full rounded-full">
                  Link New Wallet
                </Button>
              </TabsContent>
            </Tabs>

            <div className="flex items-center gap-2 mt-4 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              <p className="text-xs">Your payment information is secure and encrypted</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 border-t">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-xl font-bold">₹1,250</p>
                </div>
                <Button className="rounded-full" onClick={handlePayment} disabled={loading}>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Pay Now</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      <div className="bg-muted/50 p-3 rounded-lg">
        <div className="flex items-start gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-sm">Secure Booking Promise</h3>
            <p className="text-xs text-muted-foreground">
              Your booking is protected by our secure payment system. In case of any issues, you're eligible for a full
              refund within 24 hours of booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
