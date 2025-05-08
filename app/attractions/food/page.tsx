import { CategoryPage } from "@/components/category-page"
import { attractions } from "@/data/attractions"

export default function FoodPage() {
  return (
    <CategoryPage
      category="food"
      attractions={attractions.filter((a) => a.category === "food")}
      description="Savor the diverse and flavorful culinary traditions of Africa, from spicy North African tagines to Ethiopian injera with rich stews, West African jollof rice, and South African braai. Discover local markets, cooking classes, food festivals, and restaurants that showcase the continent's gastronomic heritage."
      image="/placeholder.svg?height=500&width=1000"
    />
  )
}
