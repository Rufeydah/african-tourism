import { AttractionDetails } from "@/components/attraction-details"
import { attractions } from "@/data/attractions"
import { notFound } from "next/navigation"

export default function AttractionPage({ params }: { params: { id: string } }) {
  const attraction = attractions.find((a) => a.id === params.id)

  if (!attraction) {
    notFound()
  }

  return <AttractionDetails attraction={attraction} />
}
