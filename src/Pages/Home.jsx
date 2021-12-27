import React, { Fragment, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Axios from "./../Axios";

const Home = () => {
  let [state, setState] = useState([]);
  let [loading, setLaoding] = useState(false);
  let [searchTerm, setSearchTerm] = useState("");
 
  useEffect(() => {
    let fetchData = async () => {
      let payload = await Axios.get("/posts");
      console.log(payload.data);
      setState(payload.data);
    };
    fetchData();
  }, [state]);
  let mapData = state
    .filter(val => {
      if (searchTerm === "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map(x => {
      return (
        <Fragment key={x.id}>
          <tr>
            <td>{x.id}</td>
            <td>{x.title}</td>
            <td>{x.author}</td>
            <td className="btn-group w-100">
              <div className="btn-group w-100">
                <Link
                  to={`/edit-post/${x.id}`}
                  className="btn btn-outline-primary"
                >
                  Edit
                </Link>
                <Link
                  to={`/delete-post/${x.id}`}
                  className="btn btn-outline-danger"
                >
                  Delete
                </Link>
              </div>
            </td>
          </tr>
        </Fragment>
      );
    });
  return (
    <Fragment>
      <div className="container my-4 btn-lite">
        <input
          type="search"
          name="search"
          placeholder="search.."
          className="form-control"
          onChange={e => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="container my-4 bg-light p-4">
        <table className="table table-bordered table-hover table-light">
          <thead className="table-dark">
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{mapData}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Home;
