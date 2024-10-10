import Image from "next/image";
import { IProducts } from "./interface";

const ProductsDIsplay: React.FC<{products: IProducts[]}> = ({products}) => {
  return (
    <section className="flex justify-center items-center gap-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-opacity-10 border border-gray-400 rounded-xl p-4 shadow-md hover:scale-105 transition-transform"
            style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}
          >
            {/* Product Image */}
            <div className="overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="object-cover rounded-lg w-[300px] h-[200px]"
              />
            </div>

            {/* Product Name and Location */}
            <div className="mt-4 text-white">
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-400">{product.location}</p>
            </div>

            {/* Pricing Info */}
            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-lg font-semibold text-white">{product.ethPrice}</p>
                <p className="text-sm text-gray-400">{product.floorPrice}</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{product.usdPrice}</p>
                <p className={`text-sm ${product.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {product.change}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsDIsplay;