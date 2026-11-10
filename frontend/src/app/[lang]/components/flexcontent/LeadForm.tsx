import FormSubmit from "../molecules/FormSubmit";
import Container from "../atoms/Container";

interface EmailProps {
  id: string;
  __component: string;
  title: string;
  description: string;
  emailPlaceholder: string;
  submitButton: {
    text: string;
  };
}

export default function Email({ data }: { data: EmailProps }) {
  return (
  <section className="bg-accent py-16 md:py-40">
      <Container>
        <div className="max-w-2xl  space-y-2 md:space-y-10 mx-auto text-center">
          <h2>
            {data.title}
          </h2>
          <p className="mb-10">{data.description}</p>
          <FormSubmit placeholder={data.emailPlaceholder} />
        </div>
      </Container>
    </section>
  );
}
