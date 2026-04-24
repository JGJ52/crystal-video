export default function Overlay({ onClick }) {
    return (
        <>
            <div onClick={onClick} className={
                "overlay w-full h-screen"
            }></div>
        </>
    )
}