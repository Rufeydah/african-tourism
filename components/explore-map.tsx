"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { attractions } from "@/data/attractions"

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function ExploreMap() {
  const { t, language } = useLanguage()
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Load Google Maps script
    const script = document.createElement("script")
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`
    script.async = true
    script.defer = true

    // Define the callback function
    window.initMap = () => {
      if (!mapRef.current) return

      setMapLoaded(true)

      // Center on Africa
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 20 },
        zoom: 3,
        mapTypeId: window.google.maps.MapTypeId.TERRAIN,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      })

      // Add markers for each attraction
      attractions.forEach((attraction) => {
        const marker = new window.google.maps.Marker({
          position: { lat: attraction.coordinates.lat, lng: attraction.coordinates.lng },
          map,
          title: attraction.title[language as keyof typeof attraction.title] || attraction.title.en,
          animation: window.google.maps.Animation.DROP,
        })

        marker.addListener("click", () => {
          setSelectedAttraction(attraction.id)
          map.setCenter(marker.getPosition()!)
          map.setZoom(6)
        })
      })
    }

    document.head.appendChild(script)

    return () => {
      // Clean up
      document.head.removeChild(script)
      delete window.initMap
    }
  }, [language])

  const selectedAttractionData = attractions.find((a) => a.id === selectedAttraction)

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 flex justify-between items-center bg-white dark:bg-gray-900 shadow-sm z-10">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-blue-800 dark:text-blue-300">{t("home.explore")}</h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      <div className="flex-1 relative">
        <div ref={mapRef} className="w-full h-full">
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p>Loading map...</p>
              </div>
            </div>
          )}
        </div>

        {selectedAttractionData && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {selectedAttractionData.title[language as keyof typeof selectedAttractionData.title] ||
                        selectedAttractionData.title.en}
                    </h3>
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{selectedAttractionData.location}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedAttraction(null)}>
                    ✕
                  </Button>
                </div>
                <div className="flex justify-between mt-2">
                  <Link href={`/attractions/${selectedAttractionData.id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
