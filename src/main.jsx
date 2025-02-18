import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./MainLayout/Main";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import AuthProvider from "./Provider/AuthProvider";
import AddEquip from "./Pages/AddEquip";
import AllEquip from "./Components/AllEquip";
import MyEquip from "./Components/MyEquip";
import PrivateRoutes from "./Utility/PrivateRoutes";
import ErrorPage from "./Pages/ErrorPage";
import ViewDetails from "./Pages/ViewDetails";
import EditEquipment from "./Pages/EditEquipment";
import MyRecommendations from "./Pages/MyRecommendations";
import Recommendations from "./Pages/Recommendations";
// import ErrorPage from './Pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Signup></Signup>,
      },
      {
        path: "addEquip",
        element: (
          <PrivateRoutes>
            <AddEquip />
          </PrivateRoutes>
        ),
      },
      {
        path: "allEquip",
        element: <AllEquip></AllEquip>,
      },
      {
        path: "myEquip",
        element: (
          <PrivateRoutes>
            <MyEquip />
          </PrivateRoutes>
        ),
      },
      {
        path: 'equipment_details/:id',
        element: (
          <PrivateRoutes>
            <ViewDetails></ViewDetails>
          </PrivateRoutes>
        ),
        loader: ({ params }) => fetch(`https://pick-right-server.vercel.app/equipment/${params.id}`),
      },
      {
        path: 'edit_equipment/:id',
        element: (
          <PrivateRoutes>
            <EditEquipment></EditEquipment>
          </PrivateRoutes>
        ),
        loader: ({ params }) => fetch(`https://pick-right-server.vercel.app/equipment/${params.id}`),
      },
      {
        path: 'myRecommendations',
        element: (
          <PrivateRoutes>
            <MyRecommendations></MyRecommendations>
          </PrivateRoutes>
        ),
      },
      {
        path: 'Recommendations_forMe',
        element: (
          <PrivateRoutes>
            <Recommendations></Recommendations>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
