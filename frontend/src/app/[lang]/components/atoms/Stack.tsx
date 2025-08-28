interface StackProps {
    children: React.ReactNode;
    alignItems?: "items-start" | "items-center" | "items-end" | "items-stretch" | "items-baseline";
    justifyContent?:
      | "justify-start"
      | "justify-center"
      | "justify-end"
      | "justify-between"
      | "justify-around"
      | "justify-evenly";
    gap?: "gap-0" | "gap-1" | "gap-2" | "gap-3" | "gap-4" | "gap-5" | "gap-6" | "gap-8" | "gap-10" | "gap-12" | "gap-16" | "gap-20" | "gap-24"; // Tailwind gap spacing classes
    className?: string;
  }
  
  const Stack: React.FC<StackProps> = ({
    children,
    alignItems = "items-stretch", // Default alignment
    justifyContent = "justify-start", // Default justification
    gap = "gap-4", // Default gap using Tailwind spacing classes
    className = "",
  }) => {
    return (
      <div
        className={`flex flex-col ${alignItems} ${justifyContent} ${gap} ${className}`}
      >
        {children}
      </div>
    );
  };
  
  export default Stack;
  