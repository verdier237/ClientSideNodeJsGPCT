import logo from './logo.svg';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

/** import all components */

import Login from './components/Login';
import Admin from './components/Admin';
import Register from './components/Register';
import Profile from './components/Profile';
import Student from './components/Student';
import Worker from './components/Worker';
import PageNotFound from './components/PageNotFound';
/**  root routes  */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  }
  ,
  {
    path: '/admin',
    element: <Admin></Admin>
  }
  ,
  {
    path: '/profile',
    element: <Profile></Profile>
  },
  {
    path: '/student',
    element: <Student></Student>
  }
  ,
  {
    path: '/worker',
    element: <Worker></Worker>
  },
  {
    path: '*',
    element: <PageNotFound></PageNotFound>
  }



])

function App() {
  return (
    <main >
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
