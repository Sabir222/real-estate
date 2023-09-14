"use client";
interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      className="
        max-w-[2520px]
        mx-auto
        xl:px-20 
        md:px-10
        sm:px-2
        px-4
        pt-44
        md:pt-28
        pb-20
      "
    >
      {children}
    </div>
  );
};

export default Container;
