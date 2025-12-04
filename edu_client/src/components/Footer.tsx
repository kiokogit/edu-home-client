import { Hammer, Phone, Mail } from "lucide-react";
import { useState } from "react";
import Modal from "./Modal";


export default function Footer() {
    const [showContactModal, setShowContactModal] = useState(false)

    return (
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white">
              <Hammer size={24} className="text-emerald-500" />
              <span className="text-2xl font-bold">EduCraft</span>
            </div>
            <p className="max-w-sm mb-8">
              Empowering the next generation with practical skills, creativity, and the confidence to build their own future.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition cursor-pointer"><Mail size={18} /></div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition cursor-pointer"><Phone size={18} /></div>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Learn</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-emerald-400 transition">Coding & Tech</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Handiwork</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Arts & Design</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Life Skills</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-emerald-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
              <li><button onClick={() => setShowContactModal(true)} className="hover:text-emerald-400 transition">Contact</button></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center text-sm">
          © {new Date().getFullYear()} EduCraft Systems. All rights reserved.
        </div>
        <Modal show={showContactModal} onClose={() => setShowContactModal(false)} title="Contact Us">
          <div className="space-y-4">
            <input type="text" placeholder="Name" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
            <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
            <textarea rows={4} placeholder="How can we help?" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition" />
            <button className="w-full py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition">Send Message</button>
          </div>
        </Modal>
      </footer>

    )
}


