"use client";

const ProductLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="relative flex flex-col">
      <main className="relative grow">{children}</main>
    </div>
  );
};

export default ProductLayout;
