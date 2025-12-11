import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";

import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";

import MainLayout from "../layouts/MainLayout";

import MyOrders from "../pages/Dashboard/Customer/MyOrders";
import { createBrowserRouter } from "react-router";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";

import AdminRoute from "./AdminRoute";
import AddMeals from "../pages/Dashboard/chef/AddMeals";
import MyMeals from "../pages/Dashboard/chef/MyMeals";
import ChefRoute from "./ChefRoute";
import ChefRequests from "../pages/Dashboard/Admin/ChefRequests";
import MealDetails from "../pages/MealDetails/MealDetails";
import PlatformStatistics from "../components/Dashboard/Statistics/PlatformStatistics";
import ManageRequest from "../pages/Dashboard/Admin/ManageRequest";
import OrderRequests from "../pages/Dashboard/chef/OrderRequests";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/meals/:id",
        element: <MealDetails />,
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "add-meal",
        element: (
          <PrivateRoute>
            <ChefRoute>
              <AddMeals />
            </ChefRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-meals",
        element: (
          <PrivateRoute>
            <ChefRoute>
              <MyMeals />
            </ChefRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "order-requests",
        element: (
          <PrivateRoute>
            <ChefRoute>
              <OrderRequests />
            </ChefRoute>
          </PrivateRoute>
        ),
      },
      
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-request",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageRequest />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "chef-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ChefRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "platform-statistics",
        element: (
          <PrivateRoute>
            <PlatformStatistics />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "favorite-meal",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "my-review",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
