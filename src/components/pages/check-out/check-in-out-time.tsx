"use client"
import { type FC, type ReactNode, useState } from "react"
import type React from "react"

interface CheckInOutTimeProps {
  date?: string
  time?: string
  icon: ReactNode
  label: string
  options: { label: string; value: number }[]
}

const CheckInOutTime: FC<CheckInOutTimeProps> = ({ date, time, icon, label, options }) => {
  const [nights, setNights] = useState(1)
  const [rooms, setRooms] = useState(1)

  const value = label === "night" || label === "rental day" ? nights : rooms

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = Number.parseInt(e.target.value)
    if (label === "night" || label === "rental day") {
      setNights(newValue)
    } else {
      setRooms(newValue)
    }
  }

  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-2">{date}</h4>
      <p className="text-sm text-gray-600">{time}</p>
      <div className="flex items-center gap-2 mt-2">
        {icon}
        <span className="text-sm text-gray-600">
          {value} {label}
        </span>
        <select value={value} onChange={handleChange} className="text-sm border-none focus:outline-none focus:ring-0">
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CheckInOutTime
