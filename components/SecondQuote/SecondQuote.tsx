import React from "react";
import QuoteCircles from "../../public/images/svg/2nd-quote-circles.svg";
import QuoteBGBlur from "../../public/images/svg/2nd-quote-bg-blur.svg";
import Image from "next/image";

export default function SecondQuote() {
  return (
    <div className="relative mt-20 lg:mt-40">
      <div className="flex flex-col items-center justify-center">
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <div className="bg-gradient-to-b from-white to-[#000000] bg-clip-text text-2xl font-medium text-transparent lg:text-6xl">
            La simplicidad es la máxima sofisticación.
          </div>
          <div className="mt-2 text-lg font-extralight text-white/50 lg:text-2xl">
            - Leonardo Da Vinci
          </div>
        </div>
        <div className="z-5 relative">
          <Image src={QuoteCircles} alt="Quote Circles" />
        </div>
        <div className="absolute z-[1]">
          <Image src={QuoteBGBlur} alt="Quote BG Blur" />
        </div>
      </div>
    </div>
  );
}
