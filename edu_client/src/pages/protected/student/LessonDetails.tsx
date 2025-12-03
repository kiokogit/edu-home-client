import StageLessonPage from "@/components/LessonViewPage";
import { useHeaderTitle } from "@/contexts/HeaderTitleContext";


export default function LessonDetails() {
    useHeaderTitle("Lesson View");
    return <StageLessonPage />
}
