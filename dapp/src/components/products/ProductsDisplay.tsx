import Image from "next/image";
import { IProducts } from "./interface";
import { space, work } from "../Font";
import { useRouter } from "next/navigation";

const ProductsDIsplay: React.FC<{tabContents: any[]}> = ({tabContents}) => {
    const router = useRouter();
    return(
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {tabContents.map((product, index) => (
                <div key={index} className="bg-[#2B2B2B] rounded-xl pb-5 shadow-md hover:scale-105 transition-transform cursor-pointer" onClick={()=> router.push(`/products/${product.itemId}`)}>
                    {/* Product Image */}
                    <div className="overflow-hidden rounded-tl-xl rounded-tr-xl mb-4">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="object-cover rounded-tl-xl rounded-tr-xl w-full h-[300px]"
                    />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col justify-between gap-5">
                            <div className="text-white px-5">
                                <h3 className={`text-lg font-bold text-left ${work.className}`}>{product.name}</h3>
                                <p className={`text-sm text-gray-400 text-left ${space.className}`}>{product.isForSale ? "For Sale": "Not For Sale"}</p>
                            </div>

                            {/* Price Info */}
                            <div className="mt-4 text-gray-300 px-5 flex flex-row justify-between  gap-3">
                                <p className="flex flex-col">
                                    <strong className={`text-gray-400 text-sm text-left ${space.className}`}>Price</strong> <span className={`text-lg ${space.className}`}>{product.price}</span>
                                </p>
                                <p className="flex flex-col">
                                    <strong className={`text-gray-400 text-sm text-right ${space.className}`}>Highest Bid</strong> <span className={`text-lg ${space.className}`}>{product.highestBid}</span>
                                </p>
                            </div>
                    </div>
                </div>
                ))}
            </div>
    )
}

export default ProductsDIsplay;