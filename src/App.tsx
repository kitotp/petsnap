import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./features/Home/HomePage"
import LoginPage from "./features/Login/LoginPage"
import AppLayout from "./ui/AppLayout"
import PostsPage from "./features/Posts/PostsPage"
import RequireNoAuth from "./ui/RequireNoAuth"
import ProfilePage from "./features/Profile/ProfilePage"
import RequireAuth from "./ui/RequireAuth"
import { lazy } from "react"


const AdminPage = lazy(() => import('./features/Admin/AdminPage'))

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: (
          <RequireNoAuth>
            <LoginPage />
          </RequireNoAuth>)
      },
      {
        path: '/posts',
        element: <PostsPage />
      },
      {
        path: '/admin',
        element: <AdminPage />
      },
      {
        path: '/profile/:id',
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>)
      }
    ]
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
