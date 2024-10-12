"use client"

import { Button } from "@nextui-org/react";
import { useState } from "react";

const TruncatedText: React.FC<{text: string; maxlength: number}> = ({text, maxlength}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return(
        <div className="relative">
            <p className="text-left text-white mb-6">
                {isExpanded ? text : `${text.substring(0, maxlength)} ...`}
            </p>
            
            <Button onClick={toggleExpand} className="text-white text-center bg-[#2B2B2B] px-5 py-3 cursor-pointer rounded-[1.8rem]">{isExpanded? 'Show Less' : 'Show More'}</Button>

        </div>
    )
}

export default TruncatedText;