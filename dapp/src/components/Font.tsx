import {
  Space_Grotesk as SpaceGrotesk,
  Abhaya_Libre as Abhaya,
  Lato,
  Work_Sans,
  Space_Mono,
} from "next/font/google";

export const fontGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const libre = Abhaya({
  subsets: ["sinhala", "latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "100", "300", "900"],
});

export const work = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "100", "300", "900"],
});

export const space = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
});
