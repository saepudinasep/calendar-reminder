import { useEffect, useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import multiMonthPlugin from "@fullcalendar/multimonth"

export default function Calendar({ events, onDateClick, onEventClick }) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    function renderEventContent(eventInfo) {
        return (
            <div className="fc-event-custom">
                <div className="fc-event-time-custom">
                    {eventInfo.timeText}
                </div>
                <div className="fc-event-title-custom">
                    {eventInfo.event.title}
                </div>
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-6xl rounded-xl bg-white p-2 shadow sm:p-4">
            <FullCalendar
                // eventDisplay="block"
                eventContent={renderEventContent}

                plugins={[
                    dayGridPlugin,
                    timeGridPlugin,
                    interactionPlugin,
                    multiMonthPlugin
                ]}
                initialView={isMobile ? "timeGridDay" : "dayGridMonth"}

                headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: isMobile
                        ? "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay"
                        : "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay today"
                }}

                views={{
                    multiMonthYear: {
                        type: "multiMonth",
                        duration: { years: 1 },
                        buttonText: "Year"
                    }
                }}

                height={isMobile ? "auto" : "auto"}
                contentHeight={isMobile ? "auto" : "auto"}

                dayMaxEvents={isMobile ? 2 : true}
                moreLinkClick="popover"

                events={events}
                dateClick={onDateClick}
                eventClick={onEventClick}

                eventDisplay="block"
                eventTimeFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false
                }}

                dayHeaderFormat={
                    isMobile ? { weekday: "narrow" } : { weekday: "short" }
                }
            />
        </div>
    )
}
