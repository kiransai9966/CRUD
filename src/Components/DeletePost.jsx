import React from "react";
import { useEffect, useState } from "react";
import Axios from "../Axios";
import { useNavigate, useParams } from "react-router-dom";

const DeletePost = () => {
  let { id } = useParams();
  let navigator = useNavigate();
  let [state, setState] = useState({
    title: "",
    author: "",
    loading: false,
  });
  let { title, author, loading } = state;
  useEffect(() => {
    let fetchData = async () => {
      let deleteData = await Axios.get(`/posts/${id}`);
      setState(deleteData.data);
    };
    fetchData();
  }, [id]);
  let handleDelete = async () => {
    await Axios.delete(`/posts/${id}`);
    navigator("/");
  };
  return (
    <section>
      <div>
        <span>Title</span>
        <span style={{ marginLeft: "20px" }}>Author</span>
      </div>
      <div>
        {title} <span style={{ marginLeft: "20px" }}> {author}</span>
      </div>
      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </section>
  );
};

export default DeletePost;
