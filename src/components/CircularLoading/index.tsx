import { Box } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

export default function CircularLoading() {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
            }}
        >
            <CircularProgress />
        </Box>
    )
}
