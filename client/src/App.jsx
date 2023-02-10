import {
  createBrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import ErrorPage from "./pages/error-page";
import Dashboard from "./pages/Dashboard";
import RequireAuth from "./components/RequireAuth";
import RequireNoAuth from "./components/RequireNoAuth";
import Drivers from "./pages/Drivers";
import AddDriver from "./pages/AddDriver";
import Vehichles from "./pages/Vehichles";
import AddVehichle from "./pages/AddVehichle";
import Logout from "./pages/Logout";
import Mentainance from "./pages/Mentainance";
import AddMentainance from "./pages/AddMentainance";

function App() {
  const routes = Router([
    {
      path: "/",
      element: <RequireNoAuth />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Login />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <RequireAuth />,
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "drivers",
          element: <Drivers />,
        },
        {
          path: "drivers/add",
          element: <AddDriver />,
        },
        {
          path: "vehichles",
          element: <Vehichles />,
        },
        {
          path: "vehichles/add",
          element: <AddVehichle />,
        },
        {
          path: "mentainance",
          element: <Mentainance />,
        },
        {
          path: "mentainance/add",
          element: <AddMentainance />,
        },
        {
          path: "logout",
          element: <Logout />,
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <RouterProvider router={routes} />
    </>
  );
}

export default App;
