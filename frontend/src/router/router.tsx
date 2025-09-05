import { createBrowserRouter } from "react-router";
import App from "../App";
import { Home } from "../pages/Home/Home";
import { Login } from "../components/Login";
import { Register } from "../components/Register";
import CartPage from "../pages/Book/CartPage";
import CheckoutPage from "../pages/Book/CheckoutPage";
import SingleBook from "../pages/Book/SingleBook";

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
            element: <h1>orders</h1>
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
          element: <CheckoutPage/>
        },
        {
          path:"/book/:id",
          element: <SingleBook/>
        }
      ]
    },
]);

export default router