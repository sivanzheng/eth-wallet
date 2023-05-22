import { useState, useRef } from 'react'
import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog,
    TextField,
    FormControl,
} from '@mui/material'

import { ethers } from 'ethers'
import { useGlobalContext, Actions } from '@/contexts/GlobalProvider'
import { getTokenContract, getTokenInfo } from '@/common/utils'

export interface ImportTokenDialogProps {
    open: boolean
    onClose: (value?: string) => void
}

export default function ImportTokenDialog(props: ImportTokenDialogProps) {
    const { onClose, open } = props
    const { state, dispatch } = useGlobalContext()

    const [tokenSymbol, setTokenSymbol] = useState('')
    const [tokenDecimals, setTokenDecimals] = useState(0)

    const tokenAddressRef = useRef<string>('')
    const tokenContractRef = useRef<ethers.Contract>()

    const handleCancel = () => {
        onClose()
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!tokenAddressRef.current || !tokenContractRef.current) return
        dispatch({
            type: Actions.AddERC20Contract,
            payload: {
                ERC20Contract: {
                    address: tokenAddressRef.current,
                    contract: tokenContractRef.current,
                },
            },
        })
        dispatch({
            type: Actions.AddERC20Address,
            payload: { ERC20Address: tokenAddressRef.current },
        })
        setTokenSymbol('')
        setTokenDecimals(0)
        onClose()
    }

    const handleBlur = async (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const { wallet, provider } = state
        const address = e.target.value
        if (!wallet || !address) return null
        tokenContractRef.current = getTokenContract(address, provider)
        const info = await getTokenInfo(tokenContractRef.current)
        if (info) {
            tokenAddressRef.current = address
            setTokenSymbol(info.symbol)
            setTokenDecimals(info.decimals)
        }
    }

    return (
        <Dialog
            fullWidth
            maxWidth="xl"
            open={open}
        >
            <form onSubmit={handleSubmit}>
                <DialogTitle>导入代币</DialogTitle>
                <DialogContent dividers>
                    <FormControl
                        fullWidth
                        color="secondary"
                    >
                        <TextField
                            required
                            label="代币合约地址"
                            sx={{ mt: 2 }}
                            autoComplete="off"
                            variant="outlined"
                            margin="normal"
                            onBlur={handleBlur}
                        />
                        <TextField
                            disabled
                            label="代币符号"
                            sx={{ mt: 2 }}
                            autoComplete="off"
                            variant="outlined"
                            margin="normal"
                            value={tokenSymbol}
                        />
                        <TextField
                            disabled
                            label="小数精度"
                            sx={{ mt: 2 }}
                            autoComplete="off"
                            variant="outlined"
                            margin="normal"
                            value={tokenDecimals}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={handleCancel}
                    >
                        取消
                    </Button>
                    <Button
                        type="submit"
                    >
                        添加自定义代币
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
