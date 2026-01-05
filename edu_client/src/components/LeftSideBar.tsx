import Footer from "@/components/Footer"
import { useAuth } from "@/Providers";
import { Home, User, Settings, Bell, HelpCircle, LogOut } from "lucide-react"
import { supabase } from "@/supabase_client";
import { Link, useNavigate } from "react-router-dom";


export default function LeftSideBar() {
    const pathname = window.location.pathname;
    const { user } = useAuth()
    const navigate = useNavigate();
      
      type LeftSideBarItem =
        | { icon: React.ElementType; label: string; href: string; action?: () => void; className?: string; type?: undefined }
        | { type: "divider"; icon?: undefined; label?: undefined; href?: undefined; action?: undefined; className?: undefined };
    
      const leftSideBarItems: LeftSideBarItem[] = pathname !== '/setup' ?  [
        { icon: Home, label: "Home", href: "/" },
        { icon: User, label: "Profile", href: "/profile" },
        { icon: Settings, label: "Settings", href: "/settings" },
        { icon: Bell, label: "Notifications", href: "/notifications" },
        { icon: HelpCircle, label: "Help & Support", href: "/help" },
        // { type: "divider" },
        { icon: LogOut, label: "Sign out", href: "#", action: async () => await supabase.auth.signOut().then(() => navigate('/')), className: "text-red-600 dark:text-red-400" },
      ] : [{ icon: LogOut, label: "Sign out", href: "#", action: async () => await supabase.auth.signOut().then(() => navigate('/')), className: "text-red-600 dark:text-red-400" }]
    

    return (
        <aside
          className="hidden md:col-span-3 md:flex flex-col mt-[-12px] sticky top-0 h-[calc(100vh-3.5rem)] overflow-y-auto overflow-x-hidden scrollbar-hide"
          >
          <div className="px-4 border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  {user?.user_metadata?.avatar_url ? (
                    <img
                      src={user?.user_metadata?.avatar_url}
                      alt="avatar"
                      className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-gray-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                      {user?.user_metadata?.full_name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {user?.user_metadata?.full_name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
          </div>
          
        <nav className="px-4 flex flex-col gap-2 mt-6">
          {leftSideBarItems.map((item: any, idx: number) =>
            item.type === "divider" ? (
              <hr key={idx} className="my-2 border-gray-200 dark:border-gray-700" />
            ) : (
              <Link
                key={idx}
                to={item.href}
                onClick={item.action}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 ${item.className || ""}`}
              >
                {item.icon ? (
                  (() => {
                    const Icon = item.icon;
                    return <Icon className="w-4 h-4" />;
                  })()
                ) : null}
                {item.label}
              </Link>
            )
          )}
        </nav>
          <section className="mt-6">
          <Footer border={true} />
          </section>
          
      </aside>
        
    )
}

