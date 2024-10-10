import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";
import { Basenames } from "./basenames";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import AfroBaseLogo from "@/assets/logo.svg";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function App() {
  const { address } = useAccount();
  const account = useAccount();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return account ? (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">
            {/* <Image src={AfroBaseLogo} alt="" /> */}
            AgroBase
          </p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="sm:flex gap-4" justify="end">
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
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href={""}>Marketplace</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={""}>My Profile</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={""}>Campaigns</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  ) : (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">AGROBASE</p>
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
          <Button>Go to App</Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link href={""}>Marketplace</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={""}>My Profile</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link href={""}>Campaigns</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
