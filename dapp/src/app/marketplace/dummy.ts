import { IProducts } from "@/components/products/interface";
import img1 from "../../../assets/img1.jpg";
import img2 from "../../../assets/img2.jpg";
import img3 from "../../../assets/img3.jpg";
import img4 from "../../../assets/img4.jpg";

export const products: IProducts[] = [
  {
    name: "Cashew Nuts",
    location: "Cameroon",
    image: img1.src,
    ethPrice: "1.5 ETH",
    usdPrice: "$2045.12",
    floorPrice: "Floor Price",
    change: "-12.45%",
    isPositive: false,
  },
  {
    name: "Cocoa",
    location: "Nigeria",
    image: img2.src,
    ethPrice: "2.53 ETH",
    usdPrice: "$4487",
    floorPrice: "Floor Price",
    change: "+34.5%",
    isPositive: true,
  },
  {
    name: "Date",
    location: "Rwanda",
    image: img3.src,
    ethPrice: "1.31 ETH",
    usdPrice: "$1743.4",
    floorPrice: "Floor Price",
    change: "-5.5%",
    isPositive: false,
  },
  {
    name: "Pea",
    location: "Nairobi",
    image: img4.src,
    ethPrice: "1.156 ETH",
    usdPrice: "$1670",
    floorPrice: "Floor Price",
    change: "+12.45%",
    isPositive: true,
  },
];
