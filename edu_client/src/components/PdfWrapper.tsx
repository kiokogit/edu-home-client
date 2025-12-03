import { lazy, Suspense } from "react";

const PDFViewerClient = lazy(() => import("./PDFViewer"));

const PDFWrapper = () => {
  return (
    <Suspense fallback={
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          fontSize: "1.2rem",
          color: "#333",
        }}
      >
        Loading PDF Viewer...
      </div>
    }>
      <PDFViewerClient />
    </Suspense>
  );
};

export default PDFWrapper;
