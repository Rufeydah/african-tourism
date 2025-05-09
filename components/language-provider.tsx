"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "am" | "sw"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "app.title": "African Tourism Assistant",
    "home.welcome": "Welcome to Africa",
    "home.explore": "Explore Destinations",
    "home.attractions": "Tourist Attractions",
    "home.recommendations": "Recommendations",
    "home.favorites": "Favorites",
    "home.chat": "Translate",
    "language.en": "English",
    "language.am": "Amharic",
    "language.sw": "Swahili",
    "attractions.nature": "Nature",
    "attractions.culture": "Culture",
    "attractions.history": "History",
    "attractions.food": "Food",
    "chat.placeholder": "Ask me about tourism in Africa...",
    "chat.send": "Send",
    "explore.nature.description":
      "Explore Africa's breathtaking landscapes, from the Serengeti plains to the Atlas Mountains.",
    "explore.culture.description":
      "Discover the rich cultural heritage of Africa through its art, music, and traditional ceremonies.",
    "explore.history.description":
      "Journey through time with Africa's historical sites, from ancient Egyptian pyramids to colonial-era architecture.",
    "explore.food.description":
      "Savor the diverse flavors of African cuisine, from Ethiopian injera to South African braai.",
    "category.nearby": "Nearby",
    "category.seasonal": "Seasonal",
    "category.popular": "Popular",
    settings: "Settings",
    back: "Back",
    "view.details": "View Details",
    "view.map": "View on Map",
    "no.favorites": "No favorites saved yet",
    "explore.attractions": "Explore Attractions",
  },
  am: {
    "app.title": "የአፍሪካ ቱሪዝም ረዳት",
    "home.welcome": "እንኳን ወደ አፍሪካ በደህና መጡ",
    "home.explore": "መዳረሻዎችን ያስሱ",
    "home.attractions": "የቱሪስት መስህቦች",
    "home.recommendations": "ምክሮች",
    "home.favorites": "ተወዳጆች",
    "home.chat": "ትርጉም",
    "language.en": "እንግሊዘኛ",
    "language.am": "አማርኛ",
    "language.sw": "ስዋሂሊ",
    "attractions.nature": "ተፈጥሮ",
    "attractions.culture": "ባህል",
    "attractions.history": "ታሪክ",
    "attractions.food": "ምግብ",
    "chat.placeholder": "ስለ አፍሪካ ቱሪዝም ይጠይቁኝ...",
    "chat.send": "ላክ",
    "explore.nature.description": "ከሰረንጌቲ ሜዳዎች እስከ አትላስ ተራሮች ድረስ የአፍሪካን አስደናቂ የተፈጥሮ ውበት ይመልከቱ።",
    "explore.culture.description": "በኪነጥበብ፣ በሙዚቃ እና በባህላዊ ስነ-ስርዓቶች በኩል የአፍሪካን ሀብታም የባህል ቅርስ ይመልከቱ።",
    "explore.history.description": "ከጥንታዊ የግብጽ ፒራሚዶች እስከ የቅኝ ግዛት ዘመን አርክቴክቸር ድረስ ከአፍሪካ ታሪካዊ ቦታዎች ጋር በጊዜ ውስጥ ጉዞ ያድርጉ።",
    "explore.food.description": "ከኢትዮጵያ እንጀራ እስከ ደቡብ አፍሪካ ብራይ ድረስ የአፍሪካ ምግብ ልዩ ጣዕሞችን ይቅመሱ።",
    "category.nearby": "በአቅራቢያ",
    "category.seasonal": "የወቅት",
    "category.popular": "ታዋቂ",
    settings: "ቅንብሮች",
    back: "ተመለስ",
    "view.details": "ዝርዝሮችን ይመልከቱ",
    "view.map": "በካርታ ላይ ይመልከቱ",
    "no.favorites": "እስካሁን ምንም ተወዳጆች አልተቀመጡም",
    "explore.attractions": "መስህቦችን ያስሱ",
  },
  sw: {
    "app.title": "Msaidizi wa Utalii wa Afrika",
    "home.welcome": "Karibu Afrika",
    "home.explore": "Chunguza Maeneo",
    "home.attractions": "Vivutio vya Utalii",
    "home.recommendations": "Mapendekezo",
    "home.favorites": "Vipendwa",
    "home.chat": "Msaidizi wa Mazungumzo",
    "language.en": "Kiingereza",
    "language.am": "Kiamhari",
    "language.sw": "Kiswahili",
    "attractions.nature": "Asili",
    "attractions.culture": "Utamaduni",
    "attractions.history": "Historia",
    "attractions.food": "Chakula",
    "chat.placeholder": "Niulize kuhusu utalii Afrika...",
    "chat.send": "Tuma",
    "explore.nature.description":
      "Chunguza mandhari ya kupendeza ya Afrika, kutoka tambarare za Serengeti hadi Milima ya Atlas.",
    "explore.culture.description":
      "Gundua urithi tajiri wa kitamaduni wa Afrika kupitia sanaa yake, muziki, na sherehe za jadi.",
    "explore.history.description":
      "Safari kupitia wakati na maeneo ya kihistoria ya Afrika, kutoka piramidi za kale za Misri hadi usanifu wa enzi ya ukoloni.",
    "explore.food.description":
      "Onja ladha mbalimbali za chakula cha Afrika, kutoka injera ya Ethiopia hadi braai ya Afrika Kusini.",
    "category.nearby": "Karibu",
    "category.seasonal": "Ya Msimu",
    "category.popular": "Maarufu",
    settings: "Mipangilio",
    back: "Rudi",
    "view.details": "Tazama Maelezo",
    "view.map": "Tazama kwenye Ramani",
    "no.favorites": "Hakuna vipendwa vilivyohifadhiwa bado",
    "explore.attractions": "Chunguza Vivutio",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && ["en", "am", "sw"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
