import { useEffect } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/addon/edit/closebrackets";
import "./editor.css";
const Editor = () => {
  useEffect(() => {
    async function initEditor() {
      const element = document.getElementById(
        "mainRealtimeEditor"
      ) as HTMLTextAreaElement;
      if (element) {
        Codemirror.fromTextArea(element, {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        });
      }
    }
    initEditor();
  }, []);
  return <textarea id="mainRealtimeEditor"></textarea>;
};

export default Editor;
