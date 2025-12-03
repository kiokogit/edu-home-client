import CatalogPathDetails from "@/components/StudentCatalogueDetails";
import { useHeaderTitle } from "@/contexts/HeaderTitleContext";
import { useParams } from "react-router-dom";


export default function CatalogueDetails() {
    const { courseId } = useParams();
    useHeaderTitle("Course Details");
    return <CatalogPathDetails />
}
