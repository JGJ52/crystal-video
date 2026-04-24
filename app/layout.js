import {Fredoka, Poppins, Rubik} from "next/font/google";
import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'

const poppins = Poppins({
  variable: "--poppins",
  weight: ["400"],
  subsets: ["latin"],
});

const fredoka = Fredoka({
    variable: "--fredoka",
    weight: ["400"],
    subsets: ["latin"],
});

const rubik = Rubik({
    variable: "--rubik",
    weight: ["400"],
    subsets: ["latin"],
})

export const metadata = {
  title: "Crystal",
  description: "A video player",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${fredoka.variable} ${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
