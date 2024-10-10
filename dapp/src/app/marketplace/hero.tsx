import {SearchIcon} from "lucide-react"

const MarketPlaceHero: React.FC = () => {
    return(
        <section className="bg-[#042B2B] w-full flex flex-col py-[50px] px-[50px]">
            <div className="flex flex-col gap-3">
                <h1 className="text-white font-bold text-5xl">Browse Marketplace</h1>
                <p className="text-gray-400 font-normal text-[18px] pb-5">Browse through more than 50k Agro-products on the Agrobase Marketplace.</p>

                {/* Search Bar */}
                <div className="relative w-full max-w-2xl">
                    <input
                    type="text"
                    placeholder="Search your favourite Agro Products"
                    className="w-full py-4 pl-6 pr-14 text-gray-300 bg-[#1E403B] rounded-[20px] border-none focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    {/* Search Icon */}
                    <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                    <SearchIcon size={20} />
                    </button>
                </div>
            </div>
        </section>
    )
}

export default MarketPlaceHero;