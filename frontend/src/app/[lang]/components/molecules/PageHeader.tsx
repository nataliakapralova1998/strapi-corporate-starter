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
      <h3>{heading}</h3>
    </div>
  );
}
