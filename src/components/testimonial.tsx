import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface Props {
  name: string;
  quote: string;
  image: string;
}

export default function Testimonial({ name, quote, image }: Props) {
  return (
    <div className="relative flex min-h-64 flex-1 flex-col justify-between rounded-xl bg-lightBlack p-4">
      <div className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-3xl text-lightBlack">
        <FontAwesomeIcon icon={faQuoteLeft} />
      </div>
      <div className="absolute -bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white text-3xl text-lightBlack">
        <FontAwesomeIcon icon={faQuoteRight} />
      </div>

      <Image
        src={`/testimonials/${image}`}
        className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-full"
        alt="Nerds"
        height={96}
        width={96}
      />

      <p className="mt-[15%] text-center">{quote}</p>
      <h3> - {name}</h3>
    </div>
  );
}
