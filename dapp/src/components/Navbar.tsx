"use client";
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
import { lato, mont, work } from "./Font";
import { usePathname } from "next/navigation"; // Import usePathname hook

export default function NavBar() {
  const { address } = useAccount();
  const account = useAccount();
  const pathname = usePathname(); // Get the current path

  // Function to check if a page is active
  const isActive = (path: string) => pathname === path;

  return address ? (
    <Navbar className="bg-transparent w-full flex justify-between">
      <NavbarBrand as={Link} href={`/`}>
        <Image src={AfroBaseLogo} alt="logo" />
      </NavbarBrand>
      <div className="flex items-center justify-between w-1/2 gap-12">
        <NavbarContent
          className={`flex md:flex-row font-semibold text-sm gap-12 ${work.className}`}
        >
          <NavbarItem>
            <Link
              color="foreground"
              href="/marketplace"
              className={isActive("/marketplace") ? "text-[#03ed0e]" : ""}
            >
              Marketplace
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="/communities"
              className={isActive("/communities") ? "text-[#03ed0e]" : ""}
            >
              Communities
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="/profile"
              aria-current={isActive("/profile") ? "page" : undefined}
              className={isActive("/profile") ? "text-[#03ed0e]" : ""}
            >
              My Profile
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              color="foreground"
              href="/campaigns"
              className={isActive("/campaigns") ? "text-[#03ed0e]" : ""}
            >
              Campaigns
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent>
          <NavbarItem
            className={`font-semibold text-sm text-[#000000] bg-[#03ed0e] rounded-full ${lato.className}`}
          >
            {!address && <ConnectWallet />}
            {account.status === "connected" && (
              <Basenames address={account.addresses?.[0]} />
            )}
          </NavbarItem>
        </NavbarContent>
      </div>
    </Navbar>
  ) : (
    <Navbar className="bg-[transparent]">
      <NavbarBrand as={Link} href={`/`}>
        <Image src={AfroBaseLogo} alt="logo" />
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-12" justify="center">
        <NavbarItem>
          <Link
            className={`font-light text-[#ffffff] text-sm ${mont.className} ${
              isActive("/") ? "bg-[#2c2c2c] p-1 rounded-lg" : ""
            }`}
            aria-current={isActive("/") ? "page" : undefined}
            href="/"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/blog"
            className={`font-light text-[#ffffff] text-sm ${mont.className} ${
              isActive("/blog") ? "bg-[#2c2c2c] p-1 rounded-lg" : ""
            }`}
          >
            Blog
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/whitepaper"
            className={`font-light text-[#ffffff] text-sm ${mont.className} ${
              isActive("/whitepaper") ? "bg-[#2c2c2c] p-1 rounded-lg" : ""
            }`}
          >
            Whitepaper
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            href="/connect-wallet"
            variant="flat"
            className="bg-[#ffffff] text-black rounded-full font-light text-sm py-1 px-8"
          >
            Go to App
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
