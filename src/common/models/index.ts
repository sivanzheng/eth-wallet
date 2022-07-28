export interface Token {
    icon: JSX.Element
    name: string
    decimals: number
    address?: string
    balance: number | string
}

export enum STORAGE_KEY {
    ADDRESS = 'ETH_WALLAT_ADDRESS',
    TOKEN_ADDRESSES = 'ETH_TOKEN_ADDRESSES',
    ENCRYPTED_JSON_WALLET = 'ENCRYPTED_JSON_WALLET',
}

export interface BN {
    BigNumber: string
}
