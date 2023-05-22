import { createElement } from 'react'
import { alpha, createTheme } from '@mui/material/styles'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined'
import {
    mainColor,
    red,
    green,
    white,
    lightGrey,
    darkGrey,
    yellow,
    blue,
} from '@/common/theme/colors'

const toButtonShadow = (color: string, opacity = 0.5) => `0 4px 12px 0 ${alpha(color, opacity)}`

const finalTheme = createTheme({
    palette: {
        primary: {
            main: mainColor[0],
            dark: mainColor[2],
            light: mainColor[0],
            contrastText: white[0],
        },
        secondary: {
            main: mainColor[1],
            light: mainColor[1],
            dark: mainColor[3],
            contrastText: white[0],
        },
        background: {
            default: white[0],
            paper: white[0],
        },
        text: {
            primary: darkGrey[1],
            secondary: darkGrey[0],
            disabled: darkGrey[3],
        },
        error: {
            main: red[0],
        },
        success: {
            main: green[0],
        },
        warning: {
            main: yellow[0],
            contrastText: white[0],
        },
        info: {
            main: blue[0],
        },
        action: {
            disabled: lightGrey[2],
            disabledBackground: lightGrey[2],
        },
    },
    typography: {
        fontFamily: `
            Montserrat,
            Chinese Quote,
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            PingFang SC,
            Hiragino Sans GB,
            Microsoft YaHei,
            Helvetica Neue,
            Helvetica,
            Arial,
            sans-serif,
            Apple Color Emoji,
            Segoe UI Emoji,
            Segoe UI Symbol`,
        fontWeightBold: 600,
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        // Font Weight:
        // 100 - Thin
        // 200 - Extra Light
        // 300 - Light
        // 400 - Regular
        // 500 - Medium
        // 600 - Semi Bold
        // 700 - Bold
        // 800 - Extra Bold
        // 900 - Black (Heavy)
        MuiTypography: {
            styleOverrides: {
                root: ({ theme }) => ({
                    fontSize: '14px',
                    fontWeight: theme.typography.fontWeightRegular,
                    lineHeight: '20px',
                }),
                body1: ({ theme }) => ({
                    fontSize: '14px',
                    fontWeight: theme.typography.fontWeightRegular,
                    color: 'inherit',
                    lineHeight: '20px',
                }),
                body2: ({ theme }) => ({
                    fontSize: '14px',
                    fontWeight: theme.typography.fontWeightRegular,
                    lineHeight: '20px',
                    color: darkGrey[2],
                }),
                h5: ({ theme }) => ({
                    fontSize: '24px',
                    fontWeight: theme.typography.fontWeightBold,
                    lineHeight: '34px',
                    color: theme.palette.text.primary,
                }),
                h6: ({ theme }) => ({
                    fontSize: '20px',
                    fontWeight: theme.typography.fontWeightBold,
                    lineHeight: '28px',
                    color: theme.palette.text.secondary,
                }),
                subtitle2: ({ theme }) => ({
                    fontSize: '14px',
                    fontWeight: theme.typography.fontWeightBold,
                    lineHeight: '28px',
                    color: theme.palette.text.secondary,
                }),
                button: ({ theme }) => ({
                    fontSize: '14px',
                    cursor: 'pointer',
                    color: theme.palette.primary.main,
                    fontWeight: theme.typography.fontWeightBold,
                    textTransform: 'none',
                }),
                caption: ({ theme }) => ({
                    fontSize: '12px',
                    color: darkGrey[2],
                    fontWeight: theme.typography.fontWeightRegular,
                    lineHeight: '17px',
                }),
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    height: '36px',
                    boxShadow: 'none',
                    textTransform: 'initial',
                    padding: theme.spacing(1, 2),
                    wordBreak: 'keep-all',
                }),
            },
            variants: [
                {
                    props: {
                        variant: 'text',
                    },
                    style: ({ theme }) => ({
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.dark, 0.1),
                        },
                        padding: theme.spacing(1, 2),
                        minWidth: 'auto',
                    }),
                },
                {
                    props: {
                        variant: 'text',
                        disableRipple: true,
                    },
                    style: () => ({
                        '&:hover': {
                            background: 'none',
                        },
                        padding: 0,
                        minWidth: 'auto',
                    }),
                },
                {
                    props: {
                        variant: 'text', color: 'secondary',
                    },
                    style: ({ theme }) => ({
                        '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.dark, 0.1),
                        },
                    }),
                },
                {
                    props: {
                        variant: 'contained',
                    },
                    style: ({ theme }) => ({
                        '&:hover': {
                            background: theme.palette.primary.dark,
                            boxShadow: toButtonShadow(theme.palette.primary.main),
                        },
                        '&:disabled': {
                            color: theme.palette.primary.contrastText,
                        },
                    }),
                },
                {
                    props: {
                        variant: 'contained', color: 'secondary',
                    },
                    style: ({ theme }) => ({
                        '&:hover': {
                            background: theme.palette.secondary.dark,
                            boxShadow: toButtonShadow(theme.palette.secondary.main),
                        },
                    }),
                },
                {
                    props: {
                        variant: 'contained', color: 'warning',
                    },
                    style: ({ theme }) => ({
                        color: theme.palette.warning.contrastText,
                        '&:hover': {
                            background: theme.palette.warning.main,
                            boxShadow: toButtonShadow(theme.palette.warning.main),
                        },
                    }),
                },
                {
                    props: {
                        variant: 'outlined',
                    },
                    style: ({ theme }) => (
                        {
                            border: `1px solid ${theme.palette.primary.main}`,
                            '&:hover': {
                                backgroundColor: 'transparent',
                                boxShadow: toButtonShadow(theme.palette.primary.main),
                            },
                        }
                    ),
                },
                {
                    props: {
                        variant: 'outlined',
                        color: 'error',
                    },
                    style: ({ theme }) => ({
                        border: `1px solid ${theme.palette.error.main}`,
                        '&:hover': {
                            backgroundColor: 'transparent',
                            boxShadow: toButtonShadow(theme.palette.error.main, 0.5),
                        },
                    }),
                },
                {
                    props: {
                        variant: 'outlined',
                        color: 'inherit',
                    },
                    style: ({
                        border: `1px solid ${lightGrey[0]}`,
                        '&:hover': {
                            boxShadow: toButtonShadow(darkGrey[4], 0.24),
                        },
                    }),
                },
                {
                    props: {
                        size: 'small',
                    },
                    style: (({ theme }) => ({
                        height: '28px',
                        boxShadow: 'none',
                        textTransform: 'initial',
                        padding: theme.spacing(0.75, 1.5),
                        fontSize: '12px',
                        lineHeight: '16px',
                    })),
                },
            ],
        },
        MuiAutocomplete: {
            defaultProps: {
                popupIcon: createElement(ExpandMoreOutlinedIcon),
            },
            styleOverrides: {
                inputRoot: {
                    '& .MuiOutlinedInput-input': {
                        height: '15px',
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                    fontSize: theme.typography.fontSize,
                    fontFamily: 'Montserrat',
                    fontWeight: theme.typography.fontWeightRegular,
                }),
            },
        },
        MuiSelect: {
            defaultProps: {
                IconComponent: ExpandMoreOutlinedIcon,
            },
            styleOverrides: {
                outlined: ({ theme }) => ({
                    '&.MuiInputBase-input.MuiOutlinedInput-input': {
                        minHeight: '48px',
                        lineHeight: '20px',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'hidden',
                        fontSize: '14px',
                        color: theme.palette.text.primary,
                        '&.MuiInputBase-inputSizeSmall': {
                            minHeight: '32px',
                        },
                    },
                }),
            },
        },
        // Check here for more help: https://github.com/mui/material-ui/issues/13347#issuecomment-1025735645
        MuiOutlinedInput: {
            variants: [
                {
                    props: {
                        multiline: true,
                    },
                    style: {
                        '& .MuiInputBase-input': {
                            padding: 0,
                        },
                    },
                },
                {
                    props: {
                        size: 'small',
                    },
                    style: ({ theme }) => ({
                        '& .MuiInputBase-input': {
                            height: '32px',
                            padding: theme.spacing(0, 2),
                        },
                    }),
                },
                {
                    props: {
                        disabled: true,
                    },
                    style: {
                        '& .MuiInputBase-input': {
                            '&:hover': {
                                cursor: 'not-allowed',
                            },
                        },
                    },
                },
            ],
            styleOverrides: {
                root: ({ theme }) => ({
                    '& fieldset': {
                        borderColor: `${lightGrey[0]}`,
                    },
                    '&:hover fieldset': {
                        borderColor: `${lightGrey[1]}`,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: `${lightGrey[1]}`,
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: `${theme.palette.primary.main}`,
                    },
                    '&.Mui-focused:hover fieldset': {
                        borderColor: `${theme.palette.primary.main}`,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderWidth: '1px',
                    },
                    '& .MuiInputBase-input': {
                        height: '48px',
                        padding: theme.spacing(0, 2),
                    },
                    // The border color cannot be set correctly when there are other states
                    '&.Mui-error fieldset': {
                        borderColor: `${theme.palette.error.main} !important`,
                    },
                    // Should be same as shrink label font size
                    '& legend span': {
                        fontSize: '12px',
                    },
                }),
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    top: '-4px',
                    fontSize: '14px',
                    fontWeight: theme.typography.fontWeightRegular,
                    color: theme.palette.text.disabled,
                    transform: 'translate(16px, 18px) scale(1)',
                    '&.MuiInputLabel-sizeSmall': {
                        top: '-12px',
                        transform: 'translate(16px, 18px) scale(1)',
                    },
                }),
                shrink: {
                    fontSize: '12px',
                    transform: 'translate(16px, -4px) scale(0.86)',
                    '&.MuiInputLabel-sizeSmall': {
                        transform: 'translate(16px, 2px) scale(0.86)',
                    },
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: ({ theme }) => ({
                    fontSize: '12px',
                    height: '15px',
                    lineHeight: '15px',
                    marginTop: theme.spacing(1),
                }),
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    minWidth: 0,
                    fontSize: '14px',
                    textTransform: 'initial',
                    paddingLeft: 0,
                    paddingRight: 0,
                    marginRight: '40px',
                    '&:last-child': {
                        marginRight: 0,
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: darkGrey[2],
                    // Otherwise it cannot be aligned
                    marginLeft: '1px',
                    '& .MuiSvgIcon-root': {
                        fontSize: '14px',
                    },
                },
            },
        },
        MuiRadio: {
            styleOverrides: {
                root: ({
                    color: darkGrey[4],
                    '& .MuiSvgIcon-root': {
                        fontSize: '16px',
                    },
                }),
            },
        },
        MuiChip: {
            styleOverrides: {
                root: ({ theme }) => ({
                    padding: theme.spacing(0.75, 1),
                    color: theme.palette.text.secondary,
                    fontSize: '14px',
                    fontWeight: theme.typography.fontWeightRegular,
                    borderRadius: '4px',
                    backgroundColor:
                        theme.palette.mode === 'light'
                            ? lightGrey[7] : darkGrey[7],
                    '.MuiChip-label': {
                        padding: 0,
                    },
                }),
                deleteIcon: ({ theme }) => ({
                    fontSize: '12px',
                    margin: theme.spacing(0, 0, 0, 0.5),
                }),
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: () => ({
                    borderColor: lightGrey[0],
                }),
            },
        },
        MuiPagination: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '& button': {
                        color: darkGrey[2],
                        fontWeight: theme.typography.fontWeightBold,
                    },
                    '& button:hover, & .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.primary.main,
                    },
                    '& .MuiPaginationItem-root.Mui-selected:hover': {
                        backgroundColor: theme.palette.background.paper,
                    },
                }),
            },
        },
        MuiPopover: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '& .MuiPopover-paper': {
                        border: `1px solid ${lightGrey[0]}`,
                        boxShadow: `0 8px 40px 8px ${alpha(darkGrey[4], 0.16)}`,
                        borderRadius: '12px',
                        padding: theme.spacing(2, 2),
                    },
                }),
            },
        },
        MuiListItemButton: {
            defaultProps: {
                disableRipple: true,
            },
        },
    },
})

export default finalTheme
