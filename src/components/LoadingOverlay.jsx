export default function LoadingOverlay({ show }) {
    if (!show) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-white border-t-transparent" />
                <p className="text-white text-sm font-medium">
                    Memproses data...
                </p>
            </div>
        </div>
    )
}
