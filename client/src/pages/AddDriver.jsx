import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { driverSchema } from "../util/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import Layout from "../components/Layout";
import { useForm } from "react-hook-form";
import { useAddDriverMutation } from "../features/driver/driverApiSlice";
import errorParser from "../util/errorParser";

const AddDriver = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appError, setAppError] = useState(null);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(driverSchema),
  });

  const [addDriver, { isLoading, isSuccess }] = useAddDriverMutation();

  const { errors } = formState;

  const handleAddDriver = async (data) => {
    setAppError(null);
    try {
      await addDriver({
        name: data.first_name + " " + data.last_name,
        phone_number: data.phone_number,
        age: data.age,
        date_hired: data.date_hired,
      }).unwrap();
      if (isSuccess) {
        navigate("/dashboard/drivers");
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

  return (
    <Layout>
      <div className="row">
        <div className="col-9">
          <div className="content-header">
            <h2 className="content-title">Add New Driver</h2>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="card mb-4">
            <div className="card-header">
              <h4>Driver Information</h4>
            </div>
            <div className="card-body">
              {appError && (
                <div className="alert alert-danger" role="alert">
                  {appError}
                </div>
              )}
              <form id="driver_form" onSubmit={handleSubmit(handleAddDriver)}>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <label className="form-label">First Name</label>
                      <div className="row gx-2">
                        <input
                          placeholder="John Doe"
                          type="text"
                          className={`form-control ${
                            errors.first_name ? "is-invalid" : ""
                          }`}
                          {...register("first_name")}
                        />
                        {errors.first_name && (
                          <div className="invalid-feedback">
                            {errors.first_name?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <label className="form-label">Last Name</label>
                      <div className="row gx-2">
                        <input
                          placeholder="John Doe"
                          type="text"
                          className={`form-control ${
                            errors.last_name ? "is-invalid" : ""
                          }`}
                          {...register("last_name")}
                        />
                        {errors.last_name && (
                          <div className="invalid-feedback">
                            {errors.last_name?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="mb-4">
                      <label className="form-label">Phone Number</label>
                      <input
                        placeholder="0712345678"
                        type="text"
                        className={`form-control ${
                          errors.phone_number ? "is-invalid" : ""
                        }`}
                        {...register("phone_number")}
                      />
                      {errors.phone_number && (
                        <div className="invalid-feedback">
                          {errors.phone_number?.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">Age</label>
                      <div className="row gx-2">
                        <input
                          placeholder="40"
                          type="number"
                          className={`form-control ${
                            errors.age ? "is-invalid" : ""
                          }`}
                          {...register("age")}
                        />
                        {errors.age && (
                          <div className="invalid-feedback">
                            {errors.age?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">Date Hired</label>
                      <div className="row gx-2">
                        <input
                          placeholder="2022-02-02"
                          type="date"
                          max={new Date().toISOString().split("T")[0]}
                          className={`form-control ${
                            errors.date_hired ? "is-invalid" : ""
                          }`}
                          {...register("date_hired")}
                        />
                        {errors.date_hired && (
                          <div className="invalid-feedback">
                            {errors.date_hired?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary" type="submit">
                  {isLoading ? "Adding" : "Add Driver"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddDriver;
