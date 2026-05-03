 
export default function SectionLabel({
  children,
  as: Comp = "p",
  className = "",
  ...props
}) {
  return (
    <Comp
      className={`mb-3 font-bold text-neutral-700 ${className}`.trim()}
      style={{
        fontSize: "clamp(8px, 4vw, 10px)",
      }}
      {...props}
    >
      {children}
    </Comp>
  );
}
