import { CategoryPage } from "@/components/category-page"
import { attractions } from "@/data/attractions"

export default function CulturePage() {
  return (
    <CategoryPage
      category="culture"
      attractions={attractions.filter((a) => a.category === "culture")}
      description="Immerse yourself in Africa's rich cultural tapestry, where ancient traditions blend with contemporary expressions. Experience vibrant festivals, traditional ceremonies, authentic village life, and the warm hospitality that makes African cultures so unique and captivating."
      image="https://img.freepik.com/free-psd/beautiful-leaves-isolated_23-2150114772.jpg?semt=ais_hybrid&w=740"
    />
  )
}
