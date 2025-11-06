"use client";

import { useEffect } from "react";
import * as Blockly from 'blockly/core'
import * as libraryBlocks from 'blockly/blocks';
import {javascriptGenerator} from 'blockly/javascript';
import { Sandpack } from "@codesandbox/sandpack-react";

export default function EditorRouter({ language }) {
  // If block-based: initialize Blockly
  useEffect(() => {
    if (language === "scratch" || language === "blockly") {
        const toolbox = {
  kind: 'flyoutToolbox',
  contents: [
    {
      kind: 'block',
      type: 'controls_whileUntil'
    }
  ]
};
      Blockly.inject('blockly-container', {toolbox: toolbox});
    }
  }, [language]);

  // Editor selection
  if (language === "scratch" || language === "blockly") {
    return (
      <div className="w-full h-full">
        <div id="blockly-container" className="w-full h-full bg-white" />
      </div>
    );
  }

  // Default: JavaScript Sandpack Editor
  return (
    <div className="w-full h-full">
      <Sandpack
        template="react"
        theme="dark"
        options={{
          showLineNumbers: true,
          wrapContent: true,
          editorHeight: "100%",
        }}
      />
    </div>
  );
}
