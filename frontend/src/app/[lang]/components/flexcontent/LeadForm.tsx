import FormSubmit from "../FormSubmit";
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
    <section className="py-12 lg:py-24 bg-text text-white">
      <Container className="flex flex-col justify-center p-4 space-y-8 md:p-10 lg:space-y-0 lg:space-x-12 lg:justify-between lg:flex-row">
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h1 className="text-5xl font-bold leading-none">{data.title}</h1>
          <p className="text-lg font-bold tracking-wider uppercase text-primary">{data.description}</p>
        </div>
        <FormSubmit placeholder={data.emailPlaceholder} text={data.submitButton.text} />
      </Container>
    </section>
  );
}
