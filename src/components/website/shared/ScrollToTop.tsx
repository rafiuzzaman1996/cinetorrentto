"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }
    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      {visible && (
        <Button
          size="icon"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 rounded-full shadow-lg bg-red-600 text-white hover:bg-red-700 font-bold cursor-pointer"
        >
          <ArrowUp className="h-10 w-5" />
        </Button>
      )}
    </>
  )
}
