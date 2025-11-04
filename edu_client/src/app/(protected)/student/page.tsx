'use client';
import React from "react";
import WelcomeDashboardContent from "@/components/StudentDash";
import StudentDashboardHome from "@/components/StudentSubscDash";

const page = () => {
    const [isEnrolled, setIsEnrolled] = React.useState(false);

  return <div>
{!isEnrolled ? <WelcomeDashboardContent /> : <StudentDashboardHome />}
  </div>
};

export default page;

