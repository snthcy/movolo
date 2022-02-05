import Nav from './Nav';
import Head from 'next/head';

export default function Layout({ children }) {
    return (
        <>
            <Nav />
            <div className="grid h-screen place-items-center">
                <Head>
                    <title>gawk gawk</title>
                </Head>
                {children}
            </div>
        </>
    );
};