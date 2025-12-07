import Provider from "./provider";
import "./globals.css";

export const metadata = {
  title: "POS System",
  description: "Retail POS System",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
