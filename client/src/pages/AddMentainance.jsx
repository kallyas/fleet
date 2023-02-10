import React, { useState } from "react";
import Layout from "../components/Layout";
import { mentainanceSchema } from "../util/validations";
import { useAddMentainanceMutation } from "../features/mentainance/mentainanceApiSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGetVehichlesQuery } from "../features/vehichle/vehicleApiSlice";

const AddMentainance = () => {
  const [appError, setAppError] = useState(null);
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(mentainanceSchema),
  });

  const [addMentainance, { isLoading, isSuccess }] =
    useAddMentainanceMutation();

  const { isLoading: loading, data } = useGetVehichlesQuery();

  const { ids, entities } = data || {};

  const vehichlesArray = ids?.map((id) => entities[id]);

  const handleAddMentainance = async (data) => {
    setAppError(null);
    try {
      const res = await addMentainance({
        description: data.description,
        date: data.date,
        cost: data.cost,
        vehichle: data.fleet,
      }).unwrap();
      if (res.maintenance) {
        navigate("/dashboard/mentainance");
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
              <form
                id="driver_form"
                onSubmit={handleSubmit(handleAddMentainance)}
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">Description</label>
                      <div className="row gx-2">
                        <input
                          placeholder="Description"
                          type="text"
                          className={`form-control ${
                            errors.description ? "is-invalid" : ""
                          }`}
                          {...register("description")}
                        />
                        {errors.description && (
                          <div className="invalid-feedback">
                            {errors.description?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">Vehichle</label>
                      <div className="row gx-2">
                        <select
                          placeholder="Select Driver"
                          className={`form-control ${
                            errors.fleet ? "is-invalid" : ""
                          }`}
                          {...register("fleet")}
                        >
                          <option>Select Vehicle</option>
                          {vehichlesArray?.map((d, index) => (
                            <option key={index} value={d.id}>
                              {d.number_plate}
                            </option>
                          ))}
                        </select>
                        {errors.fleet && (
                          <div className="invalid-feedback">
                            {errors.fleet?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">Cost</label>
                      <div className="row gx-2">
                        <input
                          placeholder="40"
                          type="number"
                          className={`form-control ${
                            errors.cost ? "is-invalid" : ""
                          }`}
                          {...register("cost")}
                        />
                        {errors.cost && (
                          <div className="invalid-feedback">
                            {errors.cost?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="mb-4">
                      <label className="form-label">Date</label>
                      <div className="row gx-2">
                        <input
                          placeholder="2022-02-02"
                          type="date"
                          className={`form-control ${
                            errors.date ? "is-invalid" : ""
                          }`}
                          {...register("date")}
                        />
                        {errors.date && (
                          <div className="invalid-feedback">
                            {errors.date?.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" type="submit">
                  {isLoading ? "Adding..." : "Add Mentainance"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddMentainance;
