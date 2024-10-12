import { IProducts } from "@/components/products/interface";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.png";
import img3 from "../../assets/img3.png";
import img4 from "../../assets/img4.png";

export const products: IProducts[] = [
  {
    id: 1,
    name: "Cocoa Bulk",
    location: "Nigeria",
    image: img1.src,
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 2,
    name: "Green Pea",
    location: "Zambia",
    image: img2.src,
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 3,
    name: "Eve Apple",
    location: "BeKind2Robots",
    image: img3.src,
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 4,
    name: "Health Tangerine",
    location: "UAE",
    image: img4.src,
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 5,
    name: "Green Pea",
    location: "Zambia",
    image: img2.src,
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 6,
    name: "Eve Apple",
    location: "BeKind2Robots",
    image: img3.src,
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
];

export const campaigns = [
  {
    id: 7,
    name: "Campaign 1",
    location: "Location 1",
    image: img3.src,
    price: "2.5 ETH",
    highestBid: "0.5 wETH",
  },
];
