"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Moon, Sun, Smartphone } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export function Settings() {
  const { t, language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [offlineMode, setOfflineMode] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const [locationServices, setLocationServices] = useState(false)

  // After mounting, we can safely show the UI
  useEffect(() => {
    setMounted(true)

    // Load saved preferences
    const savedOfflineMode = localStorage.getItem("offlineMode") === "true"
    const savedNotifications = localStorage.getItem("notifications") === "true"
    const savedLocationServices = localStorage.getItem("locationServices") === "true"

    setOfflineMode(savedOfflineMode)
    setNotifications(savedNotifications)
    setLocationServices(savedLocationServices)
  }, [])

  const handleOfflineModeChange = (checked: boolean) => {
    setOfflineMode(checked)
    localStorage.setItem("offlineMode", String(checked))
  }

  const handleNotificationsChange = (checked: boolean) => {
    setNotifications(checked)
    localStorage.setItem("notifications", String(checked))
  }

  const handleLocationServicesChange = (checked: boolean) => {
    setLocationServices(checked)
    localStorage.setItem("locationServices", String(checked))
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex justify-between items-center mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t("back")}
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">{t("settings")}</h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Language</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={language} onValueChange={(value) => setLanguage(value as "en" | "am" | "sw")}>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="en" id="en" />
                <Label htmlFor="en">{t("language.en")}</Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="am" id="am" />
                <Label htmlFor="am">{t("language.am")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sw" id="sw" />
                <Label htmlFor="sw">{t("language.sw")}</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={theme} onValueChange={setTheme}>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center">
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center">
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" />
                  System
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="offline-mode" className="font-medium">
                  Offline Mode
                </Label>
                <p className="text-sm text-gray-500">Save content for offline viewing</p>
              </div>
              <Switch id="offline-mode" checked={offlineMode} onCheckedChange={handleOfflineModeChange} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="font-medium">
                  Notifications
                </Label>
                <p className="text-sm text-gray-500">Receive travel updates and recommendations</p>
              </div>
              <Switch id="notifications" checked={notifications} onCheckedChange={handleNotificationsChange} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="location" className="font-medium">
                  Location Services
                </Label>
                <p className="text-sm text-gray-500">Enable for nearby recommendations</p>
              </div>
              <Switch id="location" checked={locationServices} onCheckedChange={handleLocationServicesChange} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">African Tourism Assistant v1.0.0</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              A virtual personal assistant for tourists in Africa, supporting English, Amharic, and Swahili languages.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
