import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabase_client'
import { Session, User } from '@supabase/supabase-js'
import { loaderStore } from './stores/genericStores';

const AuthContext = createContext<{ user: User | null; session: Session | null; }>({
  user: null,
  session: null
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  loaderStore.show("Checking authentication...")


  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      loaderStore.hide()
    })

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      loaderStore.hide()
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, session }}>
      {children}
    </AuthContext.Provider>
  )
}


export const useAuth = () => useContext(AuthContext)