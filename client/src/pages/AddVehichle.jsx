import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { vehichleSchema } from "../util/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { useAddVehicleMutation } from "../features/vehichle/vehicleApiSlice";
import { useGetDriversQuery } from "../features/driver/driverApiSlice";
import errorParser from "../util/errorParser";

const AddVehichle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appError, setAppError] = useState(null);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(vehichleSchema),
  });

  const { isLoading: loading, data } = useGetDriversQuery();

  const [addVehichle, { isLoading, isSuccess }] = useAddVehicleMutation();

  const handleAddVehicle = async (data) => {
    setAppError(null);
    try {
      const res = await addVehichle({
        driver: Number(data.driver),
        number_plate: data.number_plate,
        manufacturer: data.manufacturer,
        mileage: Number(data.mileage),
        date_of_purchase: data.date_of_purchase,
      }).unwrap();
      if (res.vehichle) {
        navigate("/dashboard/vehichles");
      }
    } catch (err) {
      if (parseInt(err.status) !== err.status) {
        setAppError("Network Error");
      } else {
        const parsedError = errorParser(err?.data);
        setAppError(err?.data?.message || parsedError);
      }
    }
  };

  const { errors } = formState;

  return (
    <Layout>
      <div className="row">
        <div className="col-9">
          <div className="content-header">
            <h2 className="content-title">Add New Vehichle</h2>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-header">
              <h4>Vehichle Information</h4>
            </div>
            <div className="card-body">
              {appError && (
                <div className="alert alert-danger" role="alert">
                  {appError}
                </div>
              )}
              <form id="driver_form" onSubmit={handleSubmit(handleAddVehicle)}>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <label className="form-label">Number Plate</label>
                      <div className="row gx-2">
                        <input
                          placeholder="UAB 675T"
                          type="text"
                          className={`form-control ${
                            errors.number_plate ? "is-invalid" : ""
                          }`}
                          {...register("number_plate")}
                        />
                        {errors.number_plate && (
                          <div className="invalid-feedback">
                            {errors.number_plate?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <label className="form-label">Manufacturer</label>
                      <div className="row gx-2">
                        <input
                          placeholder="Toyota"
                          type="text"
                          className={`form-control ${
                            errors.manufacturer ? "is-invalid" : ""
                          }`}
                          {...register("manufacturer")}
                        />
                        {errors.manufacturer && (
                          <div className="invalid-feedback">
                            {errors.manufacturer?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <label className="form-label">Drivers</label>
                      <div className="row gx-2">
                        <select
                          placeholder="Select Driver"
                          className={`form-control ${
                            errors.driver ? "is-invalid" : ""
                          }`}
                          {...register("driver")}
                        >
                          <option>Select Driver</option>
                          {data?.map((d, index) => (
                            <option key={index} value={d.id}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                        {errors.driver && (
                          <div className="invalid-feedback">
                            {errors.driver?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">Mileage</label>
                      <div className="row gx-2">
                        <input
                          placeholder="40"
                          type="number"
                          className={`form-control ${
                            errors.mileage ? "is-invalid" : ""
                          }`}
                          {...register("mileage")}
                        />
                        {errors.mileage && (
                          <div className="invalid-feedback">
                            {errors.mileage?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">Date of Purchase</label>
                      <div className="row gx-2">
                        <input
                          placeholder="2022-02-02"
                          type="date"
                          max={new Date().toISOString().split("T")[0]}
                          className={`form-control ${
                            errors.date_of_purchase ? "is-invalid" : ""
                          }`}
                          {...register("date_of_purchase")}
                        />
                        {errors.date_of_purchase && (
                          <div className="invalid-feedback">
                            {errors.date_of_purchase?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">
                  {isLoading ? "Adding..." : "Add Vehichle"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddVehichle;
