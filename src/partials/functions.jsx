import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";

import { toImageBlob } from "../assets/js/utilities";

const Functions = ({ save, update, blog, id }) => {
  const [provinces, setProvinces] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const imageRef = useRef();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const authorRef = useRef();

  const imageOnChange = async (e) => {
    if (e.target.files.length > 0) {
      let imageObj = URL.createObjectURL(e.target.files[0]);
      let imageBlob = await toImageBlob(e.target.files[0]);

      update("coverPhotoText", null);
      update("coverPhotoTextBlob", imageBlob);

      setImagePreview(imageObj);
    }
  };

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${appUrl}/blog/get-provinces`);
      if (data?.success) setProvinces(data?.provinces);
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(blog).length > 0) {
      titleRef.current.value = blog?.title ?? "";
      descriptionRef.current.value = blog?.description ?? "";
      authorRef.current.value = blog?.author ?? "";

      if (blog?.coverPhotoTextBlob == null)
        setImagePreview(
          Object.keys(blog?.coverPhotoText ?? {}).length > 0
            ? blog?.coverPhotoText.medium
            : blog?.coverPhotoText ?? null
        );
    }
  }, [blog]);

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
          onClick={() => setImagePreview(null)}
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
              update("coverPhotoText", null);
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
        ref={titleRef}
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
        ref={descriptionRef}
        onChange={(e) =>
          update("description", e.target.value != "" ? e.target.value : null)
        }
      ></textarea>
      <label htmlFor="Categories">Categories</label>
      <select
        name="category"
        className="input"
        id="category"
        value={blog?.category ?? "Tourists Spots"}
        required
        onChange={(e) => update("category", e.target.value)}
      >
        {["Tourists Spots", "Blog", "Update", "News"].map((e) => (
          <option value={e} key={e}>
            {e}
          </option>
        ))}
      </select>
      {Object.keys(blog).length > 0 && (
        <>
          <label htmlFor="date">Date</label>
          <input
            defaultValue={moment(blog.date).format("YYYY-MM-DD")}
            type="date"
            name="date"
            className="date input"
            id="date"
            onChange={(e) => update("date", moment(new Date(e.target.value)))}
          />
        </>
      )}

      <label htmlFor="Author">Author</label>
      <input
        required
        type="text"
        name="author"
        className="author input"
        id="author"
        ref={authorRef}
        onChange={(e) =>
          update("author", e.target.value != "" ? e.target.value : null)
        }
      />

      <label htmlFor="province">Province</label>
      <select
        required
        className="input"
        id="province"
        value={
          typeof blog?.provinceId == "string"
            ? blog?.provinceId
            : blog?.provinceId?._id ?? ""
        }
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
      <a
        href={id != null ? `/admin/edit/${id}` : "/admin/new-blog"}
        className="fnc-btn reset"
      >
        Reset <i className="fa-sharp fa-solid fa-rotate-right"></i>
      </a>
      <a
        href="#"
        className="fnc-btn cancel"
        onClick={() => window.location.replace("/admin")}
      >
        Cancel
      </a>
    </div>
  );
};

export default Functions;
