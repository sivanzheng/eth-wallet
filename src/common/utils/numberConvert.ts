import { ethers } from 'ethers'

/**
 * 将任意精度的 token 转换成为十进制小数，例如 0x1234 => 12.34
 * @param bigNumber 代币余额
 * @param decimals 代币的精度 十进制整数
 * @returns string
 */
export function bigNumberToFixed(bigNumber: ethers.BigNumber, decimals: number) {
    if (!bigNumber) {
        return 0
    }
    const str = bigNumber.toString()
    const len = str.length
    if (len < decimals - 3) {
        return 0
    }
    if (len > decimals) {
        const header = str.substring(0, len - decimals)
        const body = str.substring(
            len - decimals,
            len - decimals + 4 > len ? len - decimals + 4 : len,
        )
        const result = `${header}.${body}`
        return +result
    }
    const step = decimals - len
    let result = '0.'
    for (let i = 0; i < step; i++) {
        result += ('0')
    }
    const tail = str.substring(0, 4 - step)
    result = result.concat(tail)
    return +result
}

/**
 * 将十进制小数转换成为做任意精度的 token 余额，例如  12.34 => 0x1234
 * @param fixed 十进制小数
 * @param decimals 代币的精度
 * @returns BigNumber
 */
export function fixedToBigNumber(fixed: number, decimals: number) {
    if (!fixed) {
        return ethers.constants.Zero
    }
    const strs = fixed.toString().split('.')
    let power = 0
    let str = strs[0]
    if (strs.length > 1) {
        let tail = strs[1]
        const len = tail.length
        if (len > decimals) {
            tail = tail.substring(0, decimals)
        }
        str += tail
        power = tail.length
    }
    const ten = ethers.BigNumber.from(10)
    const times = ten.pow(power)
    const timesStr = ethers.BigNumber.from(str)
    return timesStr.mul(ten.pow(decimals)).div(times)
}
