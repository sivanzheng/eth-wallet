import { Box, Typography } from '@mui/material'
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress'

interface Props extends CircularProgressProps {
    value: number
}

export default function CircularProgressWithLabel(
    props: Props,
) {
    const { value } = props
    return (
        <Box
            sx={{
                position: 'relative',
                display: 'inline-flex',
            }}
        >
            <CircularProgress
                variant="determinate"
                {...props}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    {`${Math.round(value)}%`}
                </Typography>
            </Box>
        </Box>
    )
}
