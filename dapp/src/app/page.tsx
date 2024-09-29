import { useAccount } from "wagmi";
import { Basenames } from "../components/basenames";

export default async function Page() {
  const { address } = useAccount();
  const account = useAccount();

  return (
    <div className="flex h-full w-96 max-w-full flex-col px-1 md:w-[1008px]">
      <section className="mb-6 mt-6 flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-row items-center justify-between gap-2 md:gap-0">
          <a href="/" title="Supercool App" target="_blank" rel="noreferrer">
            <h1 className="text-xl font-normal not-italic tracking-[-1.2px] text-indigo-600">
              Supercool App
            </h1>
          </a>
          <div className="flex items-center gap-3">
            {/* {!address && <ConnectWallet />} Connect wallet button */}
            {account.status === "connected" && (
              <div>
                <Basenames address={account.addresses?.[0]} />
              </div>
            )}
            {/* <h1>{result}</h1> */}
          </div>
        </div>
      </section>
      <section className="templateSection flex w-full flex-col items-center justify-center gap-4 rounded-xl bg-gray-100 px-2 py-4 md:grow"></section>
      {/* <Footer /> */}
    </div>
  );
}
