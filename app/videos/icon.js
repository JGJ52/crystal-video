import "./icon.css";

export default function Icon({ children }) {
    return (
        <>
            <div className={"centerer"}>
                <div className={"icon"}>
                    {children}
                </div>
            </div>
        </>
    )
}