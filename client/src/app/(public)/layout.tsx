import '../../styles/globals.css';
import Footer from '../../components/layout/Footer';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main>{children}</main>
            <Footer />
        </>
    );
}
