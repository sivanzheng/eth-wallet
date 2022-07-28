import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const theme = createTheme({
    palette: {
        primary: {
            main: '#00bcd4',
        },
        secondary: {
            main: '#15999c',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#fff',
                },
                text: {
                    color: 'rgba(0, 0, 0, 0.87)',
                },
            },
        },
        // MuiTextField: {
        //     styleOverrides: {
        //         root: {
        //             '& label': {
        //                 color: 'red',
        //             },
        //             '& label.Mui-focused': {
        //                 color: 'red',
        //             },
        //             '& .MuiInput-underline:after': {
        //                 borderBottomColor: 'red',
        //             },
        //             '& .MuiOutlinedInput-root': {
        //                 '& fieldset': {
        //                     borderColor: 'red',
        //                 },
        //                 '&:hover fieldset': {
        //                     borderColor: 'red',
        //                     borderWidth: '0.15rem',
        //                 },
        //                 '&.Mui-focused fieldset': {
        //                     borderColor: 'red',
        //                 },
        //             },
        //         },
        //     },
        // },
        // MuiFilledInput: {
        //     styleOverrides: {
        //         root: {
        //             '& label': {
        //                 color: 'red',
        //             },
        //             '& label.Mui-focused': {
        //                 color: 'yellow',
        //             },
        //             '& .MuiInput-underline:after': {
        //                 borderBottomColor: 'yellow',
        //             },
        //             '& .MuiOutlinedInput-root': {
        //                 '& fieldset': {
        //                     borderColor: 'yellow',
        //                 },
        //                 '&:hover fieldset': {
        //                     borderColor: 'yellow',
        //                     borderWidth: '0.15rem',
        //                 },
        //                 '&.Mui-focused fieldset': {
        //                     borderColor: 'yellow',
        //                 },
        //             },
        //         },
        //     },
        // },
    },
})

export default theme
