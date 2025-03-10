"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { User, Donation } from "@/lib/types"
import { formatCurrency, formatDate, getShelterById } from "@/lib/utils"

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [donations, setDonations] = useState<Donation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/login?redirect=/dashboard")
      return
    }

    setUser(JSON.parse(currentUser))

    // Get user's donations
    const allDonations = JSON.parse(localStorage.getItem("donations") || "[]")
    const userDonations = allDonations.filter((donation: Donation) => donation.userId === JSON.parse(currentUser).id)

    setDonations(userDonations)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <main className="container py-12">
        <div className="max-w-4xl mx-auto text-center">
          <p>Loading dashboard...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">Donation History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Donations</CardTitle>
                  <CardDescription>Your lifetime contribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {formatCurrency(donations.reduce((sum, donation) => sum + donation.amount, 0))}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shelters Supported</CardTitle>
                  <CardDescription>Number of shelters you've helped</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{new Set(donations.map((donation) => donation.shelterId)).size}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent donations</CardDescription>
              </CardHeader>
              <CardContent>
                {donations.length === 0 ? (
                  <p className="text-muted-foreground">You haven't made any donations yet.</p>
                ) : (
                  <div className="space-y-4">
                    {donations.slice(0, 5).map((donation) => {
                      const shelter = getShelterById(donation.shelterId)
                      return (
                        <div key={donation.id} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-medium">{shelter?.name || "Unknown Shelter"}</p>
                            <p className="text-sm text-muted-foreground">
                              {donation.type === "recurring"
                                ? `Recurring (${donation.frequency})`
                                : "One-time donation"}
                            </p>
                            <p className="text-xs text-muted-foreground">{formatDate(donation.createdAt)}</p>
                          </div>
                          <p className="font-semibold">{formatCurrency(donation.amount)}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>All your contributions</CardDescription>
              </CardHeader>
              <CardContent>
                {donations.length === 0 ? (
                  <p className="text-muted-foreground">You haven't made any donations yet.</p>
                ) : (
                  <div className="space-y-4">
                    {donations.map((donation) => {
                      const shelter = getShelterById(donation.shelterId)
                      return (
                        <div key={donation.id} className="flex justify-between items-center border-b pb-3">
                          <div>
                            <p className="font-medium">{shelter?.name || "Unknown Shelter"}</p>
                            <p className="text-sm text-muted-foreground">
                              {donation.type === "recurring"
                                ? `Recurring (${donation.frequency})`
                                : "One-time donation"}
                            </p>
                            <p className="text-xs text-muted-foreground">{formatDate(donation.createdAt)}</p>
                          </div>
                          <p className="font-semibold">{formatCurrency(donation.amount)}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-muted-foreground">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-muted-foreground">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Member Since</p>
                    <p className="text-muted-foreground">{user ? formatDate(user.createdAt) : ""}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

