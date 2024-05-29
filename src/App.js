import { Route, Routes } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import AddCanteen from './pages/AddCanteen';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import MyProfile from './components/Dashboard/MyProfile';
import Dashboard from "./pages/Dashboard";
import Settings from './components/Dashboard/Settings';
import OpenRoute from './components/Auth/OpenRoute';
import PrivateRoute from './components/Auth/PrivateRoute';
import Orders from './components/Dashboard/Orders';
import Cart from './components/Dashboard/Cart';
import Favourite from './components/Dashboard/Favourite';

function App() {

  const user = useSelector(store => store.user);
  
  return(
    <Routes>
      <Route path='/' element={<Body/>}>
        <Route index element={<Home/>}/>
        <Route path='about-us' element={<AboutUs/>}/>
        <Route path='add-canteen' element={<AddCanteen/>}/>
        <Route path='login' element={<OpenRoute><LogIn/></OpenRoute>}/>
        <Route path='signup' element={<OpenRoute><SignUp/></OpenRoute>}/>
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path='dashboard/my-profile' element={<MyProfile/>}/>
          <Route path='dashboard/settings' element={<Settings/>}/>
          {user?.accountType==="Customer" && <><Route path='dashboard/orders' element={<Orders/>}/>
            <Route path='dashboard/cart' element={<Cart/>}/>
            <Route path='dashboard/favourites' element={<Favourite/>}/>
          </>}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
