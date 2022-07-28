export const formatAddress = (address: string) => {
    if (!address) return '...'
    if (address.length < 40) return '...'
    return `${address.slice(0, 7)}...${address.slice(address.length - 7)}`
}
export default formatAddress
