import { createBrowserRouter } from 'react-router';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AllFacilities from '../pages/AllFacilities';
import AddFacility from '../pages/AddFacility';
import FacilityDetails from '../pages/FacilityDetails';
import MyBookings from '../pages/MyBookings';
import ManageMyFacilities from '../pages/ManageMyFacilities';
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
        path: '/facility/:id',
        element: <FacilityDetails />
      },
      
      {
        path: '/add-facility',
        element: <AddFacility />
      },
      {
        path: '/my-bookings',
        element: <MyBookings />
      },
      {
        path: '/manage-facilities',
        element: <ManageMyFacilities />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;