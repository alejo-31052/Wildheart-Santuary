"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import { shelters } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from "lucide-react"

export default function ShelterDetailPage() {
  const { id } = useParams()
  const shelter = shelters.find((s) => s.id === id)
  const [donationAmount, setDonationAmount] = useState("25")
  const [donationType, setDonationType] = useState("one-time")
  const [donationFrequency, setDonationFrequency] = useState("monthly")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is logged in
  useState(() => {
    const user = localStorage.getItem("currentUser")
    setIsLoggedIn(!!user)
  })

  if (!shelter) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Shelter Not Found</h1>
        <p className="text-muted-foreground mb-6">The shelter you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <a href="/shelters">Back to Shelters</a>
        </Button>
      </div>
    )
  }

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoggedIn) {
      // Redirect to login page with return URL
      window.location.href = `/login?redirect=/shelters/${id}`
      return
    }

    // In a real app, this would process the payment
    // For now, just show an alert
    alert(
      `Thank you for your ${donationType === "one-time" ? "one-time" : "recurring"} donation of $${donationAmount} to ${shelter.name}!`,
    )

    // Save donation to localStorage for demo purposes
    const donations = JSON.parse(localStorage.getItem("donations") || "[]")
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")

    donations.push({
      id: Date.now().toString(),
      userId: user.id,
      shelterId: shelter.id,
      amount: Number.parseFloat(donationAmount),
      type: donationType,
      frequency: donationType === "recurring" ? donationFrequency : undefined,
      createdAt: new Date().toISOString(),
    })

    localStorage.setItem("donations", JSON.stringify(donations))
  }

  return (
    <main className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{shelter.name}</h1>
          <p className="text-muted-foreground">{shelter.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2">
            <img
              src={shelter.image || "/placeholder.svg?height=400&width=800"}
              alt={shelter.name}
              className="w-full h-auto rounded-lg mb-6"
            />

            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">About {shelter.name}</h2>
              <p className="text-muted-foreground mb-4">{shelter.longDescription}</p>

              {shelter.donationNeeds && (
                <>
                  <h3 className="text-xl font-semibold mb-3">Current Needs</h3>
                  <ul className="list-disc pl-5 mb-6">
                    {shelter.donationNeeds.map((need, index) => (
                      <li key={index} className="text-muted-foreground mb-1">
                        {need}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Get in touch with {shelter.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {shelter.location && (
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-muted-foreground text-sm">{shelter.location}</p>
                  </div>
                )}
                {shelter.contactEmail && (
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-muted-foreground text-sm">{shelter.contactEmail}</p>
                  </div>
                )}
                {shelter.contactPhone && (
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-muted-foreground text-sm">{shelter.contactPhone}</p>
                  </div>
                )}
                {shelter.website && (
                  <div>
                    <h4 className="font-medium mb-1">Website</h4>
                    <a
                      href={shelter.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm flex items-center hover:underline"
                    >
                      Visit Website <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>

            {shelter.amazonWishlist && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Amazon Wishlist</CardTitle>
                  <CardDescription>Purchase items directly from their wishlist</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    You can help by purchasing items directly from {shelter.name}'s Amazon wishlist. Items will be
                    shipped directly to the shelter.
                  </p>
                  <Button asChild className="w-full">
                    <a
                      href={shelter.amazonWishlist}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                    >
                      View Wishlist <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">Support {shelter.name}</h2>

          <Tabs defaultValue="donate" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="donate">Make a Donation</TabsTrigger>
              <TabsTrigger value="membership">Become a Member</TabsTrigger>
            </TabsList>

            <TabsContent value="donate" className="mt-6">
              <form onSubmit={handleDonation}>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="donation-amount">Donation Amount</Label>
                    <div className="grid grid-cols-4 gap-4 mt-2">
                      {["10", "25", "50", "100"].map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={donationAmount === amount ? "default" : "outline"}
                          onClick={() => setDonationAmount(amount)}
                          className="h-12"
                        >
                          ${amount}
                        </Button>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="custom-amount">Custom Amount</Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          id="custom-amount"
                          type="number"
                          min="1"
                          step="1"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          className="pl-8"
                        />
                      </div>
                    </div>
                  </div>

                  <RadioGroup value={donationType} onValueChange={setDonationType} className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-time" id="one-time" />
                      <Label htmlFor="one-time">One-time donation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="recurring" id="recurring" />
                      <Label htmlFor="recurring">Recurring donation</Label>
                    </div>
                  </RadioGroup>

                  {donationType === "recurring" && (
                    <div className="pl-6">
                      <Label htmlFor="frequency">Frequency</Label>
                      <RadioGroup
                        value={donationFrequency}
                        onValueChange={setDonationFrequency}
                        className="space-y-3 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly">Monthly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="quarterly" id="quarterly" />
                          <Label htmlFor="quarterly">Quarterly</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yearly" id="yearly" />
                          <Label htmlFor="yearly">Yearly</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  <Button type="submit" className="w-full">
                    {donationType === "one-time"
                      ? `Donate $${donationAmount}`
                      : `Donate $${donationAmount} ${donationFrequency}`}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="membership" className="mt-6">
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  Become a member of {shelter.name} and provide ongoing support. Members receive updates about the
                  animals they're helping and special recognition on the shelter's website.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Basic</CardTitle>
                      <CardDescription>$10/month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>Monthly newsletter</li>
                        <li>Name on supporter wall</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setDonationAmount("10")
                          setDonationType("recurring")
                          setDonationFrequency("monthly")
                          document.getElementById("donate-tab")?.click()
                        }}
                      >
                        Select
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="border-primary">
                    <CardHeader>
                      <CardTitle>Supporter</CardTitle>
                      <CardDescription>$25/month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>Monthly newsletter</li>
                        <li>Name on supporter wall</li>
                        <li>Quarterly impact report</li>
                        <li>Digital certificate</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setDonationAmount("25")
                          setDonationType("recurring")
                          setDonationFrequency("monthly")
                          document.getElementById("donate-tab")?.click()
                        }}
                      >
                        Select
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Champion</CardTitle>
                      <CardDescription>$50/month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li>Monthly newsletter</li>
                        <li>Name on supporter wall</li>
                        <li>Quarterly impact report</li>
                        <li>Digital certificate</li>
                        <li>Annual thank you gift</li>
                        <li>VIP shelter events</li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => {
                          setDonationAmount("50")
                          setDonationType("recurring")
                          setDonationFrequency("monthly")
                          document.getElementById("donate-tab")?.click()
                        }}
                      >
                        Select
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}

