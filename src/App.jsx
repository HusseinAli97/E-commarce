import './App.css';
import Layout from './components/Layout/Layout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Categories from './components/Categories/Categories';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import ContactUs from './components/ContactUs/ContactUs';
import AboutUs from './components/AboutUs/AboutUs';
import WishList from './components/WishList/WishList';
import Error404 from './components/Error404/Error404';
import { useContext, useEffect } from 'react';
import { TokenContext } from './context/TokenContext';
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes';
import Details from './components/Details/Details';
import CheckOut from './components/CheckOut/CheckOut';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProtectRoutes><Home /></ProtectRoutes>
      }, {
        path: 'categories',
        element: <ProtectRoutes><Categories /></ProtectRoutes>
      }, {
        path: 'brands',
        element: <ProtectRoutes><Brands /></ProtectRoutes>
      }, {
        path: 'cart',
        element: <ProtectRoutes><Cart /></ProtectRoutes>
      }, {
        path: 'wishlist',
        element: <ProtectRoutes><WishList /></ProtectRoutes>
      }
      , {
        path: 'contact',
        element: <ProtectRoutes><ContactUs /></ProtectRoutes>
      }, {
        path: 'checkout',
        element: <CheckOut />
      }, {
        path: 'about',
        element: <ProtectRoutes><AboutUs /></ProtectRoutes>
      }, {
        path: 'details/:id',
        element: <ProtectRoutes><Details /></ProtectRoutes>
      },{
        path: 'allorders',
        element: <ProtectRoutes><Home /></ProtectRoutes>
      } ,{
        path: '*',
        element: <Error404 />
      }
    ]
  }
])
function App() {
  let { setToken } = useContext(TokenContext);
  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      setToken(localStorage.getItem('userToken'));
    }
  }, [])
  return (
    <RouterProvider router={routes} />
  );
}

export default App;
