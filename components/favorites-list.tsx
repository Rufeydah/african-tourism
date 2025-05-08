"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MapPin, Star, Trash2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { attractions } from "@/data/attractions"
import type { Attraction } from "@/types/attraction"
import Image from "next/image"

export function FavoritesList() {
  const { t, language } = useLanguage()
  const [favorites, setFavorites] = useState<Attraction[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites) as string[]
      const favoriteAttractions = attractions.filter((attraction) => favoriteIds.includes(attraction.id))
      setFavorites(favoriteAttractions)
    }
  }, [])

  const removeFavorite = (id: string) => {
    const savedFavorites = localStorage.getItem("favorites")
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites) as string[]
      const updatedFavorites = favoriteIds.filter((favId) => favId !== id)
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites))

      setFavorites((prev) => prev.filter((attraction) => attraction.id !== id))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">{t("home.favorites")}</h1>
        <Link href="/">
          <Button variant="outline" size="sm">
            Back
          </Button>
        </Link>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No favorites saved yet</p>
          <Link href="/attractions">
            <Button className="mt-4">Explore Attractions</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((attraction) => {
            const title = attraction.title[language as keyof typeof attraction.title] || attraction.title.en
            const description =
              attraction.description[language as keyof typeof attraction.description] || attraction.description.en

            return (
              <Card key={attraction.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                    <Image src={attraction.image || "/placeholder.svg"} alt={title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{title}</h3>
                      <div className="flex items-center text-gray-500 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{attraction.location}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Link href={`/attractions/${attraction.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeFavorite(attraction.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
