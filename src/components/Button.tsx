import { ReactNode } from "react"

type ButtonProps = {
    text: string
    handleClick: () => void
    styles: string
    btnType?: "button" | "submit" | "reset" | undefined
    children?: ReactNode
}

const Button = ({ text, handleClick, styles, btnType="button", children }: ButtonProps) => {
    return (
        <button
            className={styles}
            onClick={handleClick}
            type={btnType}
        >
            {text}
            {children}
        </button>
    )
}

export default Button