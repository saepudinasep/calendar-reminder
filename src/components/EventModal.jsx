'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react'
import { CalendarDaysIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function EventModal({
    open,
    onClose,
    mode = 'create',
    eventData,
    date,
    onSubmit,
    onDelete
}) {
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')

    useEffect(() => {
        if (mode === 'edit' && eventData) {
            setTitle(eventData.title)
            setTime(eventData.time || '')
        }

        if (!open) {
            setTitle('')
            setTime('')
        }
    }, [open, mode, eventData])

    const handleSubmit = () => {
        onSubmit({
            ...eventData,
            title,
            date,
            time,
        })
        onClose()
    }

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-900/50 data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="w-full max-w-md rounded-xl bg-white shadow-xl
          data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                <CalendarDaysIcon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <DialogTitle className="text-lg font-semibold">
                                    {mode === 'edit' ? 'Edit Jadwal' : 'Tambah Jadwal'}
                                </DialogTitle>
                                <p className="text-sm text-gray-500">{date}</p>
                            </div>
                        </div>

                        {mode === 'edit' && (
                            <button
                                onClick={() => {
                                    onDelete(eventData)
                                    onClose()
                                }}
                                className="text-red-600 hover:text-red-700"
                            >
                                <TrashIcon className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Body */}
                    <div className="space-y-4 px-6 py-5">
                        <input
                            className="w-full rounded-lg border px-3 py-2"
                            placeholder="Judul kegiatan"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />

                        <input
                            type="time"
                            className="w-full rounded-lg border px-3 py-2"
                            value={time}
                            onChange={e => setTime(e.target.value)}
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 border-t bg-gray-50 px-6 py-4">
                        <button
                            onClick={onClose}
                            className="rounded-lg border px-4 py-2"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                        >
                            Simpan
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
