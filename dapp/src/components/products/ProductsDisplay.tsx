// import Image from "next/image";
import nftAbi from "@/utils/abis/nftAbi.json";
import { space, work } from "../Font";
import { useRouter } from "next/navigation";
import { useReadContract } from "wagmi";
import { useEffect, useState } from "react";
import { Image, Skeleton } from "@nextui-org/react";
import { Address } from "viem";
import Link from "next/link";

export const GetImage = ({
  nftContract,
  tokenId,
}: {
  nftContract: Address;
  tokenId: string;
}) => {
  const { data, isLoading, error } = useReadContract({
    abi: nftAbi,
    address: nftContract,
    functionName: "tokenURI",
    args: [Number(tokenId)],
  });
  console.log("Get image data", data);

  return (
    <div className="flex flex-row justify-stretch h-full min-w-full px-2">
      <Skeleton isLoaded={!isLoading} className="flex !w-full !h-full">
        <Image
          isBlurred
          src={data as string}
          alt={data as string}
          height={320}
          width={"100%"}
          className="relative grow shrink-0 object-cover w-full"
        />
      </Skeleton>
    </div>
  );
};

const ProductsDIsplay: React.FC<{
  tabContents: any[];
}> = ({ tabContents }) => {
  const router = useRouter();
  console.log(tabContents);
  const [newTabContents, setNewTabContent] = useState(tabContents);

  useEffect(() => {
    setNewTabContent(tabContents);
  }, [tabContents]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {newTabContents?.map((product, index) => (
        <Link
          key={index}
          className="bg-[#2B2B2B] rounded-xl pb-5 shadow-md hover:scale-105 transition-transform cursor-pointer"
          // onClick={() => router.push(`/products/${Number(index)}`)}
          href={`/products/${Number(index)}`}
        >
          {/* Product Image */}
          <div className="flex flex-col w-full h-[300px] overflow-hidden rounded-tl-xl rounded-tr-xl mb-4">
            <GetImage
              nftContract={product.nftContract}
              tokenId={product.tokenId}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between gap-5">
            <div className="text-white px-5">
              <h3 className={`text-lg font-bold text-left ${work.className}`}>
                {product.name}
              </h3>
              <p
                className={`text-sm text-gray-400 text-left ${space.className}`}
              >
                {product.isForSale ? "For Sale" : "Not For Sale"}
              </p>
            </div>

            {/* Price Info */}
            <div className="mt-4 text-gray-300 px-5 flex flex-row justify-between  gap-3">
              <p className="flex flex-col">
                <strong
                  className={`text-gray-400 text-sm text-left ${space.className}`}
                >
                  Price
                </strong>{" "}
                <span className={`text-lg ${space.className}`}>
                  {Number(product.price)}
                </span>
              </p>
              <p className="flex flex-col">
                <strong
                  className={`text-gray-400 text-sm text-right ${space.className}`}
                >
                  Highest Bid
                </strong>{" "}
                <span className={`text-lg ${space.className}`}>
                  {product.highestBid}
                </span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductsDIsplay;
