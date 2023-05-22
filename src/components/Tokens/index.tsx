import { ethers } from 'ethers'
import {
    useState,
    useEffect,
    useContext,
} from 'react'
import { throttle } from 'lodash'
import {
    Avatar,
    Box,
    Button,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    ListItemAvatar,
} from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import SendIcon from '@mui/icons-material/Send'

import { Context, GlobalContext } from '@/contexts/GlobalProvider'
import {
    generateIcon,
    getTokenInfo,
    getTokenBalance,
} from '@/common/utils'
import { Token } from '@/common/models'
import ethIcon from '@/assets/ether.png'

import ImportTokenDialog from './ImportTokenDialog'
import SentTokenDialog from './SendTokenDialog'

const provider = ethers.getDefaultProvider('ropsten')
const initialETH: Token = {
    icon: (
        <Box
            sx={{
                border: '1px solid #d0d0d0',
                boxSizing: 'border-box',
                backgroundColor: 'transparent',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
            }}
        >
            <Box
                component="img"
                sx={{ width: '100%', height: '100%' }}
                src={ethIcon}
                alt="eth-icon"
            />
        </Box>
    ),
    decimals: 18,
    name: 'ETH',
    balance: 0,
}

export default function Tokens() {
    const [eth, setETH] = useState<Token>(initialETH)

    const { state } = useContext<Context>(GlobalContext)
    const [tokens, setTokens] = useState<Token[]>([])
    const [importDialogBeenOpened, setImportDialogBeenOpened] = useState(false)
    const [sentTokenDialogBeenOpened, setSentTokenDialogBeenOpened] = useState(false)
    const [selectedToken, setSelectedToken] = useState<Token>()

    const { ERC20Contracts } = state

    const updateTokenBalance = async (token: Token, contract: ethers.Contract, address: string) => {
        const balance = await getTokenBalance(contract, address, token.decimals)
        setTokens(tokens.map((v) => {
            if (v.address === token.address) {
                return ({
                    ...v,
                    balance,
                })
            }
            return v
        }))
    }

    const updateETHBalance = async (wallet: ethers.Wallet) => {
        const ethBalance = await provider.getBalance(wallet!.address)
        setETH({
            ...eth,
            balance: ethers.utils.formatEther(ethBalance),
        })
    }
    const throttledUpdateETHBalance = throttle(updateETHBalance, 2000)

    useEffect(() => {
        const updateTokenList = async () => {
            if (!state.wallet) return
            const { address } = state.wallet
            const newTokens: Token[] = []
            for (const [tokenAddress, contract] of ERC20Contracts.entries()) {
                const info = await getTokenInfo(contract)
                if (!info) continue
                const icon = generateIcon(tokenAddress)
                const balance = await getTokenBalance(contract, address, info.decimals)
                const token = {
                    icon,
                    balance,
                    address: tokenAddress,
                    decimals: info.decimals,
                    name: info.symbol,
                }
                newTokens.push(token)
            }
            newTokens.sort((a, b) => a.name.localeCompare(b.name))
            setTokens(newTokens)
        }

        updateTokenList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ERC20Contracts.size])

    useEffect(() => {
        const { wallet } = state
        if (!wallet) return
        provider.on('block', () => {
            throttledUpdateETHBalance(wallet)
        })
        return () => {
            provider.removeAllListeners()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.wallet?.address])

    useEffect(() => {
        const watchTokensChange = async () => {
            if (!state.wallet) return
            const { address } = state.wallet
            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i]
                if (!token.address) continue
                const contract = ERC20Contracts.get(token.address)
                if (!contract) continue
                contract.on('Transfer', async (from, to, amount) => {
                    if (to === address) {
                        updateTokenBalance(token, contract, address)
                    }
                })
            }
        }
        watchTokensChange()
        return () => {
            for (const contract of ERC20Contracts.values()) {
                contract.removeAllListeners()
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tokens.length])

    const handleClick = (token: Token) => {
        if (Number.isNaN(Number(token.balance))) return
        if ((token.balance as number) <= 0) return
        setSelectedToken(token)
        setSentTokenDialogBeenOpened(true)
    }

    const handleSuccess = async () => {
        if (!selectedToken || !state.wallet) return
        if (selectedToken.address) {
            const contract = ERC20Contracts.get(selectedToken.address)
            if (contract) {
                await updateTokenBalance(selectedToken, contract, state.wallet.address)
            }
        } else {
            await updateETHBalance(state.wallet)
        }
        setSentTokenDialogBeenOpened(false)
    }

    return (
        <Box>
            <ImportTokenDialog open={importDialogBeenOpened} onClose={() => setImportDialogBeenOpened(false)} />
            <SentTokenDialog
                open={sentTokenDialogBeenOpened}
                token={selectedToken}
                onSuccess={handleSuccess}
                onClose={() => setSentTokenDialogBeenOpened(false)}
            />
            <List
                sx={{
                    overflowY: 'auto',
                    maxHeight: 'calc(100vh - 32px - 56px - 20px - 86px - 60px)',
                }}
            >
                {
                    [eth].concat(tokens).map((token) => (
                        <Box key={token.name}>
                            <ListItemButton onClick={() => handleClick(token)}>
                                <ListItemAvatar>
                                    <Avatar sx={{ backgroundColor: 'transparent' }}>
                                        {token.icon}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={`${token.balance} ${token.name.toUpperCase()}`}
                                />
                                <ListItemIcon>
                                    <SendIcon />
                                </ListItemIcon>
                            </ListItemButton>
                            <Divider variant="inset" component="li" />
                        </Box>
                    ))
                }
            </List>
            <Box
                sx={{
                    height: '60px',
                    display: 'flex',
                    textAlign: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Divider />
                <Box sx={{ mt: 2 }}> 找不到您的代币？</Box>
                <Button
                    sx={{
                        mt: 1,
                    }}
                    onClick={() => setImportDialogBeenOpened(true)}
                >
                    导入代币
                </Button>
            </Box>
        </Box>
    )
}
