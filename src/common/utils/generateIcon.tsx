import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

export default function generateIcon(address: string): JSX.Element {
    return (
        <Jazzicon diameter={100} seed={jsNumberForAddress(address)} />
    )
}
