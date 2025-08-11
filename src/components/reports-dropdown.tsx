"use client"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { Button } from "./ui/button"

const reportCategories = [
  { label: "Report Issue", href: "/en/reports/report-issue" },
  { label: "Emergency", href: "/en/reports/emergency-assistance" },
  { label: "Submit Dispute", href: "/en/reports/submit-dispute" },
]

const ReportDropdown = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(reportCategories[0])

  useEffect(() => {
    const matched = reportCategories.find((item) =>
      pathname.includes(item.href)
    )
    if (matched) {
      setSelected(matched)
    }
  }, [pathname])

  return (
    <div className="relative">
      <Button
        variant="destructive"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 w-32 sm:w-38 py-2 text-xs sm:text-sm rounded-md font-medium"
      >
        {selected.label}
        <ChevronDown size={16} />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50">
          {reportCategories.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ReportDropdown
