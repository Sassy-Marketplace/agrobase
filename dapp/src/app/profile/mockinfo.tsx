import { Cards, Details } from "./interface";
import product1 from "@/assets/products/Image.svg";
import product2 from "@/assets/products/Image-1.svg";
import product3 from "@/assets/products/Image-2.svg";
import product4 from "@/assets/products/Image-3.svg";
import product6 from "@/assets/products/Image Placeholder-1.svg";
import product7 from "@/assets/products/Image Placeholder-2.svg";
import product8 from "@/assets/products/Image Placeholder-3.svg";
import product9 from "@/assets/products/Image Placeholder-4.svg";
import product5 from "@/assets/products/Image Placeholder.svg";
import icon1 from "@/assets/avatarprofile/Avatar.svg";
import icon2 from "@/assets/avatarprofile/Avatar-1.svg";
import icon3 from "@/assets/avatarprofile/Avatar-2.svg";
import icon4 from "@/assets/avatarprofile/Avatar-3.svg";
import icon5 from "@/assets/avatarprofile/Avatar-4.svg";
import icon6 from "@/assets/avatarprofile/Avatar-5.svg";
import icon7 from "@/assets/avatarprofile/Avatar-6.svg";
import icon8 from "@/assets/avatarprofile/Avatar-7.svg";
import icon9 from "@/assets/avatarprofile/Avatar-8.svg";

export const profileDetails: Details[] = [
  {
    business: "Musa Cocoa Farm",
    location: "Nigeria",
    description:
      "Cocoa Universe is a collection of 10,000 unique NFTs on the Ethereum blockchain, transforming the cocoa farming industry into a decentralized agro-based ecosystem.In this digital realm, there are many types of agricultural beings, but the most advanced and fruitful of them all are the Cocoa Farmers. They cultivate their valuable cocoa beans in fertile lands, weaving blockchain technology with traditional farming techniques to create sustainable and fair trade practices.These Cocoa Farmers are the guardians of their land, nurturing every seed with care. However, their peaceful existence is threatened by the forces of Unsustainable Practices, represented as the Invaders. These invaders seek to dominate the cocoa trade with unfair methods, using pesticides and non-transparent pricing that exploit both the farmers and the environment.The Unsustainable Practices, known as Market Manipulators, believe that they can gain control of the cocoa supply chain if they can infiltrate the decentralized networks of the Cocoa Farmers. To achieve this, they aim to compromise the transparency and traceability of the supply, undermining the value of fair and ethically produced cocoa.In this battle for a sustainable future, each Cocoa Universe NFT not only represents a piece of digital art but also stands as a token of support for regenerative agriculture, fostering a transparent and eco-friendly cocoa industry. Join the Cocoa Farmers in their fight to protect the planet and taste the difference in every bean.",
    tags: {
      one: "CROPS",
      two: "COCOA",
      three: "CASH CROP",
      four: "BULK",
    },
    name: "MUSA ALIYU",
    type: "Business Account",
  },
];

export const products: Cards[] = [
  { icon: icon1, src: product5, name: "Cocoa Bulk", location: "Nigeria" },
  { icon: icon2, src: product6, name: "Green Pea", location: "Zambia" },
  { icon: icon3, src: product1, name: "Eve Apple", location: "BeKind2Robots" },
  { icon: icon4, src: product2, name: "Health Tangerine", location: "UAE" },
  { icon: icon5, src: product3, name: "Colorful Date", location: "Keepitreal" },
  { icon: icon6, src: product7, name: "Banana ETH", location: "Ongo" },
  {
    icon: icon7,
    src: product4,
    name: "Desert Walk Shop",
    location: "Nugu Nigeria",
  },
  {
    icon: icon8,
    src: product8,
    name: "Kazim Cattle Ranch",
    location: "Kaduna Nigeria",
  },
  {
    icon: icon9,
    src: product9,
    name: "Olonto Pig Farm",
    location: "PuppyPower",
  },
];
