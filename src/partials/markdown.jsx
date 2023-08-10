import { createRef, useRef, useState, useEffect } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { selectWord } from "@uiw/react-md-editor/lib/utils/markdownUtils";
import rehypeSanitize from "rehype-sanitize";
import { toast } from "react-toastify";
import axios from "axios";

const MarkDown = ({ update, innerRef, status = "draft" }) => {
  const [markdown, setMarkDown] = useState("");
  const imgFile = useRef(null);

  const inputFileRef = createRef();

  const helpCommand = {
    name: "help",
    keyCommand: "help",
    groupName: "help",
    buttonProps: { "aria-label": "Help", title: "Help" },
    icon: (
      <svg viewBox="0 0 16 16" width="12px" height="12px">
        <path
          d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm.9 13H7v-1.8h1.9V13Zm-.1-3.6v.5H7.1v-.6c.2-2.1 2-1.9 1.9-3.2.1-.7-.3-1.1-1-1.1-.8 0-1.2.7-1.2 1.6H5c0-1.7 1.2-3 2.9-3 2.3 0 3 1.4 3 2.3.1 2.3-1.9 2-2.1 3.5Z"
          fill="currentColor"
        />
      </svg>
    ),
    execute: (state, api) => {
      window.open("https://www.markdownguide.org/basic-syntax/", "_blank");
    },
  };

  const imageCommand = {
    name: "image",
    keyCommand: "image",
    render: (command, disabled, executeCommand) => {
      return (
        <button
          aria-label="Add image"
          title="Add image"
          disabled={disabled}
          onClick={(evn) => {
            // evn.stopPropagation();
            inputFileRef.current?.click();
          }}
          type="button"
        >
          <svg width="13" height="13" viewBox="0 0 20 20">
            <path
              fill="currentColor"
              d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
            />
          </svg>

          <input
            type="file"
            accept="image/*"
            id="imgCmd"
            ref={inputFileRef}
            style={{ display: "none" }}
            onChange={(e) => {
              imgFile.current = e.target.files[0];
              executeCommand(command, command.groupName);
            }}
          />
        </button>
      );
    },
    execute: async (state, api) => {
      try {
        const formData = new FormData();
        formData.append("photos", imgFile.current);
        formData.append("fileName", "blog-image");

        const {
          data: { data },
        } = await toast.promise(
          axios.post("https://api.visitour.ph/article-photo-upload", formData),
          {
            pending: "Image processing...",
            success: "Success! 👌",
            error: "Error while sending image 🤯",
          }, 
        );

        if (!data[0]?.original) throw new Error("Server error");
        const imgUrl = data[0].original;

        // const imgUrl = null;

        let newSelectionRange = selectWord({
          text: state.text,
          selection: state.selection,
        });
        let state1 = api.setSelectionRange(newSelectionRange);
        let vtLogo =
          "https://visitour.s3.ap-southeast-1.amazonaws.com/ArticlePhotos/vt-logo/vt-logo_1690948387666/vt-logo_1690948387666_large.jpeg";

        // Replaces the current selection with the image
        let imageTemplate = imgUrl || state1.selectedText || vtLogo;
        let val = state.command.value || "";
        api.replaceSelection(val.replace(/({{text}})/gi, imageTemplate));
        let start = state1.selection.start + val.indexOf("{{text}}");
        let end =
          state1.selection.start +
          val.indexOf("{{text}}") +
          (state1.selection.end - state1.selection.start);
        if (!state1.selectedText) {
          end = end + imageTemplate.length;
        }
        console.log('range', { start,
          end,});
        api.setSelectionRange({
          start,
          end,
        });
      } catch (err) {
        toast.error("Error while sending image 🤯");
      }
    },
    value: "![description]({{text}})",
    // shortcuts: "ctrlcmd+k",
  };

  useEffect(() => {
    if (innerRef?.current) {
      setMarkDown(innerRef?.current);
    }
  }, [innerRef?.current]);

  const modifiedCommands = [...commands.getCommands(), helpCommand].map((cmd) =>
    cmd.name === "image" ? imageCommand : cmd
  );

  return (
    <>
      <section id="blogs-admin" style={{ width: "100%" }}>
        <form
          action="new-blog-submit"
          encType="multipart/form-data"
          method="POST"
        >
          <div className="form-group">
            <div className="form-markdown">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <label htmlFor="markdown">Markdown Content</label>
                <div className="markdown-img">
                  <label htmlFor="publishmentStatus">Status: </label>
                  <select
                    required
                    name="publishmentStatus"
                    className="input"
                    id="publishmentStatus"
                    onChange={(e) =>
                      update(
                        "publishmentStatus",
                        e.target.value.toLocaleLowerCase()
                      )
                    }
                    defaultValue={status}
                  >
                    {["Draft", "Published"].map((e) => (
                      <option value={e.toLowerCase()} key={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <textarea
              placeholder="use MD"
              required
              name="markdown"
              id="markdown"
              cols="30"
              rows="10"
              ref={innerRef}
              onChange={(e) =>
                update("markdown", e.target.value != "" ? e.target.value : null)
              }
            ></textarea> */}

              <MDEditor
                value={markdown}
                onChange={(v) => {
                  setMarkDown(v);
                  update("markdown", v);
                }}
                commands={modifiedCommands}
                previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
                height={500}
              />
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default MarkDown;
