import { useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'

import { ethers } from 'ethers'
import { useGlobalContext, Actions } from '@/contexts/GlobalProvider'
import { getTokenContract, getTokenInfo } from '@/common/utils'
import './index.less'

let tokenAddress = ''
let tokenContract: ethers.Contract

export interface ImportTokenDialogProps {
    open: boolean;
    onClose: (value?: string) => void;
}

export default function ImportTokenDialog(props: ImportTokenDialogProps) {
    const { onClose, open } = props
    const { state, dispatch } = useGlobalContext()

    const [tokenSymbol, setTokenSymbol] = useState('')
    const [tokenDecimals, setTokenDecimals] = useState(0)

    const handleCancel = () => {
        onClose()
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch({
            type: Actions.ADD_ERC20_CONTRACT,
            payload: { ERC20Contract: { address: tokenAddress, contract: tokenContract } },
        })
        dispatch({
            type: Actions.ADD_ERC20_ADDRESS,
            payload: { ERC20Address: tokenAddress },
        })
        setTokenSymbol('')
        setTokenDecimals(0)
        onClose()
    }

    const handleBlur = async (e: React.FocusEvent<HTMLTextAreaElement>) => {
        const { wallet, provider } = state
        const address = e.target.value
        if (!wallet || !address) return null
        tokenContract = getTokenContract(address, provider)
        const info = await getTokenInfo(tokenContract)
        if (info) {
            tokenAddress = address
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
                            autoComplete="off"
                            className="input"
                            variant="outlined"
                            margin="normal"
                            onBlur={handleBlur}
                        />
                        <TextField
                            disabled
                            label="代币符号"
                            autoComplete="off"
                            className="input"
                            variant="outlined"
                            margin="normal"
                            value={tokenSymbol}
                        />
                        <TextField
                            disabled
                            label="小数精度"
                            autoComplete="off"
                            className="input"
                            variant="outlined"
                            margin="normal"
                            value={tokenDecimals}
                        />
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                        取消
                    </Button>
                    <Button type="submit">添加自定义代币</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
