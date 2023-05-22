import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
} from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'

import NetworkMenu from '@/components/NetworkMenu'

export default function TopBar() {
    return (
        <AppBar
            position="static"
            sx={(theme) => ({
                background: `linear-gradient(7deg, ${theme.palette.primary}, ${theme.palette.background.default})`,
                borderRadius: '8px 8px 0 0',
            })}
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
