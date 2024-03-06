import { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/mode/javascript/javascript";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/addon/edit/closebrackets";
import "./editor.css";
import ACTIONS from "../../utils/Actions";
const Editor = ({ socketRef, roomId }: { socketRef: any; roomId: string }) => {
  const editorRef = useRef(null as any);
  useEffect(() => {
    async function initEditor() {
      const element = document.getElementById(
        "mainRealtimeEditor"
      ) as HTMLTextAreaElement;
      if (element) {
        editorRef.current = Codemirror.fromTextArea(element, {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        });
      }
      editorRef.current.on("change", (instance: any, changes: any) => {
        const { origin } = changes;
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            code: instance.getValue(),
            roomId: roomId,
          });
        }
      });
      socketRef.current.on('ACTIONS.CODE_CHANGE', ({code}:{code: any}) => {
        console.log("code reecived",code);
        editorRef.current.setValue(code);
      })
      // editorRef.current.setValue(`// Your workspace`);
    }

    initEditor();
  }, []);
  return <textarea id="mainRealtimeEditor"></textarea>;
};

export default Editor;
