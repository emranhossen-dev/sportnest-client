import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AllFacilities from '../pages/AllFacilities';
import AddFacility from '../pages/AddFacility';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/facilities',
        element: <AllFacilities />
      },
      {
        path: '/add-facility',
        element: <AddFacility />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;