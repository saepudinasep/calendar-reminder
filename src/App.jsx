import { useEffect, useState } from "react"
import Calendar from "./components/Calendar"
import EventModal from "./components/EventModal"
import LoadingOverlay from "./components/LoadingOverlay"
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from "./api/eventApi"
import {
  successAlert,
  errorAlert,
  confirmDelete
} from "./utils/alert"

export default function App() {
  const [events, setEvents] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [mode, setMode] = useState('create')
  const [activeEvent, setActiveEvent] = useState(null)
  const [loading, setLoading] = useState(false)

  /* ================= LOAD EVENTS ================= */
  const loadEvents = async () => {
    try {
      setLoading(true)
      const res = await getEvents()
      console.log('API result:', res)

      setEvents(
        res.data.map(e => ({
          id: e.id,
          title: e.title,
          start: `${e.date}T${e.time}`,
          extendedProps: {
            time: e.time
          }
        }))
      )
    } catch (err) {
      errorAlert("Gagal mengambil data", err)
    } finally {
      setLoading(false)
    }
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
  const handleEventClick = (info) => {
    const event = info.event

    setMode('edit')
    const dateOnly = event.start
      ? event.start.toISOString().split("T")[0]
      : ""
    setSelectedDate(dateOnly)
    setActiveEvent({
      id: event.id,
      title: event.title,
      time: event.extendedProps?.time || ""
    })
    setModalOpen(true)
  }

  /* ================= SUBMIT ================= */
  const handleSubmit = async (data) => {
    try {
      setLoading(true)

      if (mode === 'edit') {
        await updateEvent(data)
        successAlert("Jadwal berhasil diperbarui")
      } else {
        await createEvent(data)
        successAlert("Jadwal berhasil ditambahkan")
      }

      setModalOpen(false)
      loadEvents()
    } catch (err) {
      errorAlert("Gagal menyimpan data", err)
    } finally {
      setLoading(false)
    }
  }

  /* ================= DELETE ================= */
  const handleDelete = async (info) => {
    const event = info.event

    const confirm = await confirmDelete()
    if (!confirm) return

    try {
      setLoading(true)
      await deleteEvent(event.id)
      successAlert("Jadwal berhasil dihapus")
      setModalOpen(false)
      loadEvents()
    } catch (err) {
      errorAlert("Gagal menghapus data", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
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

      <LoadingOverlay show={loading} />
    </>
  )
}
