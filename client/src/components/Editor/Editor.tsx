import { useEffect, useRef } from "react";
import { setContent } from "../../features/user/editorSlice";
import { useDispatch } from "react-redux";
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
const Editor = ({
  socketRef,
  roomId,
  onCodeChange,
  sendEditorRef
}: {
  socketRef: any;
  roomId: string;
  onCodeChange: any;
  sendEditorRef:any;
}) => {
  const editorRef = useRef(null as any);
  const dispatch=useDispatch();
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
      sendEditorRef(editorRef.current)
      editorRef.current.on("change", (instance: any, changes: any) => {
        const { origin } = changes;
        onCodeChange(instance.getValue());
        dispatch(setContent(instance.getValue()))
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            code: instance.getValue(),
            roomId: roomId,
          });
        }
      });
      
      socketRef.current?.on(ACTIONS.CODE_CHANGE, ({ code }: { code: any }) => {
        editorRef.current.setValue(code);
      });  
    }

    initEditor();
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);


  return<textarea defaultValue={"// Your Workspace"} id="mainRealtimeEditor"/>;
};

export default Editor;
