"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Star, StarOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { Attraction } from "@/types/attraction"
import Image from "next/image"

interface CategoryPageProps {
  category: string
  attractions: Attraction[]
  description: string
  image: string
}

export function CategoryPage({ category, attractions, description, image }: CategoryPageProps) {
  const { t, language } = useLanguage()
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id) ? favorites.filter((fav) => fav !== id) : [...favorites, id]
    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  // Get the translated category name
  const getCategoryName = () => {
    switch (category) {
      case "nature":
        return t("attractions.nature")
      case "culture":
        return t("attractions.culture")
      case "history":
        return t("attractions.history")
      case "food":
        return t("attractions.food")
      default:
        return category
    }
  }

  // Use the appropriate category image
  const getCategoryImage = () => {
    switch (category) {
      case "nature":
        return "/images/nature-category.png"
      case "culture":
        return "/images/culture-category.png"
      case "history":
        return "/images/history-category.png"
      case "food":
        return "/images/food-category.png"
      default:
        return image
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
        <h1 className="text-xl md:text-2xl font-bold text-blue-800 dark:text-blue-300 capitalize">
          {getCategoryName()}
        </h1>
        <div className="w-20"></div> {/* Spacer for centering */}
      </div>

      <div className="mb-8 relative h-48 md:h-64 rounded-lg overflow-hidden">
        <Image
          src={getCategoryImage() || "/placeholder.svg"}
          alt={getCategoryName()}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-4 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 capitalize">{getCategoryName()}</h2>
            <p className="text-sm md:text-base">{description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractions.map((attraction) => {
          const title = attraction.title[language as keyof typeof attraction.title] || attraction.title.en
          const description =
            attraction.description[language as keyof typeof attraction.description] || attraction.description.en

          return (
            <Card key={attraction.id} className="overflow-hidden h-full flex flex-col">
              <div className="relative h-48">
                <Image src={attraction.image || "/placeholder.svg"} alt={title} fill className="object-cover" />
                <button
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
                  onClick={() => toggleFavorite(attraction.id)}
                >
                  {favorites.includes(attraction.id) ? (
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  ) : (
                    <StarOff className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <CardContent className="p-4 flex-grow">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <div className="flex items-center text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{attraction.location}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">{description}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
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
              </CardFooter>
            </Card>
          )
        })}
      </div>

      {attractions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No attractions found in this category.</p>
          <Link href="/attractions">
            <Button className="mt-4">View All Attractions</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
