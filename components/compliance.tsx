/// Redirect to https://app.getdelve.com/celest
export default function Compliance() {
    return (
        <>
            <script dangerouslySetInnerHTML={{__html: `
                window.location.href = "https://app.getdelve.com/celest";
            `}} />
        </>
    )
}