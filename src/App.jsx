import { useEffect, useState } from "react"
import Calendar from "./components/Calendar"
import EventModal from "./components/EventModal"
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from "./api/eventApi"

export default function App() {
  const [events, setEvents] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [mode, setMode] = useState('create')
  const [activeEvent, setActiveEvent] = useState(null)

  /* ================= LOAD EVENTS ================= */
  const loadEvents = async () => {
    const res = await getEvents()
    console.log('API result:', res)

    setEvents(
      res.data.map(e => ({
        id: e.id,
        title: e.title,
        start: e.date, // ⬅️ IMPORTANT (lihat catatan bawah)
        extendedProps: {
          time: e.time
        }
      }))
    )
  }

  useEffect(() => {
    loadEvents()
  }, [])

  /* ================= CREATE ================= */
  const handleDateClick = (info) => {
    setMode('create')
    setSelectedDate(info.dateStr)
    setActiveEvent(null)
    setModalOpen(true)
  }

  /* ================= EDIT ================= */
  const handleEventClick = (event) => {
    setMode('edit')
    setSelectedDate(event.startStr)
    setActiveEvent({
      id: event.id,
      title: event.title,
      time: event.extendedProps.time
    })
    setModalOpen(true)
  }

  /* ================= SUBMIT ================= */
  const handleSubmit = async (data) => {
    if (mode === 'edit') {
      await updateEvent(data)
    } else {
      await createEvent(data)
    }

    setModalOpen(false)
    loadEvents()
  }

  /* ================= DELETE ================= */
  const handleDelete = async (event) => {
    await deleteEvent(event.id)
    setModalOpen(false)
    loadEvents()
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Calendar
        events={events}
        onDateClick={handleDateClick}
        onEventClick={handleEventClick}
      />

      <EventModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={mode}
        date={selectedDate}
        eventData={activeEvent}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </div>
  )
}
