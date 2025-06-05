"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import {
  Bell,
  Shield,
  Globe,
  Moon,
  Sun,
  CreditCard,
  User,
  Lock,
  HelpCircle,
  LogOut,
  Languages,
  Smartphone,
  Eye,
  EyeOff,
  ChevronRight,
} from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="py-4 px-4 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5 text-primary" />
              Settings
            </CardTitle>
            <CardDescription>Manage your account and preferences</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid grid-cols-4 w-full rounded-none border-b">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="privacy">Privacy</TabsTrigger>
                <TabsTrigger value="notifications">Alerts</TabsTrigger>
                <TabsTrigger value="appearance">Display</TabsTrigger>
              </TabsList>

              <TabsContent value="account" className="p-4 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Personal Information</h3>
                        <p className="text-xs text-muted-foreground">Update your profile details</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Payment Methods</h3>
                        <p className="text-xs text-muted-foreground">Manage your payment options</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Languages className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Language</h3>
                        <p className="text-xs text-muted-foreground">English (US)</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Help & Support</h3>
                        <p className="text-xs text-muted-foreground">Get assistance and FAQs</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button variant="destructive" className="w-full rounded-full mt-6">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="p-4 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Change Password</h3>
                        <p className="text-xs text-muted-foreground">Update your password regularly</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Two-Factor Authentication</h3>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Location Sharing</h3>
                        <p className="text-xs text-muted-foreground">Control who can see your location</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-medium">Trusted Devices</h3>
                        <p className="text-xs text-muted-foreground">Manage devices that can access your account</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="rounded-full">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="p-4 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-xs text-muted-foreground">Receive alerts on your device</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-xs text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Travel Alerts</h3>
                      <p className="text-xs text-muted-foreground">Get notified about delays and changes</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Co-Travelers</h3>
                      <p className="text-xs text-muted-foreground">Notifications when someone joins your trip</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Communications</h3>
                      <p className="text-xs text-muted-foreground">Receive offers and promotions</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="p-4 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {theme === "dark" ? (
                        <Moon className="h-5 w-5 text-primary" />
                      ) : (
                        <Sun className="h-5 w-5 text-primary" />
                      )}
                      <div>
                        <h3 className="font-medium">Theme</h3>
                        <p className="text-xs text-muted-foreground">Choose between light and dark mode</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant={theme === "light" ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => setTheme("light")}
                      >
                        <Sun className="h-4 w-4 mr-1" /> Light
                      </Button>
                      <Button
                        size="sm"
                        variant={theme === "dark" ? "default" : "outline"}
                        className="rounded-full"
                        onClick={() => setTheme("dark")}
                      >
                        <Moon className="h-4 w-4 mr-1" /> Dark
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Text Size</h3>
                      <p className="text-xs text-muted-foreground">Adjust the size of text</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" className="rounded-full">
                        A-
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full">
                        A+
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="card-3d border-2 border-primary/20 overflow-hidden">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-transparent">
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Safety Center
            </CardTitle>
            <CardDescription>Stay safe while traveling</CardDescription>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center rounded-xl">
                <Shield className="h-8 w-8 mb-2 text-primary" />
                <span>Emergency Contacts</span>
              </Button>

              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center rounded-xl">
                <Bell className="h-8 w-8 mb-2 text-primary" />
                <span>Safety Alerts</span>
              </Button>

              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center rounded-xl">
                <User className="h-8 w-8 mb-2 text-primary" />
                <span>Trusted Contacts</span>
              </Button>

              <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center rounded-xl">
                <HelpCircle className="h-8 w-8 mb-2 text-primary" />
                <span>Safety Tips</span>
              </Button>
            </div>

            <div className="bg-secondary/10 p-3 rounded-xl flex items-start gap-3">
              <Shield className="h-5 w-5 text-secondary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm">Safety Verification</h3>
                <p className="text-xs text-muted-foreground">
                  Complete your safety profile to get verified and build trust with other travelers.
                </p>
                <Button size="sm" className="mt-2 rounded-full bg-secondary text-secondary-foreground">
                  Verify Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
