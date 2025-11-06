'use client';
import React from "react";
import WelcomeDashboardContent from "@/components/StudentDash";
import StudentDashboardHome from "@/components/StudentSubscDash";

const page = () => {
    const [isEnrolled, setIsEnrolled] = React.useState(true);

  return <div className="p-4 md:p-8">
{!isEnrolled ? <WelcomeDashboardContent /> : <StudentDashboardHome />}
  </div>
};

export default page;

