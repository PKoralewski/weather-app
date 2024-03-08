import { keyframes } from "@emotion/react"

export const pulse = keyframes`
    from {
        transform: scale(1);
        opacity: .5;
    }
    to {
        transform: scale(1.6);
        opacity: 0;
    }
`
