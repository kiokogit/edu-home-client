import EditorRouter from "@/components/SandBoxEditorRouter";

export default function TakeQuestionPage() {
  const problem = {
    title: "Reverse an Array",
    description: "Write a function that reverses an array.",
    language: "js", // or "scratch"
  };

  return (
      <EditorRouter language={problem.language} />
  );
}
