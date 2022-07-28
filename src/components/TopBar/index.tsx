import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import NetworkMenu from '@/components/NetworkMenu'

export default function TopBar() {
    return (
        <AppBar
            position="static"
            sx={{
                background: 'linear-gradient(7deg, #00bcd4, #186a62)',
                borderRadius: '4px 4px 0 0',
            }}
        >
            <Toolbar>
                <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid
                        item
                        alignItems="center"
                        display="flex"
                    >
                        <CurrencyExchangeIcon sx={{ mr: 1, color: '#fff' }} />
                        <Typography
                            noWrap
                            variant="h6"
                            sx={{
                                mr: 2,
                                color: '#fff',
                                textDecoration: 'none',
                            }}
                        >
                            Wallet
                        </Typography>
                    </Grid>

                    <Grid item>
                        <NetworkMenu />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>

    )
}
