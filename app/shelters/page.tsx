import { shelters } from "@/lib/data"
import ShelterCard from "@/components/shelter-card"

export default function SheltersPage() {
  return (
    <main className="container py-12">
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Animal Shelters</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our list of verified animal shelters and find one that resonates with your values. Every donation, no
            matter the size, makes a difference in the lives of animals in need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shelters.map((shelter) => (
            <ShelterCard key={shelter.id} shelter={shelter} />
          ))}
        </div>
      </section>
    </main>
  )
}

