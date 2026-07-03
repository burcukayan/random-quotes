import { Playfair_Display, Inter } from "next/font/google";
import { QuotesContextProvider } from "@/app/QuotesContext";
import { TopNav } from "@/app/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata = {
  title: "Random Quotes Application",
  description: "Random Quotes Application 200825",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QuotesContextProvider>
            <TopNav />
            {children}
          </QuotesContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
