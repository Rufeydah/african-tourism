import { CategoryPage } from "@/components/category-page"
import { attractions } from "@/data/attractions"

export default function HistoryPage() {
  return (
    <CategoryPage
      category="history"
      attractions={attractions.filter((a) => a.category === "history")}
      description="Journey through Africa's fascinating historical timeline, from ancient civilizations and kingdoms to colonial influences and independence movements. Explore archaeological sites, historical monuments, and museums that tell the story of humanity's origins and Africa's pivotal role in world history."
      image="/placeholder.svg?height=500&width=1000"
    />
  )
}
