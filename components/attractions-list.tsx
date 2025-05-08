"use client"

import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Star, StarOff } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { Attraction } from "@/types/attraction"
import Image from "next/image"

export function AttractionsList({ attractions }: { attractions: Attraction[] }) {
  const { t, language } = useLanguage()
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favorites")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id) ? favorites.filter((fav) => fav !== id) : [...favorites, id]

    setFavorites(newFavorites)
    localStorage.setItem("favorites", JSON.stringify(newFavorites))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">{t("home.attractions")}</h1>
        <Link href="/">
          <Button variant="outline" size="sm">
            Back
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="nature">{t("attractions.nature")}</TabsTrigger>
          <TabsTrigger value="culture">{t("attractions.culture")}</TabsTrigger>
          <TabsTrigger value="history">{t("attractions.history")}</TabsTrigger>
          <TabsTrigger value="food">{t("attractions.food")}</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {attractions.map((attraction) => (
            <AttractionCard
              key={attraction.id}
              attraction={attraction}
              language={language}
              isFavorite={favorites.includes(attraction.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </TabsContent>

        {["nature", "culture", "history", "food"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {attractions
              .filter((a) => a.category === category)
              .map((attraction) => (
                <AttractionCard
                  key={attraction.id}
                  attraction={attraction}
                  language={language}
                  isFavorite={favorites.includes(attraction.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function AttractionCard({
  attraction,
  language,
  isFavorite,
  onToggleFavorite,
}: {
  attraction: Attraction
  language: string
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}) {
  const title = attraction.title[language as keyof typeof attraction.title] || attraction.title.en
  const description =
    attraction.description[language as keyof typeof attraction.description] || attraction.description.en

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-48 md:h-auto relative">
          <Image src={attraction.image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <button
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md"
            onClick={() => onToggleFavorite(attraction.id)}
          >
            {isFavorite ? (
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            ) : (
              <StarOff className="h-5 w-5 text-gray-400" />
            )}
          </button>
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
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(attraction.location)}`}
              target="_blank"
            >
              <Button size="sm">View on Map</Button>
            </Link>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
