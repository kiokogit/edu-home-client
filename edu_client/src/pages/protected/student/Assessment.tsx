import ProctoredQuizPage from "@/components/QuizTakingPage";
import { useHeaderTitle } from "@/contexts/HeaderTitleContext";


export default function Assessment() {
    useHeaderTitle("Assessment");
    return <ProctoredQuizPage />
}
