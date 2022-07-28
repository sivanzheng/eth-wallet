import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Paper from '@mui/material/Paper'
import Popover from '@mui/material/Popover'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'

import { useGlobalContext, Actions } from '@/contexts/GlobalProvider'
import { formatAddress, generateIcon } from '@/common/utils'

import Tokens from '@/components/Tokens'

import './index.less'

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
        dispatch({ type: Actions.LOGOUT })
        navigate('/import')
    }
    return (
        <div>
            <div className="home-header">
                <div>
                    <div className="account">
                        <p>Account 1</p>
                        {generateIcon(state.wallet ? state.wallet.address : '') }
                    </div>

                    <div className="address">
                        <p>{ formatAddress(state.wallet ? state.wallet.address : '')}</p>
                        <IconButton onClick={handleCopy}>
                            <ContentCopyIcon sx={{ fontSize: '16px' }} />
                        </IconButton>
                    </div>
                </div>
                <div>
                    <IconButton ref={anchorRef} onClick={handleToggle}>
                        <MoreVertIcon />
                    </IconButton>
                </div>
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
                                <MenuItem onClick={handleLogout}>登出账号</MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Popover>
            </div>
            <Divider />
            <div className="home-body">
                <Tokens />
            </div>
        </div>
    )
}
