import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import appStore from './utils/appStore';
import { Provider } from 'react-redux';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import AddCanteen from './components/AddCanteen';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import { Toaster } from 'react-hot-toast';
import MyProfile from './components/MyProfile';
import Dashboard from "./components/Dashboard";
import Settings from './components/Settings';

function App() {

  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Body/>}>
        <Route path='' element={<Home/>}/>
        <Route path='about-us' element={<AboutUs/>}/>
        <Route path='add-canteen' element={<AddCanteen/>}/>
        <Route path='login' element={<LogIn/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='dashboard' element={<Dashboard/>}>
          <Route path='my-profile' element={<MyProfile/>}/>
          <Route path='settings' element={<Settings/>}/>
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
