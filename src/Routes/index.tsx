import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import RouteObject from './RouteObject'

const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const ImportAccount = lazy(() => import('@/pages/ImportAccount'))
const CreateAccount = lazy(() => import('@/pages/CreateAccount'))

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
        auth: true,
    },
    {
        path: '/import',
        element: <ImportAccount />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/create',
        element: <CreateAccount />,
    },
]

export default function Routes() {
    return useRoutes(routes)
}
