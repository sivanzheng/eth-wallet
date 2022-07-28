import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import { HashRouter } from 'react-router-dom'
import theme from '@/common/theme'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <ThemeProvider theme={theme}>
        <HashRouter>
            <App />
        </HashRouter>
    </ThemeProvider>,
)
