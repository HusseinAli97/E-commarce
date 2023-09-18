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

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home/>
      },{
        path: 'products',
        element: <Products/>
      },{
        path:'categories',
        element:<Categories/>
      },{
        path:'brands',
        element:<Brands/>
      },{
        path:'cart',
        element:<Cart/>
      },{
        path:'wishlist',
        element:<WishList/>
      }
      ,{
        path:'contact',
        element:<ContactUs/>
      },{
        path:'about',
        element:<AboutUs/>
      },{
        path:'*',
        element:<Error404/>
      }
    ]
  }
  // ,{
  //   path:'register',
  //   element:<Register/>
  // }
])
function App() {
  return (
    <RouterProvider router={routes}/>
  );
}

export default App;
