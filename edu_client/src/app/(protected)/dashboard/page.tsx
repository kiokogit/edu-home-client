'use client';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const StudentDashboard = dynamic(() => import('../student/page'), {
  ssr: false,
});

const TutorDashboard = dynamic(() => import('../tutor/page'), {
  ssr: false,
});

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>('student');


  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

//   const userRole = (session.user as UserWithRole)?.role;

  if (role === 'student') {
    redirect('/student');
  } else {
    return <div>Unauthorized</div>;
  }
}   

