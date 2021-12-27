import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "../Axios";
import { toast } from "react-toastify";

const EditPost = () => {
  let { id } = useParams();
  let navigator = useNavigate();
  let [state, setState] = useState({
    title: "",
    author: "",
    loading: false,
  });
  let { title, author, loading } = state;

  useEffect(() => {
    let fetchPosts = async () => {
      let existData = await Axios.get(`/posts/${id}`);
      setState(existData.data);
    };
    fetchPosts();
  }, [id]);
  let handleChange = e => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let handleSubmit = async e => {
    e.preventDefault();
    try {
      setState({ loading: true });
      let payLoad = { title, author };
      await Axios.put(`/posts/${id}`, payLoad);
      navigator("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <section id="postBlock" className="col-mid-4 mx-auto bg-white p-4 mt-4">
      <article>
        <h1 className="h4 font-weight-bold text-success text-uppercase border-bottom">
          Update post
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">title</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter author"
              name="author"
              value={author}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </article>
    </section>
  );
};

export default EditPost;
