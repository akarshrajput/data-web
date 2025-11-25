import "./globals.css";

export const metadata = {
  title: "Data Marketplace",
  description: "Buy and sell business data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
