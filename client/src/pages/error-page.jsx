import { useRouteError, Link, useLocation } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  const from = useLocation().state?.from || "/";

  const notFound = error?.status === 404;
  return (
    <div className="">
      <div className="content-main">
        <div className="row mt-60">
          <div className="col-sm-12">
            <div className="w-50 mx-auto text-center">
              <h3 className="mt-40 mb-15">
                Oops! {notFound ? "Page Not Found" : "Internal Server Error"}{" "}
              </h3>

              {notFound ? (
                <p>
                  It's looking like you may have taken a wrong turn. Don't
                  worry...
                  <br /> it happens to the best of us. Here's a little tip that
                  might help you get back on track.
                </p>
              ) : (
                <p>
                  We are sorry for the inconvenience. We are working hard to fix
                  the issue.
                </p>
              )}

              <Link to={from} className="btn btn-primary mt-4">
                <i className="material-icons md-keyboard_return"></i> Back to
                main
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
