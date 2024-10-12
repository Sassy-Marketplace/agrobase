import {
  Space_Grotesk as SpaceGrotesk,
  Abhaya_Libre as Abhaya,
} from "next/font/google";

export const fontGrotesk = SpaceGrotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const libre = Abhaya({
  subsets: ["sinhala", "latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});
