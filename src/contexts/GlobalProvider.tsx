import React, {
    createContext, useReducer, useContext, ReactNode,
} from 'react'
import { ethers } from 'ethers'
import { getTokenContract } from '@/common/utils'
import { STORAGE_KEY } from '@/common/models'

export enum Actions {
    SET_WALLAT,
    SET_PROVIDER,
    ADD_ERC20_ADDRESS,
    ADD_ERC20_CONTRACT,
    RECOVER_WALLET_ADN_ERC20,
    LOGOUT
}

interface GlobalState {
    wallet?: ethers.Wallet | null
    provider: ethers.providers.JsonRpcProvider
    ERC20Addresses: string[]
    ERC20Contracts: Map<string, ethers.Contract>
}

interface GlobalPayload {
    wallet?: ethers.Wallet | null
    provider?: ethers.providers.JsonRpcProvider
    ERC20Address?: string
    ERC20Contract?: { address: string; contract: ethers.Contract }
}

const URL = `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA}`

const provider = new ethers.providers.JsonRpcProvider(URL)

const initialState: GlobalState = {
    provider,
    wallet: null,
    ERC20Addresses: [],
    ERC20Contracts: new Map(),
}

export interface Context {
    state: GlobalState;
    dispatch: React.Dispatch<{
      type: Actions;
      payload?: GlobalPayload;
    }>;
  }

export const GlobalContext = createContext<Context>({
    state: initialState,
    dispatch: () => {},
})

export const useGlobalContext = () => useContext<Context>(GlobalContext)

export default function GlobalProvider(props: { children: ReactNode }) {
    const reducer: React.Reducer<GlobalState, { type: Actions; payload?: Partial<GlobalPayload> }> = (state, action) => {
        const { type, payload } = action
        switch (type) {
        case Actions.SET_WALLAT: {
            if (!payload || !payload.wallet) return state
            return { ...state, wallet: payload.wallet }
        }

        case Actions.SET_PROVIDER: {
            if (!payload || !payload.provider) return state
            state.provider = payload.provider
            return { ...state, provider: payload.provider }
        }

        case Actions.ADD_ERC20_ADDRESS: {
            if (!payload || !payload.ERC20Address) return state
            const { ERC20Addresses } = state
            const { ERC20Address } = payload
            if (!ERC20Addresses.includes(ERC20Address)) {
                ERC20Addresses.push(ERC20Address)
                localStorage.setItem(STORAGE_KEY.TOKEN_ADDRESSES, JSON.stringify(ERC20Addresses))
                return { ...state, ERC20Addresses }
            }
            return state
        }

        case Actions.ADD_ERC20_CONTRACT: {
            if (!payload || !payload.ERC20Contract) return state
            const contracts = state.ERC20Contracts
            const { address, contract } = payload.ERC20Contract
            contracts.set(address, contract)
            return { ...state, ERC20Contracts: contracts }
        }

        case Actions.RECOVER_WALLET_ADN_ERC20: {
            if (!payload || !payload.wallet) return state
            const { wallet } = payload
            const tokenAddresses = localStorage.getItem(STORAGE_KEY.TOKEN_ADDRESSES)
            let ERC20Addresses = []
            const { ERC20Contracts } = state
            if (tokenAddresses && wallet) {
                const parsedTokenAddresses = JSON.parse(tokenAddresses)
                ERC20Addresses = parsedTokenAddresses
                for (const tokenAddress of parsedTokenAddresses) {
                    const contract = getTokenContract(tokenAddress, state.provider)
                    ERC20Contracts.set(tokenAddress, contract)
                }
            }
            return {
                ...state,
                ERC20Addresses,
                ERC20Contracts,
                wallet: wallet.connect(state.provider),
            }
        }
        case Actions.LOGOUT: {
            localStorage.removeItem(STORAGE_KEY.ENCRYPTED_JSON_WALLET)
            return { ...state, wallet: null }
        }

        default: return state
        }
    }

    const [state, dispatch] = useReducer(
        reducer,
        initialState,
    )
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {props.children}
        </GlobalContext.Provider>
    )
}
