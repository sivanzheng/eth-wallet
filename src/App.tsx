import { Suspense } from 'react'
import {
    Box,
    Container,
    Grid,
    Paper,
} from '@mui/material'
import TopBar from '@/components/TopBar'
import CircularLoading from '@/components/CircularLoading'
import GlobalProvider from '@/contexts/GlobalProvider'
import Guard from '@/Routes/Guard'

function App() {
    return (
        <Box
            sx={(theme) => ({
                background: `linear-gradient(81deg, ${theme.palette.background.default}, ${theme.palette.primary.main})`,
                height: 'calc(100vh - 32px)',
                width: '100vw',
                margin: 0,
                py: 2,
            })}
        >
            <GlobalProvider>
                <Grid>
                    <Container
                        maxWidth="sm"
                        sx={{
                            height: 'calc(100vh - 32px - 56px)',
                        }}
                    >
                        <Paper>
                            <TopBar />
                            <Container
                                sx={{
                                    height: 'calc(100vh - 32px - 56px - 20px)',
                                    p: 0,
                                }}
                            >
                                <Suspense fallback={<CircularLoading />}>
                                    <Guard />
                                </Suspense>
                            </Container>
                        </Paper>
                    </Container>
                </Grid>
            </GlobalProvider>
        </Box>
    )
}

export default App
