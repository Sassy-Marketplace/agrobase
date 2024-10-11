import React from "react";
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBasename,
  WalletDropdownFundLink,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from "@coinbase/onchainkit/wallet";
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from "@coinbase/onchainkit/identity";
import { base, baseSepolia } from "viem/chains";

interface DisplayBasenameProps {
  address: `0x${string}` | undefined;
}

export function Basenames({ address }: DisplayBasenameProps) {
  return (
    <Wallet>
      <ConnectWallet className="px-6 py-3 bg-[#03ED0E] text-[#000] font-semibold rounded-full hover:bg-green-500 transition w-full">
        {address && (
          <>
          <Avatar address={address} chain={base} />
        <Name address={address} chain={base} />
          </>
        )}
      </ConnectWallet>
      <WalletDropdown>
        <Identity
          address={address}
          chain={base}
          schemaId="0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9"
        >
        {address && (
          <>
          <Avatar address={address} chain={base} />
        <Name address={address} chain={base} />
          </>
        )}
          <Address />
          <EthBalance />
        </Identity>
        <WalletDropdownBasename />
        <WalletDropdownLink icon="wallet" href="https://keys.coinbase.com">
          Smart Wallet Dashboard
        </WalletDropdownLink>
        <WalletDropdownFundLink />
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}
