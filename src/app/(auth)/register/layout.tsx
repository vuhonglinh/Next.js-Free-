export default function RegisterLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <h1>Login layout</h1>
            {children}
        </main>
    );
}
