import { RouteObject as Route } from 'react-router-dom'

type RouteObject = Route & {
    auth?: boolean
    children?: RouteObject[]
}

export default RouteObject
