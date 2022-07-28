import { useState } from 'react'
import { ethers } from 'ethers'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import CircularProgress from '@mui/material/CircularProgress'
import CheckIcon from '@mui/icons-material/Check'
import { green } from '@material-ui/core/colors'

import { Token } from '@/common/models'
import { getSignedContract, fixedToBigNumber } from '@/common/utils'
import { useGlobalContext } from '@/contexts/GlobalProvider'
import './index.less'

export interface SendTokenDialogProps {
    open: boolean;
    token?: Token;
    onClose: () => void;
    onSuccess: () => void;
}

export default function SendTokenDialog(props: SendTokenDialogProps) {
    const { state } = useGlobalContext()
    const {
        open, token, onClose, onSuccess,
    } = props

    const [sendData, setSendData] = useState({
        address: '',
        amount: '',
    })

    const [gasFee, setGasFee] = useState('')
    const [next, setNext] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const resetForm = () => {
        setNext(false)
        setGasFee('0')
        setSendData({
            address: '',
            amount: '',
        })
    }

    const handleClose = () => {
        resetForm()
        onClose()
    }

    const handleNext = async () => {
        const { provider } = state
        const gasPrice = await provider.getGasPrice()
        setGasFee(`${ethers.utils.formatEther(gasPrice)} ETH`)
        setNext(true)
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { wallet, provider } = state
        const { address, amount } = sendData
        if (!token || !wallet) return
        setLoading(true)
        try {
            let tx: ethers.providers.TransactionResponse
            if (token.address) {
                const contract = getSignedContract(token.address, wallet, provider)
                tx = await contract.transfer(
                    address,
                    fixedToBigNumber(parseFloat(amount), token.decimals),
                ) as ethers.providers.TransactionResponse
            } else {
                tx = await wallet.sendTransaction({
                    to: sendData.address,
                    value: ethers.utils.parseEther(sendData.amount),
                })
            }

            const res = await tx.wait()
            if (res && res.status === 1) {
                setSuccess(true)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => {
                onSuccess()
                resetForm()
                setLoading(false)
            }, 800)
        }
    }

    return (
        <Dialog
            fullWidth
            maxWidth="lg"
            open={open}
        >
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <Box sx={{ m: 1, position: 'relative' }}>
                    {
                        success ? (
                            <Fab
                                color="primary"
                                sx={{ bgcolor: green[300] }}
                            >
                                <CheckIcon sx={{ bgcolor: green[300] }} />
                            </Fab>
                        ) : (
                            <CircularProgress sx={{ color: '#fff' }} />
                        )
                    }
                </Box>
            </Backdrop>
            <form onSubmit={onSubmit}>
                <DialogTitle>发送{token?.name}</DialogTitle>
                <DialogContent dividers>
                    <FormControl
                        fullWidth
                        color="secondary"
                    >
                        <TextField
                            disabled
                            label={`${token?.name}余额`}
                            autoComplete="off"
                            className="input"
                            variant="outlined"
                            margin="normal"
                            value={token?.balance}
                        />
                        <TextField
                            required
                            label="接收地址"
                            autoComplete="off"
                            className="input"
                            variant="outlined"
                            margin="normal"
                            onBlur={(e) => setSendData({ ...sendData, address: e.target.value })}
                        />
                        <TextField
                            required
                            label="发送数量"
                            autoComplete="off"
                            className="input"
                            variant="outlined"
                            margin="normal"
                            onBlur={(e) => setSendData({ ...sendData, amount: e.target.value })}
                        />
                        {
                            next && (
                                <TextField
                                    disabled
                                    label="预估燃料价格"
                                    autoComplete="off"
                                    className="input"
                                    variant="outlined"
                                    margin="normal"
                                    value={gasFee}
                                />
                            )
                        }
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        取消
                    </Button>
                    {
                        next ? (
                            <Button type="submit">发送</Button>
                        ) : (
                            <Button onClick={handleNext}>
                                下一步
                            </Button>
                        )
                    }
                </DialogActions>
            </form>
        </Dialog>
    )
}
