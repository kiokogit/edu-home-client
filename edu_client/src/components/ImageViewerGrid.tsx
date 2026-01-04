
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"



export const ImageGridWithViewer = ({ images }: { images: string[] }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  if (!images || images.length === 0) return null

  const open = (i: number) => setActiveIndex(i)
  const close = () => setActiveIndex(null)

  const next = () =>
    setActiveIndex((i) => (i === null ? i : (i + 1) % images.length))

  const prev = () =>
    setActiveIndex((i) =>
      i === null ? i : (i - 1 + images.length) % images.length
    )

  /* keyboard */
  useEffect(() => {
    if (activeIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [activeIndex])

  /* swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <>
      {/* Equal grid – auto stretch */}
      <div className="px-2 pb-3">
        <div
          className="
            grid gap-1
            [grid-template-columns:repeat(auto-fit,minmax(0,1fr))]
          "
        >
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => open(index)}
              className="relative aspect-square overflow-hidden"
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover hover:scale-105 transition"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Viewer */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={close}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white"
          >
            <X size={28} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-3 md:left-6 text-white p-2"
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={images[activeIndex]}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[90vw] object-contain select-none"
            draggable={false}
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-3 md:right-6 text-white p-2"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </>
  )
}
