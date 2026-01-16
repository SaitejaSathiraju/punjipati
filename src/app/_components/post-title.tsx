import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  itemProp?: string;
};

export function PostTitle({ children, itemProp }: Props) {
  return (
    <h1 
      className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left"
      itemProp={itemProp}
    >
      {children}
    </h1>
  );
}
