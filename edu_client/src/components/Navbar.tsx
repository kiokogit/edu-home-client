import { useState } from "react"
import Logo from "./logo"
import { 
  User, 
  Settings, 
  LogOut,
  Bell,
  HelpCircle,
  Home,
  Settings2Icon,
  Calendar,
  ShoppingBag,
  MapPin,
  GlobeLock,
} from 'lucide-react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserInfo } from "@/hooks/useUserInfo";
import { supabase } from "@/supabase_client";


export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const pathname = window.location.pathname;
  const session = {
    user: useUserInfo().user
  }
  const navigate = useNavigate();


  const dropdownItems = pathname === '/setup' ? [
    { icon: LogOut, type: 'button', label: 'Sign out', href: "#", action: async () => await supabase.auth.signOut().then(() => navigate('/')), className: 'hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400' }
] : [
    { icon: User, type: 'link',  label: 'Profile', href: '/profile', className: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
    { icon: Settings, type: 'link', label: 'Settings', href: '/settings', className: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
    { icon: HelpCircle, type: 'link', label: 'Help & Support', href: '/help', className: 'hover:bg-gray-50 dark:hover:bg-gray-700' },
    { type: 'divider' },
    { icon: LogOut, type: 'button', label: 'Sign out', href:'#', action: async () => await supabase.auth.signOut().then(() => navigate('/')), className: 'hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400' }
  ]

  const generalNavLinks = pathname !== '/setup' ? [
    { icon: Home, label: 'Home', href: '/'},
    {icon: Calendar, label: 'Events', href:'/events'},
    // {icon: Search, label: 'Discover', href: '/find'},
    {icon: ShoppingBag, label: 'Souq', href:'/souq'}, // this is for all sales by students, and merchs everywhere
    // {icon: BookDashed, label: 'Vault', href:'/academic'}, // this is for academic resources and sales and articles
    {icon: MapPin, label: 'MyCampus', href:'/mycampus'},  // this has campus focused announcements, and location maps

  ] : [{ icon: Settings2Icon, label: 'Setup Profile', href: '/setup'}]

  const LinksLoop = ({hide_in_mobile}: {hide_in_mobile: boolean}) => {
    return <div className={`${hide_in_mobile ? 'hidden md:flex' : 'flex-1'} flex-1 items-center justify-between gap-3 md:gap-8 flex text-xs md:text-sm font-semibold`}>
            {generalNavLinks.map((item, index) => {
              return <NavLink
                    key={index}
                    to={String(item.href)}
                    className={({ isActive }: { isActive: boolean }) => isActive ? 'text-orange-400' : 'text-gray-700 dark:text-gray-300'}>
                        <div className={`flex flex-col items-center gap-1`}>
                        {item.icon && <item.icon size={20} />}
                            <span className="text-xs">{item.label}</span>
                        </div>
                  </NavLink>
              })}
        </div>
  }

  return (
    <header className="fixed z-30 w-full ">
      <div className="mx-auto max-w-xl">
          <div className="flex flex-col pt-2 bg-white/90 dark:bg-gray-900/90 px-4 shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] dark:before:[background:linear-gradient(var(--color-gray-800),var(--color-gray-700))_border-box]">
          <div className=" flex h-fit pb-2 items-center justify-between">
            
          <div className=" text-gray-700 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-400" >
            <NavLink to={'/'} className="flex items-center ml-[-10px] gap-2 cursor-pointer hover:bg-transparent rounded-lg transition-colors scale-100 ">
              <Logo />
              <div className="font-semibold">UniQuad {(session as any)?.backendUser?.campus?.initials}</div>
            </NavLink>
          </div>
          <div>
            <LinksLoop hide_in_mobile={true} />
          </div>
           <ul className="items-center flex md:hidden">
            <div className="flex items-center gap-4">
                <div className="">
                <GlobeLock 
                  size={20} 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 cursor-pointer transition-colors" 
                />
               
              </div>
              <div className="relative">
                <Bell 
                  size={20} 
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 cursor-pointer transition-colors" 
                />
              </div>

              <div className="relative"  onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    {session.user?.avatar ? (
                      <img
                        src={session?.user.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border-2 border-orange-200 dark:border-green-900"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                        {session.user?.fullName.charAt(0).toUpperCase()}
                      </div>
                    )}
                   
                  </div>

            {isDropdownOpen && session && (
              <div className="absolute top-full right-[-16px] w-48 bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  <div className="absolute top-[-4px] right-10 w-2 h-2 bg-white dark:bg-gray-900 border-l border-t border-gray-200 dark:border-gray-700 rotate-45"></div>
                {/* Menu Items */}
                <div className="py-1">
                  {dropdownItems.map((item, index) => {
                    if (item.type === 'divider') {
                      return <div key={index} className="border-t border-gray-100 dark:border-gray-700 my-1" />
                    }
                    return (
                        <Link
                          key={index}
                          to={item.href || '#'}
                          onClick={() => {
                            if (item.action) item.action()
                            setIsDropdownOpen(false)
                            }}
                          className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors text-gray-700 dark:text-gray-300 ${item.className}`}
                        >
                          {item.icon && <item.icon size={16} />}
                          <span>{item.label}</span>
                        </Link>
                      )
                    
                  })}
                </div>
              </div>
            )}
            </div>
          </ul>
          </div>
        
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 bg-white/90 dark:bg-gray-900/90 px-4 shadow-black/[0.03] backdrop-blur-xs before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(var(--color-gray-100),var(--color-gray-200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] dark:before:[background:linear-gradient(var(--color-gray-800),var(--color-gray-700))_border-box]">

        <LinksLoop hide_in_mobile={false}/>
      </div>
        </div>
      </div>
    </header>
  )
}
