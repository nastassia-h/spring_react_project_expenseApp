import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from './components/DefaultLayout'
import GuestLayout from "./components/GuestLayout";
import HomePage from './views/HomePage'
import Login from './views/Login'
import Signup from './views/Signup'
import NotFound from './views/NotFound'
import UserForm from "./views/widgets/UserForm";
import CategoriesPage from "./views/CategoriesPage";


const router = createBrowserRouter([
   {
      path: '/',
      element: <DefaultLayout />,
      children: [
         {
            path: '/',
            element: <HomePage />
         },
         {
            path: '/homepage',
            element: <HomePage />
         },
         {
            path: '/homepage/edit',
            element: <UserForm />
         },
         {
            path: '/categories',
            element: <CategoriesPage />
         }
      ]
   },
   {
      path: '/',
      element: <GuestLayout />,
      children: [
         {
            path: "/login",
            element: <Login />
         },
         {
            path: '/signup',
            element: <Signup />
         },
      ]
   },
   {
      path: '*',
      element: <NotFound />
   }
])

export default router