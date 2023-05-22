import React from 'react'
import { styled } from '@mui/material/styles'
import {
    Avatar,
    Badge,
    Menu,
    MenuItem,
    Tooltip,
    IconButton,
} from '@mui/material'
import { teal, pink } from '@mui/material/colors'

export default function NetworkMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const SmallAvatar = styled(Avatar)(({ theme }) => ({
        width: 15,
        height: 15,
        fontSize: 12,
        border: `2px solid ${theme.palette.background.paper}`,
    }))

    return (
        <>
            <Tooltip title="网络选择">
                <IconButton
                    size="small"
                    sx={{ ml: 2 }}
                    onClick={handleClick}
                >
                    <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                            <SmallAvatar>测</SmallAvatar>
                        }
                    >
                        <Avatar sx={{ bgcolor: pink[300] }}> R </Avatar>
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        mt: 1.5,
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                onClick={handleClose}
                onClose={handleClose}
            >
                <MenuItem disabled>
                    <Avatar
                        sx={{ bgcolor: teal[300] }}
                    >
                        主
                    </Avatar>
                    以太坊 Ethereum 主网络
                </MenuItem>
                <MenuItem>
                    <Avatar
                        sx={{ bgcolor: pink[300] }}
                    >
                        R
                    </Avatar>
                    Ropsten 测试网络
                </MenuItem>
            </Menu>
        </>

    )
}
