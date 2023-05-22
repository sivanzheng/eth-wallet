import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Box,
    Button,
    ClickAwayListener,
    Divider,
    Typography,
    IconButton,
    Paper,
    Popover,
    MenuItem,
    MenuList,
} from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

import { useGlobalContext, Actions } from '@/contexts/GlobalProvider'
import { formatAddress, generateIcon } from '@/common/utils'

import Tokens from '@/components/Tokens'

export default function Home() {
    const { state, dispatch } = useGlobalContext()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const anchorRef = useRef<HTMLButtonElement>(null)

    const handleCopy = async () => {
        if (!state.wallet) return
        await navigator.clipboard.writeText(state.wallet?.address)
    }
    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current
          && anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return
        }

        setOpen(false)
    }
    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleLogout = () => {
        dispatch({ type: Actions.Logout })
        navigate('/import')
    }
    return (
        <Box>
            <Box
                sx={{
                    p: [1, 2],
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box>
                    <Box
                        sx={{
                            mb: 1,
                            display: 'flex',
                            fontSize: '20px',
                            alignItems: 'center',
                        }}
                    >

                        <Typography>Account 1</Typography>
                        {generateIcon(state.wallet ? state.wallet.address : '')}
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                mr: 0.5,
                            }}
                        >
                            {formatAddress(state.wallet ? state.wallet.address : '')}
                        </Typography>
                        <IconButton onClick={handleCopy}>
                            <ContentCopyIcon sx={{ fontSize: '16px' }} />
                        </IconButton>
                    </Box>
                </Box>
                <Box>
                    <IconButton
                        ref={anchorRef}
                        onClick={handleToggle}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Box>
                <Popover
                    open={open}
                    anchorEl={anchorRef.current}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                                autoFocusItem={open}
                                aria-labelledby="composition-button"
                            >
                                <MenuItem
                                    onClick={handleLogout}
                                >
                                    <Button>
                                        登出账号
                                    </Button>
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popover>
            </Box>
            <Divider />
            <Tokens />
        </Box>
    )
}
