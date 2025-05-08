import { AttractionsList } from "@/components/attractions-list"
import { attractions } from "@/data/attractions"

export default function AttractionsPage() {
  return <AttractionsList attractions={attractions} />
}
