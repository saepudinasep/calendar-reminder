import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from "@fullcalendar/multimonth";

export default function Calendar({ events, onDateClick, onEventClick }) {
    return (
        <div className="max-w-6xl mx-auto">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, multiMonthPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "multiMonthYear,dayGridMonth,timeGridWeek,timeGridDay"
                }}
                views={{
                    multiMonthYear: {
                        type: "multiMonth",
                        duration: { years: 1 },
                        buttonText: "Year"
                    }
                }}
                events={events}
                dateClick={(info) => onDateClick(info)}
                eventClick={(info) => onEventClick(info.event)}
            />
        </div>
    );
}

