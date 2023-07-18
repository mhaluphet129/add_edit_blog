import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toImageBlob } from "../assets/js/utilities";

const Functions = ({ save, update }) => {
  const [provinces, setProvinces] = useState([]);
  const [files, setFiles] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageRef = useRef();

  const imageOnChange = async (e) => {
    if (e.target.files.length > 0) {
      let imageObj = URL.createObjectURL(e.target.files[0]);
      let imageBlob = await toImageBlob(e.target.files[0]);
      setImagePreview(imageObj);
      update("coverPhotoTextBlob", imageBlob);
    }
  };

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${appUrl}/blog/get-provinces`);
      if (data?.success) setProvinces(data?.provinces);
    })();
  }, []);

  return (
    <div className="form-head">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "rgb(209, 209, 209)",
          width: 150,
        }}
      >
        <label htmlFor="coverImage">Cover Photo</label>
        <i
          style={{
            marginLeft: 5,
            cursor: "pointer",
          }}
          onClick={() => imageRef.current.click()}
          className="fa-sharp fa-solid fa-cloud-arrow-up"
        ></i>
        <input
          type="file"
          name="coverPhoto"
          id="coverImage"
          accept="image/*"
          ref={imageRef}
          style={{
            display: "none",
          }}
          onChange={imageOnChange}
        ></input>
        <i
          style={{
            cursor: "pointer",
            right: 35,
            top: 10,
            color: "#fff",
          }}
          className="fa-sharp fa-solid fa-rotate-right"
          onClick={() => setImagePreview(null)} // this should only reset default image
        ></i>
      </div>

      {imagePreview && (
        <div
          style={{
            width: 320,
            position: "relative",
            display: "block",
          }}
          id="previewCoverContainer"
        >
          <div
            style={{
              width: 25,
              aspectRatio: "1/1",
              background: "#fff",
              position: "absolute",
              right: -10,
              top: -10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "100%",
              cursor: "pointer",
              fontSize: ".75rem",
            }}
            onClick={() => {
              setImagePreview(null);
              update("coverPhotoTextBlob", null);
            }}
            className="remove-img-btn"
          >
            <i style={{ color: "red" }} className="fa-sharp fa-solid fa-x"></i>
          </div>
          <img src={imagePreview} width={320} />
        </div>
      )}

      <label htmlFor="title">Title</label>
      <textarea
        required
        name="title"
        id="title"
        cols="30"
        rows="10"
        onChange={(e) =>
          update("title", e.target.value != "" ? e.target.value : null)
        }
      ></textarea>

      <label htmlFor="description">Description</label>
      <textarea
        required
        name="description"
        id="description"
        cols="30"
        rows="10"
        onChange={(e) =>
          update("description", e.target.value != "" ? e.target.value : null)
        }
      ></textarea>

      <label htmlFor="Categories">Categories</label>
      <select
        name="category"
        className="input"
        id="category"
        required
        onChange={(e) => update("category", e.target.value)}
      >
        {["Tourists Spots", "Blog", "Update", "News"].map((e) => (
          <option value={e} key={e}>
            {e}
          </option>
        ))}
      </select>

      {/* <label htmlFor="date">Date</label>
      <input
        //   value="<%= date %>"
        type="date"
        name="date"
        className="date input"
        id="date"
        onChange={(e) => console.log(new Date(e.target.value))}
      /> */}

      <label htmlFor="Author">Author</label>
      <input
        required
        type="text"
        name="author"
        className="author input"
        id="author"
        onChange={(e) =>
          update("author", e.target.value != "" ? e.target.value : null)
        }
      />

      <label htmlFor="province">Province</label>
      <select
        required
        className="input"
        id="province"
        onChange={(e) =>
          update("provinceId", e.target.value != "" ? e.target.value : null)
        }
      >
        <option value="" key="1">
          Select a province
        </option>
        {provinces.map((e) => (
          <option value={e?._id} key={e?.name}>
            {e?.name}
          </option>
        ))}
      </select>
      <a href="#" className="fnc-btn publish" onClick={save}>
        Save <i className="fa-sharp fa-solid fa-floppy-disk"></i>
      </a>
      <a href="#" className="fnc-btn reset">
        Reset <i className="fa-sharp fa-solid fa-rotate-right"></i>
      </a>
      <a href="#" className="fnc-btn cancel">
        Cancel
      </a>
    </div>
  );
};

export default Functions;
