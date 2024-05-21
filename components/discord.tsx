/// Redirect to https://discord.gg/KtMAfSDXGQ
export default function Discord() {
    return (
        <>
            <script dangerouslySetInnerHTML={{__html: `
                window.location.href = "https://discord.gg/KtMAfSDXGQ";
            `}} />
        </>
    )
}