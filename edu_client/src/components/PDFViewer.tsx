"use client";
import DocViewer, { PDFRenderer, PNGRenderer, TXTRenderer, HTMLRenderer} from "react-doc-viewer";

function DocumentViewer() {
  const docs = [
    { uri: "https://goosecreekplayers.com/wp-content/uploads/2024/04/Crucible_Script-1.pdf" }, // Local File
  ];

  return <DocViewer pluginRenderers={[PDFRenderer, PNGRenderer, TXTRenderer, HTMLRenderer]} documents={docs} />;
}

export default DocumentViewer;
