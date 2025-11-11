// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pet Care Planner",
    description: "App de doações para pets",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
        <body>
        <div className="phone-frame">
            {children}
        </div>
        </body>
        </html>
    );
}
