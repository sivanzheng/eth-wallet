import { ethers } from 'ethers'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    FormControl,
    InputAdornment,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { StorageKey } from '@/common/models'
import { useGlobalContext, Actions } from '@/contexts/GlobalProvider'

export default function Login() {
    const { state } = useGlobalContext()
    const [password, setPassword] = useState('')
    const [privateKeyVisibility, setPrivateKeyVisibility] = useState(false)

    const navigate = useNavigate()

    const { dispatch } = useGlobalContext()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!password) return
        try {
            const encryptedWallet = window.localStorage.getItem(StorageKey.EncryptedJsonWallet)
            if (!encryptedWallet) return
            let wallet = ethers.Wallet.fromEncryptedJsonSync(encryptedWallet, password)
            wallet = wallet.connect(state.provider)
            dispatch({ type: Actions.RecoverWalletAdnERC20, payload: { wallet } })
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Box sx={{ p: 2, height: '100%' }}>
            <form onSubmit={handleSubmit}>
                <FormControl
                    fullWidth
                    color="secondary"
                >
                    <Typography variant="h5" component="h5">
                        输入密码以解锁钱包
                    </Typography>
                    <TextField
                        required
                        label="请输入密码"
                        variant="outlined"
                        autoComplete="off"
                        sx={{ mt: '40px' }}
                        type={privateKeyVisibility ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle key visibility"
                                        onClick={() => setPrivateKeyVisibility(!privateKeyVisibility)}
                                    >
                                        {privateKeyVisibility ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 5 }}
                        onClick={handleSubmit}
                    >
                        登录
                    </Button>
                </FormControl>
            </form>
        </Box>
    )
}
