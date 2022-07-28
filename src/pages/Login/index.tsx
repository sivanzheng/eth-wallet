import { ethers } from 'ethers'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormControl from '@mui/material/FormControl'

import { STORAGE_KEY } from '@/common/models'
import { useGlobalContext, Actions } from '@/contexts/GlobalProvider'
import './index.less'

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
            const encryptedWallet = window.localStorage.getItem(STORAGE_KEY.ENCRYPTED_JSON_WALLET)
            if (!encryptedWallet) return
            let wallet = ethers.Wallet.fromEncryptedJsonSync(encryptedWallet, password)
            wallet = wallet.connect(state.provider)
            dispatch({ type: Actions.RECOVER_WALLET_ADN_ERC20, payload: { wallet } })
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="login-account-container">
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
                        variant="standard"
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
                        color="secondary"
                        sx={{ mt: '40px' }}
                        onClick={handleSubmit}
                    >
                        登录
                    </Button>
                </FormControl>
            </form>
        </div>
    )
}
