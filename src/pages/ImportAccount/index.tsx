import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ethers, Wallet } from 'ethers'
import FormControl from '@material-ui/core/FormControl'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { orange } from '@mui/material/colors'

import { useGlobalContext, Actions } from '@/contexts/GlobalProvider'
import { STORAGE_KEY } from '@/common/models'

import './index.less'

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

        window.localStorage.setItem(STORAGE_KEY.ENCRYPTED_JSON_WALLET, result)

        dispatch({
            type: Actions.SET_WALLAT,
            payload: { wallet },
        })

        setLoading(false)
        navigate('/')
    }
    return (
        <div className="import-account-container">
            <Snackbar
                open={openState}
                autoHideDuration={1000}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    错误！请重试！
                </Alert>
            </Snackbar>
            {
                isPrivateKey ? (
                    <div className="header">
                        <Avatar sx={{ backgroundColor: orange[600] }}>
                            <VpnKeyIcon />
                        </Avatar>
                        <p>请输入私钥并设置钱包密码</p>
                    </div>
                ) : (
                    <div className="header">
                        <Avatar sx={{ backgroundColor: orange[600] }}>
                            <AppRegistrationIcon />
                        </Avatar>
                        <p>请输入助记词并设置钱包密码</p>
                    </div>
                )
            }

            <form onSubmit={handleSubmit}>
                <FormControl
                    fullWidth
                    color="secondary"
                >
                    <TextField
                        required
                        label={isPrivateKey ? '私钥' : '助记词'}
                        variant="standard"
                        autoComplete="off"
                        className="input"
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
                        label="设置钱包密码"
                        variant="standard"
                        autoComplete="off"
                        className="input"
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
                            <Box sx={{ width: '100%', mt: '40px' }}>
                                <LinearProgress variant="determinate" value={progress} />
                            </Box>
                        ) : (
                            <Box>
                                <Button
                                    disableElevation
                                    className="button mgt-40"
                                    type="submit"
                                    variant="contained"
                                >
                                    导入账号
                                </Button>
                                <Button disableElevation className="button" variant="contained">
                                    取消
                                </Button>
                                <Button sx={{ width: '100%' }} onClick={() => setIsPrivateKey(!isPrivateKey)}>
                                    { isPrivateKey ? '从助记词导入' : '从私钥导入'}
                                </Button>
                            </Box>
                        )
                    }
                    <Button sx={{ width: '100%' }} onClick={() => navigate('/create')}>
                        还没有账号？点击创建
                    </Button>
                </FormControl>
            </form>
        </div>
    )
}
