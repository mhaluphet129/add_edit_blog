const MarkDown = ({ update }) => {
  return (
    <section id="blogs-admin">
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
                >
                  {["Draft", "Published"].map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <textarea
              placeholder="use MD"
              required
              name="markdown"
              id="markdown"
              cols="30"
              rows="10"
              onChange={(e) =>
                update("markdown", e.target.value != "" ? e.target.value : null)
              }
            ></textarea>
          </div>
        </div>
      </form>
    </section>
  );
};

export default MarkDown;
