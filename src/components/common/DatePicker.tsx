import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import dayjs from "dayjs"
// import dayjs from "dayjs"

interface props {
  date: string | undefined
  // setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  setDate: (date: Date | undefined) => void
}

function Calendar22({date, setDate}:props) {
  // console.log(date ?? new Date())
  const [open, setOpen] = useState(false)
  const newDate = date ? new Date(dayjs(date).add(1, "day").format("YYYY-MM-DD")) : new Date()
  // console.log(newDate)
  // const temp = dayjs(date).add(1, "day").format("YYYY-MM-DD")
  // console.log(newDate)

  return (
    <div className="flex flex-col gap-3">
      <Label htmlFor="date" className="font-semibold">
        Filter by month
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal text-gray-500"
          >
            {date ? date : "Select by date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={newDate}
            captionLayout="dropdown"
            onSelect={(d) => {
              // const dateFormat = dayjs(date).format("YYYY-MM-DD")
              // console.log(dayjs(d).format("YYYY-MM-DD"))
              setDate(d)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Calendar22
