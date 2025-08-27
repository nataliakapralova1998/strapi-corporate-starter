interface PageHeaderProps {
  heading: string;
  text?: string;
}

export default function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <div>
      {text && (
        <span className="text-sm text-primary uppercase tracking-widest mb-2">
          {text}
        </span>
      )}
      <h2>{heading}</h2>
    </div>
  );
}
