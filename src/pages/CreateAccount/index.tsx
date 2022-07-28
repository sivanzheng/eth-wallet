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
import Tooltip from '@mui/material/Tooltip'
import Snackbar from '@mui/material/Snackbar'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import LinearProgress from '@mui/material/LinearProgress'
import { orange } from '@mui/material/colors'

import { STORAGE_KEY } from '@/common/models'
import { useGlobalContext, Actions } from '@/contexts/GlobalProvider'
import './index.less'

export default function CreateAccount() {
    const { state } = useGlobalContext()
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwordVisibility, setPasswordVisible] = useState(false)
    const [progress, setProgress] = useState(0)
    const [privateKey, setPrivateKey] = useState('')
    const [mnemonic, setMnemonic] = useState('')
    const [openState, setOpenState] = useState(false)

    const navigate = useNavigate()

    const { dispatch } = useGlobalContext()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!password) return
        const wallet = ethers.Wallet.createRandom()
        setPrivateKey(wallet.privateKey)
        setMnemonic(wallet.mnemonic.phrase)
    }

    const handleCopy = async (content: string) => {
        await navigator.clipboard.writeText(content)
    }

    const handleEnter = async () => {
        let wallet: ethers.Wallet
        if (!password) return
        try {
            wallet = new ethers.Wallet(privateKey)
            wallet.connect(state.provider)
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
        <div className="create-account-container">
            <Snackbar
                open={openState}
                autoHideDuration={1000}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    错误！请重试！
                </Alert>
            </Snackbar>
            <Typography variant="h5" component="h5">
                欢迎使用Wallet
            </Typography>
            <form onSubmit={handleSubmit}>
                <FormControl
                    fullWidth
                    sx={{ mt: '40px' }}
                    color="secondary"
                >
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
                    <Button
                        disableElevation
                        sx={{ mt: '40px' }}
                        type="submit"
                        variant="contained"
                    >
                        创建账号
                    </Button>
                </FormControl>
            </form>
            {
                privateKey && (
                    <Box sx={{ mt: '40px' }}>
                        <Typography gutterBottom sx={{ wordBreak: 'break-all' }}>
                            点击复制私钥与助记词，请妥善保管，并将其保存到离线设备中。
                        </Typography>
                        <Tooltip title="点击复制私钥" placement="top">
                            <Button onClick={() => handleCopy(privateKey)}>
                                <Typography gutterBottom sx={{ wordBreak: 'break-all' }}>
                                    {privateKey}
                                </Typography>
                            </Button>
                        </Tooltip>
                        <Tooltip title="点击复制助记词" placement="top">
                            <Button onClick={() => handleCopy(mnemonic)}>
                                <Typography gutterBottom sx={{ wordBreak: 'break-all' }}>
                                    {mnemonic}
                                </Typography>
                            </Button>
                        </Tooltip>
                        {
                            loading ? (
                                <Box sx={{ width: '100%', mt: '40px' }}>
                                    <LinearProgress variant="determinate" value={progress} />
                                </Box>
                            ) : (
                                <Button
                                    disableElevation
                                    variant="contained"
                                    sx={{
                                        mt: '10px',
                                        width: '100%',
                                        backgroundColor: orange[300],
                                        '&:hover': {
                                            backgroundColor: orange[700],
                                        },
                                    }}
                                    onClick={handleEnter}
                                >
                                    进入钱包
                                </Button>
                            )
                        }
                    </Box>
                )
            }
        </div>
    )
}
