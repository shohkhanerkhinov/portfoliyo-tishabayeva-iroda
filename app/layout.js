import "./globals.css";

export const metadata = {
  title: "Prof. Tishaboyeva Irodaxon — University Professor | Academic Portfolio",
  description: "Official academic portfolio of Professor Tishaboyeva Irodaxon — University Professor specializing in pedagogy, scientific methodology, and higher education research.",
  keywords: "Tishaboyeva Irodaxon, University Professor, Pedagogy, Higher Education, Fergana, Academic Portfolio",
  openGraph: {
    title: "Prof. Tishaboyeva Irodaxon",
    description: "Academic portfolio of Professor Tishaboyeva Irodaxon",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">{children}</body>
    </html>
  );
}
