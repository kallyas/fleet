import React from "react";
import Layout from "../components/Layout";
import Card from "../components/Card";
import TableLoader from "../components/TableLoader";
import { useGetVehichlesQuery } from "../features/vehichle/vehicleApiSlice";
import { Link } from "react-router-dom";
import { useGetDriversQuery } from "../features/driver/driverApiSlice";
import { cardsData } from "../data/data";
import Charts from "../components/Charts";
import LetteredAvatar from "react-lettered-avatar";

const Dashboard = () => {
  const { isLoading, data } = useGetVehichlesQuery();
  const { data: drivers } = useGetDriversQuery();
  return (
    <Layout>
      <div className="content-header">
        <div>
          <h2 className="content-title card-title">Dashboard </h2>
          <p>Whole data about your business here</p>
        </div>
        <div>
          <a href="#" className="btn btn-primary">
            <i className="text-muted material-icons md-post_add"></i>Create
            report
          </a>
        </div>
      </div>
      <div className="row">
        {cardsData.map((cd, index) => (
          <div key={index} className="col-lg-3">
            <Card
              data={{
                title: cd.title,
                text: cd.text,
                icon: cd.icon,
                numbers: cd.numbers,
              }}
            />
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-xl-8 col-lg-12">
          <div className="card mb-4">
            <article className="card-body">
              <h5 className="card-title">statistics</h5>
              <Charts />
            </article>
          </div>
          <div className="row">
            <div className="col-lg-5">
              <div className="card mb-4">
                <article className="card-body">
                  <h5 className="card-title">New Drivers</h5>
                  <div className="new-member-list">
                    {drivers?.map((d, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between mb-4"
                      >
                        <div className="d-flex align-items-center">
                          <LetteredAvatar
                            name={d.name}
                            size={50}
                            className="me-3"
                          />
                          <div>
                            <h6>{d.name}</h6>
                            <p className="text-muted font-xs">
                              {new Date(d.date_hired).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="card mb-4">
                <article className="card-body">
                  <h5 className="card-title">Recent activities</h5>
                  <ul className="verti-timeline list-unstyled font-sm">
                    {[...Array(5)].map((_, index) => (
                      <li key={index} className="event-list">
                        <div className="event-timeline-dot">
                          <i className="material-icons md-play_circle_outline font-xxl"></i>
                        </div>
                        <div className="media">
                          <div className="me-3">
                            <h6>
                              <span>Today</span>{" "}
                              <i className="material-icons md-trending_flat text-brand ml-15 d-inline-block"></i>
                            </h6>
                          </div>
                          <div className="media-body">
                            <div>Lorem ipsum dolor sit amet consectetur</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12">
          <div className="card mb-4">
            <article className="card-body">
              <h5 className="card-title">Revenue Base on Area</h5>
              chart here
            </article>
          </div>
          <div className="card mb-4">
            <article className="card-body">
              <h5 className="card-title">Revenue Base on Area</h5>
              chart here
            </article>
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <header className="card-header" data-select2-id="11">
          <h4 className="card-title">Latest Fleet</h4>
          <div className="row align-items-center" data-select2-id="10">
            <div className="col-md-2 col-6">
              <input type="date" value="02.05.2022" className="form-control" />
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            <div className="table-responsive">
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
                    ? [...Array(5)].map((_, i) => (
                        <TableLoader key={i} count={6} />
                      ))
                    : data?.map((v, index) => (
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
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
