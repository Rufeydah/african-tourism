import { CategoryPage } from "@/components/category-page"
import { attractions } from "@/data/attractions"

export default function NaturePage() {
  return (
    <CategoryPage
      category="nature"
      attractions={attractions.filter((a) => a.category === "nature")}
      description="Discover Africa's breathtaking natural wonders, from vast savannas and lush rainforests to majestic mountains and pristine beaches. Experience the continent's incredible biodiversity and witness some of the world's most spectacular wildlife in their natural habitats."
      image="/placeholder.svg?height=500&width=1000"
    />
  )
}
