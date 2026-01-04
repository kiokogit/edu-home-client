import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import {  
  MessageCircle, 
  Users, 
  MapPin, 
  Share2,
  Clock,
  Bookmark,
  User,
  MoreHorizontal,
  PhoneCallIcon,
} from 'lucide-react';
import { BiUpvote } from 'react-icons/bi';
import moment from 'moment';

const MAX_VISIBLE = 2

const getGridClasses = (count: number) => {
  switch (count) {
    case 1:
      return "grid-cols-1"
    case 2:
      return "grid-cols-2"
    case 3:
      return "grid-cols-2 grid-rows-2"
    default:
      return "grid-cols-2 grid-rows-2"
  }
}

export const TiledImages = ({
  images,
  height = "h-40",
}: {
  images: string[]
  height?: string
}) => {
  if (!images || images.length === 0) return null

  const visibleImages = images.slice(0, MAX_VISIBLE)
  const remaining = images.length - MAX_VISIBLE

  return (
    <div className={`relative w-full ${height} overflow-hidden`}>
      <div
        className={`grid ${getGridClasses(visibleImages.length)} w-full h-full gap-0.5`}
      >
        {visibleImages.map((image, index) => (
          <div key={index} className="relative w-full h-full">
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* +X overlay */}
            {index === MAX_VISIBLE - 1 && remaining > 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">
                  +{remaining}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}


      
export const ActionButtons: React.FC<{event: any, isComment: boolean} > = ({event, isComment}) => {
    const [addComment, setAddComment] = useState(false)

  const handleAttend = (e: React.MouseEvent) => {
    e.stopPropagation();
  };


  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
  <div className="flex items-center justify-between border-t border-gray-50 mt-2 dark:border-gray-900">
    <div className="flex items-center space-x-1">
     
       {!isComment && <button
        onClick={handleShare}
        className="flex items-center space-x-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
      >
        <BiUpvote className="w-4 h-4" />
      </button>}

       <button onClick={() => setAddComment(!addComment)} className="flex items-center space-x-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm font-medium">{event.comments_count || 0}</span>
      </button>

    </div>

    {!isComment && 

    <div className="flex items-center space-x-2">
      <button
        onClick={handleAttend}
        className="flex items-center space-x-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
      >
      <>
            <Users className="w-4 h-4" />
            <span className="text-sm">{event.attendees || 0}</span>
          </>
      </button>

      <button
        onClick={handleAttend}
        className="flex items-center space-x-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
      >
      <>
            <Bookmark className="w-4 h-4" />
            <span className="text-sm">{event.attendees || 0}</span>
          </>
      </button>
      <button
        onClick={handleShare}
        className="flex items-center space-x-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </div>
}
  </div>
)}


export const EventCard = ({item, loc='events'}: {item: any, loc: string}) => {

    return (
        <div key={item.id} className="overflow-hidden shadow-sm hover:shadow-md transition ">
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
                  {item.created_by?.first_name} {item.created_by?.last_name}
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
        {item.image && (
            <div className="relative h-40 pl-10 pr-4">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
            </div>
        )}
            <Link to={`/events/${item.id}`} className=" cursor-pointer">
            <div className='p-4 pt-3 pl-10 pr-4'>
                <h3 className="font-semibold text-gray-900 dark:text-slate-200 mb-3 line-clamp-1">{item.title}</h3>
                <p className={`text-xs text-gray-600 dark:text-slate-400 mb-3 line-clamp-2 ${loc==='home' ?'md:line-clamp-1': 'md:line-clamp-4'}`}>{item.description}</p>
                <div className="flex items-start text-sm text-gray-600 dark:text-slate-200 mb-3">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item.location}</span>
                </div>
                <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600 dark:text-slate-200">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.time}
                </div>
                </div>
            </div>
                
            </Link>
                {loc !== 'home' && 
            <ActionButtons event={item} isComment={false} />
            }
            <hr className="my-2 mt-4 border-gray-200 dark:border-gray-700" />
        </div>
    )
}



export const ListingCard = ({item}: {item: any}) => {

     return (
        <div key={item.id} className="overflow-hidden shadow-sm hover:shadow-md transition border border-gray-200 dark:border-gray-700 rounded-lg ">
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
                  {item.created_by?.first_name} {item.created_by?.last_name}
                </span>
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
        {item.images?.length > 0 && (
            <div className="pl-1 pr-1">
                <TiledImages images={item.images} height="h-40" />
            </div>
            )}
            <Link to={`/souq/${item.id}`} className="cursor-pointer">
            <div className='p-4 pt-3 pl-3 pr-4'>
                <h3 className="font-semibold text-gray-900 dark:text-slate-200 mb-3 line-clamp-1">{item.title}</h3>
                <p className={`text-xs text-gray-600 dark:text-slate-400 mb-3 line-clamp-2 `}>{item.description}</p>
                <div className='flex items-center justify-between'>
                    <div className="flex items-start text-sm text-gray-600 dark:text-slate-200 mb-3">
                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-1 text-xs">{item.location}</span>
                    </div>
                    <p className="text-xs text-gray-700 dark:text-slate-200 mb-3 text-right font-bold">KES {item.price}</p>
                </div>
            </div>
                
            </Link>
        </div>
    )
}
