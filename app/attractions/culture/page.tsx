import { CategoryPage } from "@/components/category-page"
import { attractions } from "@/data/attractions"

export default function CulturePage() {
  return (
    <CategoryPage
      category="culture"
      attractions={attractions.filter((a) => a.category === "culture")}
      description="Immerse yourself in Africa's rich cultural tapestry, where ancient traditions blend with contemporary expressions. Experience vibrant festivals, traditional ceremonies, authentic village life, and the warm hospitality that makes African cultures so unique and captivating."
      image="/placeholder.svg?height=500&width=1000"
    />
  )
}
