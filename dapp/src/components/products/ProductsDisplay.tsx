import Image from "next/image";
import { IProducts } from "./interface";

const ProductsDIsplay: React.FC<{tabContents: IProducts[]}> = ({tabContents}) => {
    return(
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mt-10">
                {tabContents.map((product, index) => (
                <div key={index} className="bg-[#2B2B2B] rounded-xl pb-5 shadow-md hover:scale-105 transition-transform">
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
                                <h3 className="text-lg font-bold text-left">{product.name}</h3>
                                <p className="text-sm text-gray-400 text-left">{product.location}</p>
                            </div>

                            {/* Price Info */}
                            <div className="mt-4 text-gray-300 px-5 flex flex-row justify-between  gap-3">
                                <p className="flex flex-col">
                                    <strong className="text-gray-400 text-sm text-left">Price</strong> <span className="text-lg">{product.price}</span>
                                </p>
                                <p className="flex flex-col">
                                    <strong className="text-gray-400 text-sm text-right">Highest Bid</strong> <span className="text-lg">{product.highestBid}</span>
                                </p>
                            </div>
                    </div>
                </div>
                ))}
            </div>
    )
}

export default ProductsDIsplay;