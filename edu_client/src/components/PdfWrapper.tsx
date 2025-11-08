import dynamic from "next/dynamic";

const PDFViewerClient = dynamic(() => import("./PDFViewer"), {
  ssr: false,
  loading: () => (
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
  ),
});

const PDFWrapper = () => {
  return <PDFViewerClient />;
};

export default PDFWrapper;
