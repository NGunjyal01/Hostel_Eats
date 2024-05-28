import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import appStore from './utils/appStore';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import AddCanteen from './pages/AddCanteen';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import { Toaster } from 'react-hot-toast';
import MyProfile from './components/Dashboard/MyProfile';
import Dashboard from "./pages/Dashboard";
import Settings from './components/Dashboard/Settings';
import OpenRoute from './components/Auth/OpenRoute';
import PrivateRoute from './components/Auth/PrivateRoute';

function App() {

  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Body/>}>
        <Route index element={<Home/>}/>
        <Route path='about-us' element={<AboutUs/>}/>
        <Route path='add-canteen' element={<AddCanteen/>}/>
        <Route path='login' element={<OpenRoute><LogIn/></OpenRoute>}/>
        <Route path='signup' element={<OpenRoute><SignUp/></OpenRoute>}/>
        <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path='dashboard/my-profile' element={<MyProfile/>}/>
          <Route path='dashboard/settings' element={<Settings/>}/>
        </Route>
      </Route>
    )
  )

  return(
    <Provider store={appStore}>
      <RouterProvider router={appRouter}/>
      <Toaster/>
    </Provider>
  );
}

export default App;
