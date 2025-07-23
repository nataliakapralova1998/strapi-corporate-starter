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
    <section className="bg-[#eae6df] py-16">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-semibold text-gray-800 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 mb-10">{data.description}</p>
          <FormSubmit placeholder={data.emailPlaceholder} />
        </div>
      </Container>
    </section>
  );
}
