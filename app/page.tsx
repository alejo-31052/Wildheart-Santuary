import Link from "next/link"
import { Button } from "@/components/ui/button"
import ShelterCard from "@/components/shelter-card"
import { shelters } from "@/lib/data"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/placeholder.svg?height=500&width=1920"
            alt="Hero background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Help Animals in Need</h1>
          <p className="text-xl text-white mb-8">
            Support animal shelters through donations and make a difference in the lives of animals waiting for their
            forever homes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/shelters">Browse Shelters</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/80 text-primary hover:bg-background">
              <Link href="/register/shelter">Register Your Shelter</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Shelters Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Animal Shelters</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These shelters are working tirelessly to rescue, rehabilitate, and rehome animals in need. Your support can
            help them continue their vital work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shelters.map((shelter) => (
            <ShelterCard key={shelter.id} shelter={shelter} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/shelters">View All Shelters</Link>
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-muted">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Supporting animal shelters has never been easier. Follow these simple steps to make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Shelters</h3>
              <p className="text-muted-foreground">
                Explore our list of verified animal shelters and learn about their mission and needs.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose How to Help</h3>
              <p className="text-muted-foreground">
                Select from one-time donations, recurring support, or purchase items from their wishlist.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make a Difference</h3>
              <p className="text-muted-foreground">
                Your contribution goes directly to helping animals receive the care and support they need.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

