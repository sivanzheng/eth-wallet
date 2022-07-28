import { ethers } from 'ethers'
import ERC20 from '@/common/constants/ABI/ERC20.json'
import { bigNumberToFixed } from './numberConvert'

export const getTokenContract = (
    address: string,
    provider: ethers.providers.JsonRpcProvider,
) => new ethers.Contract(address, ERC20, provider)

export const getTokenInfo = async (tokenContract: ethers.Contract) => {
    try {
        const symbol = await tokenContract.symbol() as string
        const decimals = await tokenContract.decimals() as number
        return {
            symbol,
            decimals,
        }
    } catch (error) {
        console.error(error)
    }
    return null
}

export const getTokenBalance = async (tokenContract: ethers.Contract, address: string, decimals: number) => {
    try {
        const res = await tokenContract.balanceOf(address)
        return bigNumberToFixed(res, decimals)
    } catch (error) {
        console.error(error)
    }
    return 0
}

export const getSignedContract = (tokenAddress: string, wallet: ethers.Wallet, provider: ethers.providers.JsonRpcProvider) => {
    const contract = new ethers.Contract(tokenAddress.toString(), ERC20, provider)
    return contract.connect(wallet)
}
