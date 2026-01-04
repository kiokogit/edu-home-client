
import Navbar from "@/components/Navbar"
import LeftSideBar from "@/components/LeftSideBar"
import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/protected/Dashboard"
import CampusEvents from "./pages/protected/EventsPage"
import SingleEvent from "./pages/protected/SingleEventPage"
import SouqPage from "./pages/protected/SouqPage"
import SingleSouqPage from "./pages/protected/SingleSouqPage"

export default function ProtectedLayout() {

return (
  <div className="min-h-screen flex flex-col ">
    {/* Top navbar */}
    <Navbar />

    {/* Page grid */}
    <div className="flex-1 w-full max-w-7xl mx-auto px-0 py-8 grid grid-cols-1 md:grid-cols-12 gap-2">

      {/* Left Sidebar */}
      <LeftSideBar />

      <main className="md:col-span-6 max-w-xl w-full mx-auto pt-2 md:pt-3 border-l border-r border-gray-400 dark:border-gray-700">

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/events' element={<CampusEvents />} />
          <Route path='/events/:id' element={<SingleEvent />} />
          <Route path='/souq' element={<SouqPage />} />
          <Route path='/souq/:id' element={<SingleSouqPage />} />
        </Routes>

      </main>

      {/* Right Sidebar */}
      <aside className="hidden md:col-span-3 md:flex flex-col mt-[-12px] sticky top-0 h-[calc(100vh-3.5rem)] overflow-y-auto overflow-x-hidden scrollbar-hide"
      >
        <div className="flex-1 space-y-6">
          <section>
            <h2 className="text-sm font-semibold mb-2">Promoted Ads</h2>
            <div className="text-xs text-gray-500">Ads go here...</div>
          </section>
          <section>
            <h2 className="text-sm font-semibold mb-2">Suggested Events</h2>
            <div className="text-xs text-gray-500">Events go here...</div>
          </section>
        </div>

      </aside>
    </div>
  </div>
)
}
