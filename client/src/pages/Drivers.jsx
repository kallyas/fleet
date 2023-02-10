import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useGetDriversQuery } from "../features/driver/driverApiSlice";
import TableLoader from "../components/TableLoader";

const Drivers = () => {
  const { isLoading, data } = useGetDriversQuery();

  const { ids, entities } = data || {}

  const driversArray = ids?.map((id) => entities[id])

  return (
    <Layout>
      <div className="content-header">
        <h2 className="content-title">Drivers list</h2>
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
                <th>Name</th>
                <th>Phone Number</th>
                <th>Age</th>
                <th>Date Hired</th>
                <th className="text-end"> Action </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? [...Array(5)].map((_, i) => <TableLoader key={i} count={5} />)
                : driversArray.map((d, index) => (
                    <tr key={index}>
                      <td>{d.name}</td>
                      <td>{d.phone_number}</td>
                      <td>{d.age}</td>
                      <td>{new Date(d.date_hired).toDateString()}</td>
                      <td className="text-end">
                        <Link
                          to={`/drivers/${d.id}`}
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

export default Drivers;
