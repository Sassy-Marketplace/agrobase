"use client";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/react";
import { Basenames } from "./basenames";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";
import AfroBaseLogo from "@/assets/logo.svg";
import Image from "next/image";
import { lato, mont, work } from "./Font";
import { usePathname } from "next/navigation"; // Import usePathname hook
import { useState } from "react";

export default function NavBar() {
  const { address } = useAccount();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const account = useAccount();
  const pathname = usePathname(); // Get the current path

  // Function to check if a page is active
  const isActive = (path: string) => pathname === path;
  // return (
  return address ? (
    <NextUINavbar
      maxWidth="full"
      className="bg-transparent"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand as={Link} href={`/`}>
        <Image src={AfroBaseLogo} alt="logo" />
      </NavbarBrand>
      <NavbarContent
        className={`hidden md:flex md:flex-row font-semibold text-sm gap-12 ${work.className}`}
        justify="center"
      ></NavbarContent>

      <NavbarContent justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarContent justify="end" className="hidden sm:flex">
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
        <NavbarItem
          className={`font-semibold text-sm text-[#000000] bg-[#03ed0e] rounded-full ${lato.className}`}
        >
          <div>
            {!address && <ConnectWallet />}
            {account.status === "connected" && (
              <Basenames address={account.addresses?.[0]} />
            )}
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            color="foreground"
            href="/marketplace"
            className={isActive("/marketplace") ? "text-[#03ed0e]" : ""}
          >
            Marketplace
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            color="foreground"
            href="/communities"
            className={isActive("/communities") ? "text-[#03ed0e]" : ""}
          >
            Communities
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            color="foreground"
            href="/profile"
            aria-current={isActive("/profile") ? "page" : undefined}
            className={isActive("/profile") ? "text-[#03ed0e]" : ""}
          >
            My Profile
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            color="foreground"
            href="/campaigns"
            className={isActive("/campaigns") ? "text-[#03ed0e]" : ""}
          >
            Campaigns
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem
          className={`font-semibold text-sm text-[#000000] bg-[#03ed0e] rounded-full ${lato.className}`}
        >
          {!address && <ConnectWallet />}
          {account.status === "connected" && (
            <Basenames address={account.addresses?.[0]} />
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  ) : (
    <NextUINavbar onMenuOpenChange={setIsMenuOpen} className="bg-[transparent]">
      <NavbarBrand as={Link} href={`/`}>
        <Image src={AfroBaseLogo} alt="logo" />
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-12" justify="center">
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
            href="https://mirror.xyz/0x5429e1Aa676abAD79e67a038dBA8B5Ab00af2054"
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
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className={`font-light text-[#ffffff] text-sm ${mont.className} ${
              isActive("/") ? "bg-[#2c2c2c] p-1 rounded-lg" : ""
            }`}
            aria-current={isActive("/") ? "page" : undefined}
            href="/"
          >
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href="https://mirror.xyz/0x5429e1Aa676abAD79e67a038dBA8B5Ab00af2054"
            className={`font-light text-[#ffffff] text-sm ${mont.className} ${
              isActive("/blog") ? "bg-[#2c2c2c] p-1 rounded-lg" : ""
            }`}
          >
            Blog
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            href="/whitepaper"
            className={`font-light text-[#ffffff] text-sm ${mont.className} ${
              isActive("/whitepaper") ? "bg-[#2c2c2c] p-1 rounded-lg" : ""
            }`}
          >
            Whitepaper
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </NextUINavbar>
  );
}
