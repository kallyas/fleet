import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useGetVehichlesQuery } from "../features/vehichle/vehicleApiSlice";
import TableLoader from "../components/TableLoader";

const Vehichles = () => {
  const { isLoading, data } = useGetVehichlesQuery();

  const { ids, entities } = data || {};

  const vehichlesArray = ids?.map((id) => entities[id]);

  return (
    <Layout>
      <div className="content-header">
        <h2 className="content-title">Vehichles list</h2>
        <div>
          <Link to="add" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Add new
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
                <th>Number Plate</th>
                <th>Drivers</th>
                <th>Mileage</th>
                <th>Manufacturer</th>
                <th>Date of Purchase</th>
                <th className="text-end"> Action </th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? [...Array(5)].map((_, i) => <TableLoader key={i} count={6} />)
                : vehichlesArray?.map((v, index) => (
                    <tr key={index}>
                      <td>{v.number_plate}</td>
                      <td>{v.driver.name}</td>
                      <td>{v.mileage}</td>
                      <td>{v.manufacturer}</td>
                      <td>{v.date_of_purchase}</td>
                      <td className="text-end">
                        <Link
                          to={`/vehichles/${v.id}`}
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

export default Vehichles;
