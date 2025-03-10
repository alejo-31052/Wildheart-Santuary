import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Shelter } from "@/lib/types"

interface ShelterCardProps {
  shelter: Shelter
}

export default function ShelterCard({ shelter }: ShelterCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={shelter.image || "/placeholder.svg?height=200&width=400"}
          alt={shelter.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <h3 className="text-xl font-bold">{shelter.name}</h3>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{shelter.description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full">
          <Link href={`/shelters/${shelter.id}`}>Donate Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

