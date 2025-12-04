
import { useHeaderTitle } from "@/contexts/HeaderTitleContext";

const Dashboard = () => {
    // TODO: This should probably come from a store or API
    const isEnrolled = false;
    useHeaderTitle("Dashboard");

    return <div className="p-4 md:p-8">
        Welcome
    </div>
};

export default Dashboard;
