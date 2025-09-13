import { createBrowserRouter } from "react-router";
import App from "../App";
import { Home } from "../pages/Home/Home";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import CartPage from "../pages/Book/CartPage";
import CheckoutPage from "../pages/Book/CheckoutPage";
import SingleBook from "../pages/Book/SingleBook";
import ProtectedRoute from "./ProtectedRoute";
import OrderPage from "../pages/Book/OrderPage";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageBook from "../pages/Dashboard/ManageBook";
import AddBook from "../pages/Dashboard/AddBook";
import EditBook from "../pages/Dashboard/EditBook";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path: "/",
            element: <Home/> 
        },
        {
            path:"/orders",
            element:  
            <ProtectedRoute>
              <OrderPage/>
            </ProtectedRoute>
        },
        {
            path:"/about",
            element: <h1>about</h1>
        },
        {
          path:"/login",
          element: <Login/>
        },
        {
          path:"/register",
          element: <Register/>
        },
        {
          path:"/cart",
          element: <CartPage/>
        },
        {
          path:"/checkout",
          element: 
          <ProtectedRoute>
              <CheckoutPage/>
          </ProtectedRoute>
        },
        {
          path:"/book/:id",
          element: <SingleBook/>
        }
      ]
    },
    {
      path: "/admin",
      element: <AdminLogin/>
    },
    {
      path: "/dashboard",
      element: <AdminRoute> <DashboardLayout/> </AdminRoute>,
      children:[
        {
          path: "",
          element: <AdminRoute><Dashboard/></AdminRoute>
        },
        {
          path: "add-new-book",
          element: <AdminRoute><AddBook/></AdminRoute>
        },
        {
          path: "edit-book/:id",
          element: <AdminRoute><EditBook/></AdminRoute>
        },
        {
          path: "manage-books",
          element: <AdminRoute><ManageBook/></AdminRoute>
        },
      ]
    }
]);

export default router