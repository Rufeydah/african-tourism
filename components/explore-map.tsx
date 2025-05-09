"use client";
import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import { useState } from "react";
import { attractions } from "@/data/attractions"

export function ExploreMap() {
  const { t, language } = useLanguage();
  const [selectedAttraction, setSelectedAttraction] = useState<string | null>(null);

  const selectedAttractionData = attractions.find((a) => a.id === selectedAttraction);

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 flex justify-between items-center bg-white dark:bg-gray-900 shadow-sm z-10">
        <Link href="/">
          <Button variant="ghost" size="sm">Back</Button>
        </Link>
        <h1 className="text-xl font-bold text-blue-800 dark:text-blue-300">{t("home.explore")}</h1>
        <div className="w-20"></div>
      </div>
      <div className="flex-1 relative">
        <MapContainer
          center={[0, 20]}
          zoom={3}
          style={{ width: "100%", height: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            // OpenStreetMap tiles - no API needed
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {attractions.map((attraction) => (
            <Marker
              key={attraction.id}
              position={[attraction.coordinates.lat, attraction.coordinates.lng]}
              eventHandlers={{
                click: () => setSelectedAttraction(attraction.id),
              }}
            >
              <Popup>
                <strong>
                  {attraction.title[language as keyof typeof attraction.title] || attraction.title.en}
                </strong>
                <br />
                <Button size="sm" onClick={() => setSelectedAttraction(attraction.id)}>
                  View Details
                </Button>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        {selectedAttractionData && (
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <Card className="shadow-lg">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {selectedAttractionData.title[language as keyof typeof selectedAttractionData.title] ||
                        selectedAttractionData.title.en}
                    </h3>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="text-sm">{selectedAttractionData.location}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedAttraction(null)}>
                    ✕
                  </Button>
                </div>
                <div className="flex justify-between mt-2">
                  <Link href={`/attractions/${selectedAttractionData.id}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}