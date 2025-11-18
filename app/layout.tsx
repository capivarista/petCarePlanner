// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pet Care Planner - Doe e Ajude Pets",
    description: "App de doações para ONGs e resgates de animais",
    keywords: "pets, doações, animais, ONG, resgate",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        </head>
        <body>
        <div className="phone-frame">
            {children}
        </div>
        </body>
        </html>
    );
}