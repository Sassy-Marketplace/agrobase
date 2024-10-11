import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Basenames } from "./basenames";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import AfroBaseLogo from "@/assets/logo.svg";
import Image from "next/image";

export default function App() {
  const { address } = useAccount();
  const account = useAccount();
  return address ? (
    <Navbar className="bg-transparent">
      <NavbarBrand>
        <Image src={AfroBaseLogo} alt="logo" />
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Marketplace
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            My Profile
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Campaigns
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {!address && <ConnectWallet />}
          {account.status === "connected" && (
            <Basenames address={account.addresses?.[0]} />
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  ) : (
    <Navbar className="bg-[transparent]">
      <NavbarBrand>
        <Image src={AfroBaseLogo} alt="" />
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Blog
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Whitepaper
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button className="bg-[#ffffff] text-black rounded-full">
            Go to App
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
