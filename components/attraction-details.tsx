"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Star, StarOff, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { Attraction } from "@/types/attraction"
import Image from "next/image"

export function AttractionDetails({ attraction }: { attraction: Attraction }) {
  const { language } = useLanguage()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites) as string[]
      setIsFavorite(favoriteIds.includes(attraction.id))
    }
  }, [attraction.id])

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem("favorites")
    let favoriteIds: string[] = []

    if (savedFavorites) {
      favoriteIds = JSON.parse(savedFavorites)
    }

    if (isFavorite) {
      favoriteIds = favoriteIds.filter((id) => id !== attraction.id)
    } else {
      favoriteIds.push(attraction.id)
    }

    localStorage.setItem("favorites", JSON.stringify(favoriteIds))
    setIsFavorite(!isFavorite)
  }

  const title = attraction.title[language as keyof typeof attraction.title] || attraction.title.en
  const description =
    attraction.description[language as keyof typeof attraction.description] || attraction.description.en

  const shareAttraction = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link href="/attractions">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={shareAttraction}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
          <Button variant={isFavorite ? "default" : "outline"} size="sm" onClick={toggleFavorite}>
            {isFavorite ? (
              <>
                <Star className="h-4 w-4 mr-1 fill-yellow-500" />
                Favorited
              </>
            ) : (
              <>
                <StarOff className="h-4 w-4 mr-1" />
                Add to Favorites
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mb-6 relative h-64 md:h-96 rounded-lg overflow-hidden">
        <Image src={attraction.image || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">{title}</h1>
          <div className="flex items-center text-gray-500 mb-4">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{attraction.location}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Country</h3>
              <p>{attraction.country}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">City</h3>
              <p>{attraction.city}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Category</h3>
              <p className="capitalize">{attraction.category}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Best Time to Visit</h3>
              <p>Year-round</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="h-64 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(attraction.location)}`}
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <div className="flex justify-between">
        <Link href="/attractions">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Attractions
          </Button>
        </Link>
        <Link
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.location)}`}
          target="_blank"
        >
          <Button>
            <MapPin className="h-4 w-4 mr-1" />
            Get Directions
          </Button>
        </Link>
      </div>
    </div>
  )
}
