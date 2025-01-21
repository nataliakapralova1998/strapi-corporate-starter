import Image from "next/image";
import Container from "./atoms/Container";
import Row from "./atoms/Row";

interface TextImageProps {
  data: {
    title: string;
    text: string; // This is rich text
    image: {
      data: {
        id: string;
        attributes: {
          url: string;
          name: string;
          alternativeText: string;
        };
      };
    };
    textLeft: boolean;
  };

  imgUrl: string;
}

export default function TextImage({ data }: TextImageProps) {
  console.log(data);
  return (
    <section>
      <Container>
        <Row>
          <div className="col-span-full lg:col-span-6">text </div>
          <div className="col-span-full lg:col-span-6">image </div>
        </Row>
      </Container>
    </section>
  );
}
