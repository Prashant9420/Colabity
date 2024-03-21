import toast from "react-hot-toast";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  useGetCodeFilesQuery,
  useSaveCodeFileMutation,
  useDeleteCodeFileMutation,
} from "../services/api";
        
const NavBar = ({ editorRef }: any) => {
  const editor = useSelector((state: any) => state.editor);
  const [saveCodeFile] = useSaveCodeFileMutation();
  const [deleteCodeFile] = useDeleteCodeFileMutation();
  const { data, isSuccess } = useGetCodeFilesQuery("");
  const [filename, setFilename] = useState("");
  const [filenameInput, setFilenameInput] = useState(false);
  const [currentFileIndex, setCurrentFileIndex] = useState(null as any);
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [delLoadingIndex, setDelLoadingIndex] = useState(null as any);
  const filenameRef = useRef(null as any);
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(editor.content);
      toast.success("Copied !!");
    } catch (err) {
      toast("something went worng");
    }
  };
  const handleSave = () => {
    setFilenameInput(true);
    if (filenameRef.current) filenameRef.current.focus();
  };
  const handleOpenFile = () => {
    if (currentFileIndex == null) return;
    editorRef.current.setValue("");
    editorRef.current.replaceRange(
      data.data[currentFileIndex].content,
      { line: 0, ch: 0 },
      { line: editorRef.current.lastLine(), ch: 0 }
    );
    setCurrentFileIndex(null);
  };
  const handleSaveCode = async () => {
    await saveCodeFile({ filename: filename, content: editor.content });
  };

  const handleDeleteFile = async (index: any) => {
    setDelLoadingIndex(() => index);
    setIsDelLoading(() => true);
    await deleteCodeFile({ docId: data.data[index]._id });
    setDelLoadingIndex(() => null);
    setIsDelLoading(() => false);
  };
    
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filenameInput &&
        filenameRef.current &&
        !filenameRef.current.contains(event.target as Node)
      ) {
        setFilename("");
        setFilenameInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filenameInput]);
  return (
    <div className="flex justify-end bg-base-100">
      {filenameInput ? (
        <input
          type="text"
          ref={filenameRef}
          value={filename}
          placeholder="File name"
          className="input input-sm m-3 input-bordered w-full max-w-xs"
          onChange={(e) => setFilename(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              toast.promise(handleSaveCode(), {
                loading: "Saving...",
                success: <b>file saved!</b>,
                error: <b>Could not save.</b>,
              });
              setFilenameInput(false);
            }
          }}
        />
      ) : null}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {data?.data?.length > 0
              ? "Select a File to Open"
              : "You dont have any saved files."}
          </h3>
          {isSuccess &&
            data?.data?.map((file: any, index: any) => (
              <div className="flex justify-between items-center" key={index}>
                <svg xmlns="http://www.w3.org/2000/svg" height="20" className="mt-1 mr-2" width="20" viewBox="0 0 384 512"><path fill="#c5c6c7" d="M320 464c8.8 0 16-7.2 16-16V160H256c-17.7 0-32-14.3-32-32V48H64c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320zM0 64C0 28.7 28.7 0 64 0H229.5c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64z"/></svg>
                <p
                  className={`pl-4 pt-2 pb-2 mt-2 mr-2 rounded-lg w-full ${
                    currentFileIndex === index
                      ? "bg-accent text-base-100"
                      : "hover:bg-neutral"
                  } `}
                  onClick={() => {
                    setCurrentFileIndex(index);
                  }}
                >
                  {file.filename}
                </p>
                {isDelLoading && delLoadingIndex === index ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleDeleteFile(index)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                )}
              </div>
            ))}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn m-2">Close</button>
              <button className="btn m-2" onClick={handleOpenFile}>
                Open File
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <button
        className="btn btn-sm m-3 hover:shadow-secondary"
        onClick={handleSave}
      >
        <svg
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#000000"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
            stroke="#CCCCCC"
            strokeWidth="0.048"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              d="M12 21V11M12 11L9 14M12 11L15 14M7 16.8184C4.69636 16.2074 3 14.1246 3 11.6493C3 9.20008 4.8 6.9375 7.5 6.5C8.34694 4.48637 10.3514 3 12.6893 3C15.684 3 18.1317 5.32251 18.3 8.25C19.8893 8.94488 21 10.6503 21 12.4969C21 14.8148 19.25 16.7236 17 16.9725"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>{" "}
          </g>
        </svg>
        Save Code
      </button>

      <button
        className="btn btn-sm m-3 hover:shadow-secondary"
        onClick={() =>
          (
            document.getElementById("my_modal_5") as HTMLDialogElement
          )?.showModal()
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 576 512"
        >
          <path
            fill="white"
            d="M384 480h48c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224H144c-11.4 0-21.9 6-27.6 15.9L48 357.1V96c0-8.8 7.2-16 16-16H181.5c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8H416c8.8 0 16 7.2 16 16v32h48V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H87.7 384z"
          />
        </svg>
        Open Code
      </button>

      <button
        className="btn btn-sm m-3 hover:shadow-secondary"
        onClick={handleCopyCode}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16"
          width="16"
          viewBox="0 0 576 512"
        >
          <path
            fill="white"
            d="M384 336H192c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16l140.1 0L400 115.9V320c0 8.8-7.2 16-16 16zM192 384H384c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1H192c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H256c35.3 0 64-28.7 64-64V416H272v32c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192c0-8.8 7.2-16 16-16H96V128H64z"
          />
        </svg>
        Copy
      </button>
    </div>
  );
};

export default NavBar;
