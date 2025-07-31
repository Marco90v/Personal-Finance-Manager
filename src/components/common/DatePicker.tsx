import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
// import dayjs from "dayjs"

interface props {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

function Calendar22({date, setDate}:props) {
  const [open, setOpen] = useState(false)
  // const [date, setDate] = useState<Date | undefined>(undefined) 

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="px-1">
        Filter by month
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal text-gray-500"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              // const dateFormat = dayjs(date).format("YYYY-MM-DD")
              setDate(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Calendar22
