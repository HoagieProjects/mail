import '@/lib/hoagie-ui/theme.css'
import '@/app/mail.css'
import '@/app/quill.snow.css';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import { Metadata } from 'next';
import { ReactNode } from 'react';
import Content from '@/app/Content';

export const metadata: Metadata = {
    title: 'Mail by Hoagie'
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang='en'>
            <UserProvider>
                <body>
                    <Content>{children}</Content>
                </body>
            </UserProvider>
        </html>
    );
}
