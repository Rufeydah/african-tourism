"use client"

import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { MapPin, Compass, Star, MessageSquare, Globe, Landmark, Utensils, BookOpen } from "lucide-react"
import { MobileMenu } from "@/components/mobile-menu"
import Image from "next/image"

export function HomeScreen() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-800 dark:text-blue-300">{t("app.title")}</h1>
          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <LanguageSelector />
            </div>
            <MobileMenu />
          </div>
        </header>

        <div className="mb-8">
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-4">
            {/* <Image src="/images/africa.jpg" alt="African landscape" fill className="object-cover" priority /> */}
            <Image fill src="/images/africa.jpg" alt="African history"  className="object-cover"  />

            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-4 drop-shadow-lg">{t("home.welcome")}</h2>
              <p className="text-lg md:text-xl text-center mb-6 max-w-2xl drop-shadow-md">
                Discover the beauty, culture, and wonders of the African continent
              </p>
              <Link href="/explore">
                <Button className="bg-blue-600 hover:bg-blue-700 text-lg px-6 py-6 h-auto">{t("home.explore")}</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/attractions" className="block">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <MapPin className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-center font-medium">{t("home.attractions")}</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/recommendations" className="block">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Compass className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-center font-medium">{t("home.recommendations")}</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/favorites" className="block">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Star className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-center font-medium">{t("home.favorites")}</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/chat" className="block">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
                <span className="text-center font-medium">{t("home.chat")}</span>
              </CardContent>
            </Card>
          </Link>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-300">{t("home.explore")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link href="/attractions/nature" className="block">
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 md:h-60">
                <Image src="/images/nature.png" alt="African nature" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Globe className="h-5 w-5 text-green-400" />
                    <h3 className="font-semibold">{t("attractions.nature")}</h3>
                  </div>
                  <p className="text-sm text-white/80">
                    Explore Africa's breathtaking landscapes, from the Serengeti plains to the Atlas Mountains.
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/attractions/culture" className="block">
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 md:h-60">
                <Image src="/images/cultur.png" alt="African culture" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Landmark className="h-5 w-5 text-purple-400" />
                    <h3 className="font-semibold">{t("attractions.culture")}</h3>
                  </div>
                  <p className="text-sm text-white/80">
                    Discover the rich cultural heritage of Africa through its art, music, and traditional ceremonies.
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/attractions/history" className="block">
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 md:h-60">
                <Image src="/images/history.png" alt="African history" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-5 w-5 text-amber-400" />
                    <h3 className="font-semibold">{t("attractions.history")}</h3>
                  </div>
                  <p className="text-sm text-white/80">
                    Journey through time with Africa's historical sites, from ancient Egyptian pyramids to colonial-era
                    architecture.
                  </p>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/attractions/food" className="block">
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 md:h-60">
                <Image src="/images/food.png" alt="African food" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Utensils className="h-5 w-5 text-red-400" />
                    <h3 className="font-semibold">{t("attractions.food")}</h3>
                  </div>
                  <p className="text-sm text-white/80">
                    Savor the diverse flavors of African cuisine, from Ethiopian injera to South African braai.
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </div>

        <div className="mt-12 mb-8">
          <h2 className="text-xl font-semibold mb-6 text-blue-800 dark:text-blue-300">Featured Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: "serengeti",
                image: "/images/NationalPark.png",
                title: "Serengeti National Park",
                location: "Tanzania",
              },
              {
                id: "pyramids",
                image: "/images/Pyramids.png",
                title: "Pyramids of Giza",
                location: "Egypt",
              },
              {
                id: "victoria-falls",
                image: "/images/VictoriaFalls.png",
                title: "Victoria Falls",
                location: "Zambia/Zimbabwe",
              },
            ].map((destination) => (
              <Link key={destination.id} href={`/attractions/${destination.id}`} className="block">
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={destination.image || "/placeholder.svg"}
                      alt={destination.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{destination.title}</h3>
                    <div className="flex items-center text-gray-500">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{destination.location}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
