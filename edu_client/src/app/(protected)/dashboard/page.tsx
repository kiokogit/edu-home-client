'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';


export default function DashboardPage() {
  const [role, setRole] = useState<string | null>('student');


  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (role === 'student') {
    redirect('/student/dashboard');
  } else {
    return <div>Unauthorized</div>;
  }
}   

