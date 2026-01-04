import { EventCard } from '@/components/Cards';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { events as featuredItems } from '@/lib/dum_data';

export default function CampusSouqHome() {


  return (
    <div className="min-h-screen my-2 mb-8">
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Featured Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className=" font-bold text-gray-900 dark:text-slate-200">Happening in a few</h2>
            <Link to="/events" className="text-orange-600 text-sm font-medium flex items-center hover:text-orange-700 dark:text-orange-400">
              See All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-1 gap-4">
            {featuredItems.map((item) => (
              <EventCard item={item} loc='home' />
            ))}
          </div>
        </div>
         <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className=" font-bold text-gray-900 dark:text-slate-200">Recent Updates</h2>
            <Link to="/find" className="text-orange-600 text-sm font-medium flex items-center hover:text-orange-700 dark:text-orange-400">
              See All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {featuredItems.map((item) => (
              <EventCard item={item} loc='home' />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}