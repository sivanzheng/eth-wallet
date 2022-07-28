import { RouteObject as Route } from 'react-router-dom'

export default interface RouteObject extends Route {
    auth?: boolean
    children?: RouteObject[]
}
