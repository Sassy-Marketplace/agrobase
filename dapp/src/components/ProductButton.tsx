import { Button } from "@nextui-org/react"
import { ArrowRightIcon } from "lucide-react"

const ProductButton : React.FC<{text: string, event: any}> = ({text, event}) => {
    return(
        <>
            <Button className="px-[3rem] py-[1.7rem] rounded-[0.9rem] border-[2px] border-[#03ED0E] mb-[5rem] md:mb-0" onClick={event}>
                <ArrowRightIcon className="text-[#A259FF]"/>
                <span className="text-[1.1rem] text-white">{text}</span>
            </Button>
        </>
    )
}

export default ProductButton;