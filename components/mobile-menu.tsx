"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu, Home, MapPin, Compass, Star, MessageSquare, Globe, Settings } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { LanguageSelector } from "@/components/language-selector"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()

  const closeMenu = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] sm:w-[350px] pt-10">
        <div className="flex flex-col h-full">
          <div className="mb-6">
            <LanguageSelector />
          </div>

          <nav className="space-y-2">
            <Link href="/" onClick={closeMenu}>
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-5 w-5" />
                Home
              </Button>
            </Link>
            <Link href="/attractions" onClick={closeMenu}>
              <Button variant="ghost" className="w-full justify-start">
                <MapPin className="mr-2 h-5 w-5" />
                {t("home.attractions")}
              </Button>
            </Link>
            <Link href="/recommendations" onClick={closeMenu}>
              <Button variant="ghost" className="w-full justify-start">
                <Compass className="mr-2 h-5 w-5" />
                {t("home.recommendations")}
              </Button>
            </Link>
            <Link href="/favorites" onClick={closeMenu}>
              <Button variant="ghost" className="w-full justify-start">
                <Star className="mr-2 h-5 w-5" />
                {t("home.favorites")}
              </Button>
            </Link>
            <Link href="/chat" onClick={closeMenu}>
              <Button variant="ghost" className="w-full justify-start">
                <MessageSquare className="mr-2 h-5 w-5" />
                {t("home.chat")}
              </Button>
            </Link>
            <Link href="/explore" onClick={closeMenu}>
              <Button variant="ghost" className="w-full justify-start">
                <Globe className="mr-2 h-5 w-5" />
                {t("home.explore")}
              </Button>
            </Link>
          </nav>

          <div className="mt-6 pt-6 border-t">
            <h3 className="text-sm font-medium mb-2">Categories</h3>
            <div className="space-y-2">
              <Link href="/attractions/nature" onClick={closeMenu}>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  {t("attractions.nature")}
                </Button>
              </Link>
              <Link href="/attractions/culture" onClick={closeMenu}>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  {t("attractions.culture")}
                </Button>
              </Link>
              <Link href="/attractions/history" onClick={closeMenu}>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  {t("attractions.history")}
                </Button>
              </Link>
              <Link href="/attractions/food" onClick={closeMenu}>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  {t("attractions.food")}
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="/settings" onClick={closeMenu}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
