import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  name: string;
  quote: string;
  image: string;
}

export default function Testimonial({ name, quote, image }: Props) {
  return (
    <div>
      <div></div>
      <div></div>

      <Avatar>
        <AvatarImage src={`/testimonials/${image}`} alt="@shadcn" sizes="" />
        <AvatarFallback>{name}</AvatarFallback>
      </Avatar>

      <p>{quote}</p>
      <h3> - {name}</h3>
    </div>
  );
}
