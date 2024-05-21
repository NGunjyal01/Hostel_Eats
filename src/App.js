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

function App() {

  const appRouter = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Body/>}>
        <Route path='' element={<Home/>}/>
        <Route path='about-us' element={<AboutUs/>}/>
        <Route path='add-canteen' element={<AddCanteen/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Route>
    )
  )

  return(
    <Provider store={appStore}>
      <RouterProvider router={appRouter}/>
    </Provider>
  );
}

export default App;
