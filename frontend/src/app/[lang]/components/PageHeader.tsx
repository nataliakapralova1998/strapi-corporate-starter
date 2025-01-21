interface PageHeaderProps {
  heading: string;
  text?: string;
}

export default function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <div className="w-full text-center">
      {text && (
        <span className="font-bold tracking-wider uppercase text-primary">
          {text}
        </span>
      )}
      <h2 className="text-4xl font-bold lg:text-5xl">{heading}</h2>
    </div>
  );
}
