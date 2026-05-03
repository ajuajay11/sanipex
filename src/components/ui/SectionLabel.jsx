 
export default function SectionLabel({
  children,
  as: Comp = "p",
  className = "",
  ...props
}) {
  return (
    <Comp
      className={`mb-3 font-medium text-neutral-700 ${className}`.trim()}
      style={{
        fontSize: "clamp(10px, 4vw, 14px)",
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}
