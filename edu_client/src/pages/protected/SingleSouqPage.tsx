import { ActionButtons } from '@/components/Cards';
import { listings } from '@/lib/dum_data';
import { LucideArrowLeftCircle, PhoneCallIcon } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {  
  MapPin, 
  Clock,
  User,
  MoreHorizontal,
} from 'lucide-react';
import moment from 'moment';
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { use, useEffect, useRef, useState } from "react"
import { useEventsStore } from '@/stores/postsStore';

const ImageGridWithViewer = ({ images }: { images: string[] }) => {
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


function SingleSouqPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [showContact, setShowContact] = useState(false);
    const { selectedEvent, fetchEventDetails } = useEventsStore();

    useEffect(() => {
        fetchEventDetails(id as string);
    }, [])

    const item = selectedEvent;


    if (!item || item.post_type !== 'ad') {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Loading listing details...</p>
        </div>
    }


    return (
        <div className="min-h-screen my-4 mb-8 mx-4">
             <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-xs mb-4 ml-2'>
                <LucideArrowLeftCircle size={24} className='text-slate-400' /> Back
            </button>
           
            <div key={item.id} className=" overflow-hidden shadow-sm hover:shadow-md transition ">
             <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-400 flex items-center justify-center">
              {item.created_by?.avatar ? (
                <img 
                  src={item.created_by?.avatar} 
                  alt={item.created_by?.first_name} 
                  className="w-full h-full object-cover w-5 h-5"
                />
              ) : (
                <User className="w-5 h-5 text-gray-300" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                  {item.created_by?.first_name}
                </span>
                {/* {event.verified && (
                  <Star className="w-3 h-3 text-blue-500 fill-blue-500" />
                )} */}
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span> {moment(item?.created_at).fromNow()}</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <ImageGridWithViewer images={item.images || []} />

            <div className='p-2 pt-3'>
                <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-slate-200 mb-3 line-clamp-1">{item.title}</h3>
                {/* price */}
                <p className="text-sm text-gray-700 dark:text-slate-100 mb-3 font-bold">KES {String(item.price) || 0}</p>
                </div>

                <p className={`text-sm text-gray-700 dark:text-slate-100 mb-3`}>{item.description}</p>
                <div className="flex items-center justify-between text-center align-center">
                    <div className="flex items-start text-sm text-cyan-600 dark:text-cyan-200 mb-3 font-semibold hover:underline cursor-pointer">
                
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5 text-green-500" />
                <span className="line-clamp-1">{item.location}</span>
                </div>
                <button onClick={() => setShowContact(!showContact)} className="flex text-xs gap-2 items-center space-x-1 px-2 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700">
                        <PhoneCallIcon className="w-3 h-3" /> {showContact? String(item.contact) : 'Show Contact'}
                    </button>

                </div>
            </div>
        </div>
        <ActionButtons event={item} isComment={false} />

        {/* Reviews Section */}
        {item?.comments && item?.comments?.length > 0 && (
            <div className="mt-4 pl-4">
            <h4 className="text-xs text-gray-400 font-semibold underline">Reviews</h4>
            <ul className="space-y-2 ml-4 border-l-2 border-gray-400 dark:border-gray-700">
                {item?.comments.map((review) => (
                 <div key={review.id} className=" overflow-hidden shadow-sm hover:shadow-md transition ">
             <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-400 flex items-center justify-center">
              {review.created_by?.avatar ? (
                <img 
                  src={review.created_by?.avatar} 
                  alt={review.created_by?.first_name} 
                  className="w-full h-full object-cover w-5 h-5"
                />
              ) : (
                <User className="w-5 h-5 text-gray-300" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                  {review.created_by?.first_name} {review.created_by?.last_name}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span> {moment(review.created_at).fromNow()} </span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <ImageGridWithViewer images={review.images || []} />
            <div className='p-2'>
                <p className={`text-sm text-gray-700 dark:text-slate-100 mb-3`}>{review?.description}</p>
            </div>
            <ActionButtons event={item} isComment={true} />
        </div>
                ))}
            </ul>  
            </div>
        )}
        </div>
    )
}


export default SingleSouqPage
