export default function AboutPage() {
  return (
    <main className="container py-12">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About PawFund</h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground mb-4">
            PawFund was created with a simple but powerful mission: to connect animal lovers with shelters in need of
            support. We believe that every animal deserves love, care, and a safe place to call home.
          </p>
          <p className="text-muted-foreground">
            By creating a platform that makes it easy to discover and donate to animal shelters, we aim to increase the
            resources available to these vital organizations and help more animals find their forever homes.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">How We Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">For Animal Shelters</h3>
              <p className="text-muted-foreground">
                We provide a platform for animal shelters to showcase their work, share their needs, and receive
                donations. Our shelter registration process ensures that all organizations on our platform are
                legitimate and dedicated to animal welfare.
              </p>
            </div>
            <div className="bg-muted p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">For Animal Lovers</h3>
              <p className="text-muted-foreground">
                We make it easy to discover shelters doing important work, learn about their specific needs, and
                contribute in ways that match your preferences—whether through one-time donations, recurring support, or
                purchasing items from their wishlists.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            PawFund was founded in 2023 by a group of animal lovers who saw a need for a better way to connect donors
            with animal shelters. After volunteering at various shelters, our founders noticed that many organizations
            struggled with fundraising and visibility, despite doing vital work in their communities.
          </p>
          <p className="text-muted-foreground mb-4">
            Inspired by crowdfunding platforms but focused specifically on the needs of animal welfare organizations,
            PawFund was born. Since our launch, we've helped connect thousands of donors with shelters across the
            country, resulting in better care for countless animals in need.
          </p>
          <p className="text-muted-foreground">
            Today, we continue to grow our platform, adding new features and shelters to make an even bigger impact in
            the world of animal welfare.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Join Us</h2>
          <p className="text-muted-foreground mb-6">
            Whether you're an animal shelter looking for support or an animal lover wanting to make a difference, we
            invite you to join the PawFund community. Together, we can create a world where every animal has the care,
            love, and home they deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/register/user"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Register as a Donor
            </a>
            <a
              href="/register/shelter"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
            >
              Register Your Shelter
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

