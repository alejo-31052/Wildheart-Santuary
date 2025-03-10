"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Shelter } from "@/lib/types"

export default function ShelterRegistrationPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [longDescription, setLongDescription] = useState("")
  const [location, setLocation] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [website, setWebsite] = useState("")
  const [amazonWishlist, setAmazonWishlist] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image size should be less than 2MB")
      return
    }

    // Convert to base64 for localStorage storage
    const reader = new FileReader()
    reader.onload = () => {
      setImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple validation
    if (!name || !description || !contactEmail) {
      setError("Name, description, and contact email are required")
      setIsLoading(false)
      return
    }

    // Get existing custom shelters from localStorage
    const customShelters = JSON.parse(localStorage.getItem("customShelters") || "[]") as Shelter[]

    // Check if shelter name already exists
    if (customShelters.some((shelter) => shelter.name === name)) {
      setError("A shelter with this name already exists")
      setIsLoading(false)
      return
    }

    // Create new shelter
    const newShelter: Shelter = {
      id: `custom-${Date.now()}`,
      name,
      description,
      longDescription,
      location,
      contactEmail,
      contactPhone,
      website,
      amazonWishlist,
      image,
      donationNeeds: [],
    }

    // Add shelter to localStorage
    customShelters.push(newShelter)
    localStorage.setItem("customShelters", JSON.stringify(customShelters))

    // Redirect after successful registration
    setTimeout(() => {
      router.push(`/shelters/${newShelter.id}`)
    }, 500)
  }

  return (
    <main className="container py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Register Your Shelter</CardTitle>
            <CardDescription>
              Provide information about your animal shelter to start receiving donations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Shelter Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Happy Tails Rescue"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Input
                  id="description"
                  type="text"
                  placeholder="A brief description of your shelter"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  A short description that will appear on shelter cards (max 100 characters)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="long-description">Detailed Description</Label>
                <Textarea
                  id="long-description"
                  placeholder="Provide detailed information about your shelter, its mission, and how donations will be used"
                  value={longDescription}
                  onChange={(e) => setLongDescription(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="123 Rescue Lane, Anytown, USA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="info@yourshelter.org"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Contact Phone</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://www.yourshelter.org"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amazon-wishlist">Amazon Wishlist URL</Label>
                <Input
                  id="amazon-wishlist"
                  type="url"
                  placeholder="https://www.amazon.com/hz/wishlist/ls/..."
                  value={amazonWishlist}
                  onChange={(e) => setAmazonWishlist(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  If you have an Amazon wishlist, donors can purchase items directly for your shelter
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Shelter Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  Upload an image of your shelter or the animals you help (max 2MB)
                </p>

                {image && (
                  <div className="mt-2">
                    <p className="text-sm font-medium mb-1">Preview:</p>
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Shelter preview"
                      className="w-full max-w-md h-auto rounded-md"
                    />
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Registering shelter..." : "Register Shelter"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already registered your shelter?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

