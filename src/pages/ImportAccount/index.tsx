import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers, Wallet } from 'ethers'
import {
    Alert,
    Avatar,
    Box,
    Button,
    TextField,
    FormControl,
    InputAdornment,
    IconButton,
    LinearProgress,
    Snackbar,
    Typography,
} from '@mui/material'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'

import { orange } from '@mui/material/colors'

import { useGlobalContext, Actions } from '@/contexts/GlobalProvider'
import { StorageKey } from '@/common/models'

export default function ImportAccount() {
    const { state } = useGlobalContext()
    const [loading, setLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [openState, setOpenState] = useState(false)
    const [isPrivateKey, setIsPrivateKey] = useState(true)
    const [privateKeyVisibility, setPrivateKeyVisibility] = useState(false)
    const [passwordVisibility, setPasswordVisible] = useState(false)
    const [privateKey, setPrivateKey] = useState('')
    const [password, setPassword] = useState('')

    const { dispatch } = useGlobalContext()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        let wallet: Wallet
        if (!password) return
        try {
            if (isPrivateKey) {
                wallet = new ethers.Wallet(privateKey)
                wallet.connect(state.provider)
            } else {
                const w = ethers.Wallet.fromMnemonic(privateKey)
                wallet = w.connect(state.provider)
                wallet.connect(state.provider)
            }
        } catch (err) {
            setOpenState(true)
            return
        }

        if (!wallet) return
        setLoading(true)
        const result = await wallet.encrypt(
            password,
            null,
            (percent: number) => {
                setProgress(percent * 100)
            },
        )

        window.localStorage.setItem(StorageKey.EncryptedJsonWallet, result)

        dispatch({
            type: Actions.SetWallet,
            payload: { wallet },
        })

        setLoading(false)
        navigate('/')
    }
    return (
        <Box
            sx={{
                p: [0, 2],
                height: '100%',
            }}
        >
            <Snackbar
                open={openState}
                autoHideDuration={1000}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    错误！请重试！
                </Alert>
            </Snackbar>
            <Box
                sx={{
                    display: 'flex',
                    height: '70px',
                    textAlign: 'center',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: 2,
                }}
            >
                {
                    isPrivateKey
                        ? (
                            <>
                                <Avatar sx={{ backgroundColor: orange[600] }}>
                                    <VpnKeyIcon />
                                </Avatar>
                                <Typography>请输入私钥并设置钱包密码</Typography>
                            </>
                        )
                        : (
                            <>
                                <Avatar sx={{ backgroundColor: orange[600] }}>
                                    <AppRegistrationIcon />
                                </Avatar>
                                <p>请输入助记词并设置钱包密码</p>
                            </>
                        )
                }
            </Box>
            <Box
                sx={{
                    p: 2,
                }}
            >
                <form onSubmit={handleSubmit}>
                    <FormControl
                        fullWidth
                        color="secondary"
                        sx={{
                            margin: '0 auto',
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <TextField
                            required
                            fullWidth
                            label={isPrivateKey ? '私钥' : '助记词'}
                            variant="outlined"
                            autoComplete="off"
                            sx={{ mt: 2 }}
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
                            onChange={(e) => setPrivateKey(e.target.value)}
                        />
                        <TextField
                            required
                            fullWidth
                            label="设置钱包密码"
                            variant="outlined"
                            autoComplete="off"
                            sx={{ mt: 2 }}
                            type={passwordVisibility ? 'text' : 'password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle key visibility"
                                            onClick={() => setPasswordVisible(!passwordVisibility)}
                                        >
                                            {passwordVisibility ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {
                            loading ? (
                                <Box
                                    sx={{
                                        width: '100%',
                                        mt: 5,
                                    }}
                                >
                                    <LinearProgress variant="determinate" value={progress} />
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    <Button
                                        fullWidth
                                        disableElevation
                                        type="submit"
                                        variant="contained"
                                        sx={{
                                            mt: 5,
                                        }}
                                    >
                                        导入账号
                                    </Button>
                                    <Button
                                        fullWidth
                                        disableElevation
                                        variant="contained"
                                        sx={{
                                            mt: 5,
                                        }}
                                    >
                                        取消
                                    </Button>
                                    <Button
                                        fullWidth
                                        sx={{ mt: 1 }}
                                        onClick={() => setIsPrivateKey(!isPrivateKey)}
                                    >
                                        { isPrivateKey ? '从助记词导入' : '从私钥导入'}
                                    </Button>
                                </Box>
                            )
                        }
                        <Button
                            fullWidth
                            sx={{ mt: 1 }}
                            onClick={() => navigate('/create')}
                        >
                            还没有账号？点击创建
                        </Button>
                    </FormControl>
                </form>
            </Box>

        </Box>
    )
}
