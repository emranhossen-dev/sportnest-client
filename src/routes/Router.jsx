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
import UpdateFacility from '../pages/UpdateFacility';
import NotFound from '../pages/NotFound';
import PrivateRoute from '../components/PrivateRoute';

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
        element: <PrivateRoute><FacilityDetails /></PrivateRoute>
      },
      {
        path: '/my-bookings',
        element: <PrivateRoute><MyBookings /></PrivateRoute>
      },
      {
        path: '/add-facility',
        element: <PrivateRoute><AddFacility /></PrivateRoute>
      },
      {
        path: '/manage-facilities',
        element: <PrivateRoute><ManageMyFacilities /></PrivateRoute>
      },
      {
        path: '/update-facility/:id',
        element: <PrivateRoute><UpdateFacility /></PrivateRoute>
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;