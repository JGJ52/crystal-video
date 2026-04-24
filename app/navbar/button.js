export default function Button({ children, onClick, href, background }) {
    if (href) return (
        <>
            <a className={background ? "nav-button nav-button-background" : "nav-button"} href={href}>
                {children}
            </a>
        </>
    )

    return (
        <>
            <button className={background ? "nav-button nav-button-background" : "nav-button"} onClick={onClick}>
                {children}
            </button>
        </>
    )
}