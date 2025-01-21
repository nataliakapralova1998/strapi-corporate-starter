import { PropsWithChildren } from "react";
import { mergeClassNames } from "../../utils/merge-classes";


export interface ContainerProps {
  className?: string;
}

const Container = ({
  children,
  className,
}: PropsWithChildren<ContainerProps>) => {
  return (
    <div className={mergeClassNames("container p-4 md:p-0 mx-auto", className)}>
      {children}
    </div>
  );
};

export default Container;

