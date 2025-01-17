import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import HomePage from '@/pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './layouts/DashboardLayout';
import UsersPage from './pages/UsersPage';
import AuthLayout from './layouts/AuthLayout';
import CreateUser from './pages/CreateUser';
import CustomersPage from './pages/CustomersPage';
import CreateCustomer from './pages/CreateCustomer';
import OfferingsPage from './pages/OfferingsPage';
// import DeliveriesPage from './pages/DeliveryPage';
import CheckinsPage from './pages/CheckinsPage';
import CreateOfferings from './pages/CreateOfferings';
import DeliveryPage from './pages/DeliveryPage';
import CreateDelivery from './pages/CreateDelivery';
const guid: string ="d5bc6480-2e3c-435e-734e-577cca22a263";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard/home" />,
    },
    {
        path: 'dashboard',
        element: <DashboardLayout />,
        children: [
            {
                path: 'home',
                element: <HomePage />,
            },
            {
                path: 'users',
                element: <UsersPage />,
            },
            {
                path: 'customers',
                element: <CustomersPage />,
            },
            {
                path: 'offerings',
                element: <OfferingsPage />,
            },
            {
                path: 'delivery',
                element: <DeliveryPage />,
            },
            {
                path: `checkins/:${guid}`,
                element: <CheckinsPage />,
            },
            // {
            //     path: 'checkins',
            //     element: <CheckinsPage />,
            // },
            {
                path: 'users/create',
                element: <CreateUser />,
            },
            {
                path: 'customers/create',
                element: <CreateCustomer />,
            },
            {
                path: 'offerings/create',
                element: <CreateOfferings />,
            },
            {
                path: 'delivery/create',
                element: <CreateDelivery />,
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
        ],
    },
]);

export default router;
