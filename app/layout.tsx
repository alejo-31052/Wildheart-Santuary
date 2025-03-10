import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PawFund - Support Animal Shelters",
  description:
    "Help animal shelters through donations and make a difference in the lives of animals waiting for their forever homes.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <div className="flex-grow">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}



import './globals.css'