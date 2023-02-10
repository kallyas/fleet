import React from "react";
import Layout from "../components/Layout";
import { useGetMentainanceQuery } from "../features/mentainance/mentainanceApiSlice";
import { Link } from "react-router-dom";
import TableLoader from "../components/TableLoader";

const Mentainance = () => {
    const { isLoading, data } = useGetMentainanceQuery();
    console.log(data);
  return (
    <Layout>
      <div className="content-header">
        <h2 className="content-title">Maintenance list</h2>
        <div>
          <Link to="add" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </Link>
        </div>
      </div>
      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
              />
            </div>
            <div className="col-lg-2 col-md-3 col-6">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Vehichle</th>
                <th>Description</th>
                <th>Cost</th>
                <th>Date</th>
                <th className="text-end"> Action </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? [...Array(5)].map((_, i) => <TableLoader key={i} count={5} />)
                : data.map((d, index) => (
                    <tr key={index}>
                      <td>{d.fleet.number_plate}</td>
                      <td>{d.description}</td>
                      <td>{d.cost}</td>
                      <td>{new Date(d.date).toDateString()}</td>
                      <td className="text-end">
                        <Link
                          to={`/maintenance/${d.id}`}
                          className="btn btn-sm font-sm rounded btn-brand mx-4"
                        >
                          <i className="material-icons md-edit"></i>
                          Edit
                        </Link>
                        <button className="btn btn-sm font-sm rounded btn-danger">
                          <i className="material-icons md-delete"></i>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Mentainance;
