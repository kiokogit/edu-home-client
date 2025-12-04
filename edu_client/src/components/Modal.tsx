import { X } from "lucide-react"


export default function Modal({ show, onClose, title, children }: any) {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/40 animate-in fade-in duration-200" onClick={onClose}>
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-8 relative shadow-2xl border border-white/20 dark:border-white/10 scale-100 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-emerald-500 transition">
          <X size={24} />
        </button>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">{title}</h2>
        {children}
      </div>
    </div>
  )
}