import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { toast } from "react-hot-toast";
import {
  useGetVehichlesQuery,
  useImportVehichlesMutation,
} from "../features/vehichle/vehicleApiSlice";
import TableLoader from "../components/TableLoader";
import errorParser from "../util/errorParser";
import Pagination from "../components/Pagination";

const Vehichles = () => {
  const [importError, setImportError] = useState(null);
  const { isLoading, data } = useGetVehichlesQuery();
  const [importVehichles, { isLoading: isImporting }] =
    useImportVehichlesMutation();

  const [dataPerPage, setDataPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { ids, entities } = data || {};

  const vehichlesArray = ids?.map((id) => entities[id]);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = vehichlesArray?.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDataPerPage = (e) => {
    e.target.value < 10 ? setDataPerPage(10) : setDataPerPage(e.target.value);
  };

  const uploadRef = useRef(null);

  // listen to click on uploadRef and the open file upload for only csv files
  const handleFileUpload = async (e) => {
    setImportError(null);
    const file = e.target.files[0];
    if (file.type !== "text/csv") {
      toast.error("Please upload a csv file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    try {
      const result = await importVehichles(formData).unwrap();
      if (result) {
        toast.success("Vehichles imported successfully");
      }
    } catch (error) {
      if (parseInt(error.status) !== error.status) {
        setImportError("Something went wrong, please try again");
      } else {
        const parsedError = errorParser(error?.data);
        setImportError(error?.data?.message || parsedError);
        toast.error(importError, {
          style: {
            // handle error message overflow
            minWidth: "300px",
            height: "auto",
          },
        });
      }
    }
  };

  return (
    <Layout>
      <div className="content-header">
        <h2 className="content-title">Vehichles list</h2>
        <div>
          <Link
            // while uploading a file, disable the import button
            onClick={() => uploadRef.current.click()}
            to="#"
            className={
              isImporting
                ? "btn btn-light rounded mx-2 disabled"
                : "btn btn-light rounded mx-2"
            }
          >
            <i className="material-icons md-import_export"></i>
            Import
          </Link>
          <Link to="add" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Add new
          </Link>
          <input
            type="file"
            accept=".csv"
            ref={uploadRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
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
              <select
                onChange={handleDataPerPage}
                value={dataPerPage}
                className="form-select"
              >
                <option value="10">Show 10</option>
                <option value="20">Show 20</option>
                <option value="30">Show 30</option>
                <option value="40">Show 40</option>
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
                : currentData?.map((v, index) => (
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
      <div className="pagination-area mt-30 mb-50">
        <nav aria-label="Page navigation example">
          <Pagination
            totalData={vehichlesArray?.length}
            dataPerPage={dataPerPage}
            paginate={paginate}
            currentPage={currentPage}
          />
        </nav>
      </div>
    </Layout>
  );
};

export default Vehichles;
