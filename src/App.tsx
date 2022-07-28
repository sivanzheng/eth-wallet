import { Suspense } from 'react'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import TopBar from '@/components/TopBar'
import CircularLoading from '@/components/CircularLoading'
import GlobalProvider from '@/contexts/GlobalProvider'
import Guard from '@/Routes/Guard'

import './App.less'

function App() {
    return (
        <div className="App">
            <GlobalProvider>
                <Grid>
                    <Container className="container" maxWidth="sm">
                        <Paper>
                            <TopBar />
                            <Container className="main-container" sx={{ padding: 0 }}>
                                <Suspense fallback={<CircularLoading />}>
                                    <Guard />
                                </Suspense>
                            </Container>
                        </Paper>
                    </Container>
                </Grid>
            </GlobalProvider>
        </div>
    )
}

export default App
