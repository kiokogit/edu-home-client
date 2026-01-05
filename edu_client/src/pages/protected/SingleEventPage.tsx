import { ActionButtons } from '@/components/Cards';
import { BellPlus, LucideArrowLeftCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import {  
  MapPin, 
  Clock,
  User,
  MoreHorizontal,
} from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useEventsStore } from '@/stores/postsStore';
import { loaderStore } from '@/stores/genericStores';
import { ImageGridWithViewer } from '@/components/ImageViewerGrid';


function SingleEventPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const {selectedEvent, fetchEventDetails} = useEventsStore();

    const [viewMorePost, setViewMorePost] = useState(false);
    const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchEventDetails(id as string);
    }, [])

    const toggleCommentExpansion = (commentId: string) => {
        setExpandedComments(prev => {
            const newSet = new Set(prev);
            if (newSet.has(commentId)) {
                newSet.delete(commentId);
            } else {
                newSet.add(commentId);
            }
            return newSet;
        });
    };

    if (!selectedEvent) {
        loaderStore.show();
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Loading event details...</p>
        </div>
    }

    loaderStore.hide();

    return (
        <div className="min-h-screen my-4 mb-8 mx-4">
             <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-xs mb-4 ml-2'>
                <LucideArrowLeftCircle size={24} className='text-slate-400' /> Back
            </button>
           
            <div key={selectedEvent.id} className=" overflow-hidden transition">
             <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-400 flex items-center justify-center">
              {selectedEvent.created_by?.avatar ? (
                <img 
                  src={selectedEvent.created_by?.avatar} 
                  alt={selectedEvent.created_by?.first_name} 
                  className="w-full h-full object-cover w-5 h-5"
                />
              ) : (
                <User className="w-5 h-5 text-gray-300" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                  {selectedEvent.created_by?.first_name} {selectedEvent.created_by?.last_name}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span> {moment(selectedEvent?.created_at).fromNow()}</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <ImageGridWithViewer images={selectedEvent.images || []} />

            <div className='p-2 pt-3'>
                <h3 className="font-semibold text-gray-900 dark:text-slate-200 mb-3 line-clamp-1">{selectedEvent.title}</h3>
                <p 
                    onClick={() => setViewMorePost(!viewMorePost)} 
                    className={`text-sm text-gray-700 dark:text-slate-100 mb-3 whitespace-pre-wrap cursor-pointer ${viewMorePost ? '' : 'line-clamp-5'}`}
                >
                    {selectedEvent.description}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex items-start text-sm text-cyan-800 dark:text-cyan-400 mb-3 font-semibold hover:underline cursor-pointer">
                
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5 text-blue-500" />
                <span className="line-clamp-1">{selectedEvent.location}</span>
                </div>

                </div>
                
                <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-orange-600 dark:text-orange-100 font-semibold">
                    <Clock className="w-4 h-4 mr-1 text-orange-500" />
                    {selectedEvent.time}
                </div>
                <button className="text-xs text-gray-600 dark:text-slate-400 font-semibold border border-gray-400 dark:border-gray-700 px-2 py-1 rounded-md flex gap-1 items-center">
                    <BellPlus className="w-4 h-4 mr-1" /> Remind me
                </button>
                </div>
            </div>
        </div>
        <ActionButtons event={selectedEvent} isComment={false} />

        {/* Comments Section */}
        {selectedEvent?.comments && selectedEvent?.comments?.length > 0 && (
            <div className="mt-4 pl-4">
            <h4 className="text-xs text-gray-400 font-semibold underline">Comments</h4>
            <ul className="space-y-2 ml-4  border-gray-400 dark:border-gray-700">
                {selectedEvent?.comments.map((comment) => (
                 <div key={comment.id} className=" overflow-hidden  transition ">
             <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-400 flex items-center justify-center">
              {comment.created_by?.avatar ? (
                <img 
                  src={comment.created_by?.avatar} 
                  alt={comment.created_by?.first_name} 
                  className="w-full h-full object-cover w-5 h-5"
                />
              ) : (
                <User className="w-5 h-5 text-gray-300" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                  {comment.created_by?.first_name} {comment.created_by?.last_name}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span> {moment(comment.created_at).fromNow()} </span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className='max-h-60 overflow-hidden '>
        <ImageGridWithViewer images={comment.images || []} />

        </div>
            <div className='p-2'>
                <p 
                    onClick={() => toggleCommentExpansion(comment.id)} 
                    className={`text-sm text-gray-700 dark:text-slate-100 mb-3 cursor-pointer ${expandedComments.has(comment.id) ? '' : 'line-clamp-5'}`}
                >
                    {comment?.description}
                </p>
            </div>
            <ActionButtons event={comment} isComment={true} />

        </div>
                ))}
            </ul>  

            </div>
        )}
        
        </div>
    )
}


export default SingleEventPage