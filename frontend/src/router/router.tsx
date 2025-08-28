import { createBrowserRouter } from "react-router";
import App from "../App";
import { Home } from "../pages/Home/Home";

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
        }
      ]
    },
]);

export default router