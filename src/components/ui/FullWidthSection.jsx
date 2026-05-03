export default function FullWidthSection({
  children,
  bg = "bg-white",
  className = "",
}) {
  return (
    <div className={`w-full ${bg} px-3 lg:px-5 xxl:px-0`}>
      <div className={`container mx-auto ${className}`}>{children}</div>
    </div>
  );
}
