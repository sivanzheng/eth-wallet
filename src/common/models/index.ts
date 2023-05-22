export interface Token {
    icon: JSX.Element
    name: string
    decimals: number
    address?: string
    balance: number | string
}

export enum StorageKey {
    Address = 'ETH_WALLET_ADDRESS',
    TokenAddress = 'ETH_TOKEN_ADDRESSES',
    EncryptedJsonWallet = 'ENCRYPTED_JSON_WALLET',
}

export interface BN {
    BigNumber: string
}
