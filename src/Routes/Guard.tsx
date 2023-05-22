import { useEffect } from 'react'
import {
    useLocation,
    useRoutes,
    Location,
    useNavigate,
    NavigateFunction,
} from 'react-router-dom'
import { ethers } from 'ethers'
import { StorageKey } from '@/common/models'
import RouteObject from './RouteObject'
import { useGlobalContext } from '@/contexts/GlobalProvider'
import { routes as routesConfig } from './index'

export function searchRouteDetail(path: string, routes: RouteObject[]): RouteObject | null {
    for (const item of routes) {
        if (item.path === path) return item
        if (item.children) {
            return searchRouteDetail(path, item.children)
        }
    }
    return null
}

function guard(location: Location, navigate: NavigateFunction, routes: RouteObject[], wallet?: ethers.Wallet | null) {
    const { pathname } = location
    const routeDetail = searchRouteDetail(pathname, routes)

    if (!routeDetail) return false

    if (routeDetail.auth) {
        const encryptedJsonWallet = window.localStorage.getItem(StorageKey.EncryptedJsonWallet)
        if (!encryptedJsonWallet) {
            navigate('/import')
            return false
        }
        if (!wallet || !wallet.address) {
            navigate('/login')
            return false
        }
    }

    return true
}

const Guard = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { state } = useGlobalContext()

    useEffect(() => {
        guard(location, navigate, routesConfig, state.wallet)
    }, [location, navigate, state.wallet])

    return useRoutes(routesConfig)
}

export default Guard
