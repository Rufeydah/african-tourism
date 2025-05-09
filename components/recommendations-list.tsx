"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { attractions } from "@/data/attractions"
import type { Attraction } from "@/types/attraction"

export function RecommendationsList() {
  const { t, language } = useLanguage()
  const [favorites, setFavorites] = useState<string[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [season, setSeason] = useState<string>("summer") // Default to summer

  useEffect(() => {
    // Load favorites
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }

    // Try to get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }

    // Determine season based on current month in Northern Hemisphere
    const currentMonth = new Date().getMonth()
    if (currentMonth >= 2 && currentMonth <= 4) {
      setSeason("spring")
    } else if (currentMonth >= 5 && currentMonth <= 7) {
      setSeason("summer")
    } else if (currentMonth >= 8 && currentMonth <= 10) {
      setSeason("autumn")
    } else {
      setSeason("winter")
    }
  }, [])

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id) ? favorites.filter((fav) => fav !== id) : [...favorites, id]

    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  // Calculate distance between two coordinates in km
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
  }

  // Get recommendations based on different criteria
  const getRecommendations = (type: string): Attraction[] => {
    switch (type) {
      case "nearby":
        if (!userLocation) return []
        return [...attractions]
          .sort((a, b) => {
            const distA = calculateDistance(userLocation.lat, userLocation.lng, a.coordinates.lat, a.coordinates.lng)
            const distB = calculateDistance(userLocation.lat, userLocation.lng, b.coordinates.lat, b.coordinates.lng)
            return distA - distB
          })
          .slice(0, 3)

      case "seasonal":
        // Simple seasonal recommendations
        if (season === "summer") {
          return attractions.filter((a) => a.category === "nature" || a.category === "food")
        } else if (season === "winter") {
          return attractions.filter((a) => a.category === "culture" || a.category === "history")
        } else {
          return attractions.filter((a) => a.category === "culture" || a.category === "nature")
        }

      case "popular":
        // For demo purposes, just return a few items
        return attractions.slice(0, 3)

      default:
        return attractions
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">{t("home.recommendations")}</h1>
        <Link href="/">
          <Button variant="outline" size="sm">
            Back
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="nearby" className="mb-8">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="nearby">Nearby</TabsTrigger>
          <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        {["nearby", "seasonal", "popular"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-4">
            {tabValue === "nearby" && !userLocation && (
              <div className="text-center py-6 text-gray-500">
                <p>Location access is needed for nearby recommendations</p>
                <Button
                  onClick={() => {
                    navigator.geolocation.getCurrentPosition((position) => {
                      setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                      })
                    })
                  }}
                  className="mt-2"
                >
                  Enable Location
                </Button>
              </div>
            )}

            {getRecommendations(tabValue).map((attraction) => {
              const title = attraction.title[language as keyof typeof attraction.title] || attraction.title.en
              const description =
                attraction.description[language as keyof typeof attraction.description] || attraction.description.en
                console.log(attraction)

              return (
                <Card key={attraction.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="w-full md:w-1/3 h-48 md:h-auto bg-cover bg-center"
                      style={{ backgroundImage: `url(${attraction.image})` }}
                    />
                    <CardContent className="p-4 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">{title}</h3>
                          <div className="flex items-center text-gray-500 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{attraction.location}</span>
                          </div>
                        </div>
                        <button
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                          onClick={() => toggleFavorite(attraction.id)}
                        >
                          <Star
                            className={`h-5 w-5 ${
                              favorites.includes(attraction.id) ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
                            }`}
                          />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
                      <div className="flex justify-between">
                        <Link href={`/attractions/${attraction.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                        <Link
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.location)}`}
                          target="_blank"
                        >
                          <Button size="sm">View on Map</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              )
            })}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
