
type ButtonProps = {
    text: string
    handleClick: () => void
    styles: string
    btnType: "button" | "submit" | "reset" | undefined
}

const Button = ({ text, handleClick, styles, btnType="button" }: ButtonProps) => {
    return (
        <button
            className={styles}
            onClick={handleClick}
            type={btnType}
        >{text}</button>
    )
}

export default Button