import PageHeader from "../PageHeader";
import Container from "../atoms/Container";
import PlanCard, { Plan } from "../molecules/PlanCard";

interface PriceProps {
  data: {
    id: string;
    title: string;
    plans: Plan[];
  };
}

export default function Pricing({ data }: PriceProps) {
  return (
    <section className="bg-text text-white py-12 lg:py-24">
      <Container>
        <PageHeader heading={data.title} text="Pricing" />
        <div className="flex flex-wrap items-stretch max-w-6xl mt-12 mx-auto">
          {data.plans.map((plan: Plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}
