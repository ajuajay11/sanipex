import LazyImage from "./LazyImage";

const LABEL_CLASS =
  "filter-category-label flex cursor-pointer items-center gap-1.5 rounded-lg border border-white bg-white p-1.5 shadow-none transition-[border-color,box-shadow] duration-200 peer-checked:border-neutral-300 peer-checked:shadow-sm peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--template-color-primary)]";
 
export default function FilterCategoryTile({
  categoryId,
  label,
  iconSrc,
  checked,
  onToggle,
  inputIdPrefix = "filter-cat",
}) {
  const inputId = `${inputIdPrefix}-${categoryId}`;

  return (
    <li className="relative min-w-0 rounded-sm" style={{boxShadow:"1px 1px 1px #23232315"}}>
      <input
        type="checkbox"
        id={inputId}
        className="peer sr-only"
        checked={checked}
        onChange={(e) => {
          onToggle();
          queueMicrotask(() => e.currentTarget.focus({ preventScroll: true }));
        }}
      />
      <label htmlFor={inputId} className={LABEL_CLASS}>
        {iconSrc ? (
          <LazyImage src={iconSrc} alt="" className="h-5 w-5 shrink-0 object-contain" />
        ) : (
          <span
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-neutral-100 text-[10px] text-neutral-500"
            aria-hidden="true"
          >
            —
          </span>
        )}
        <span className="line-clamp-2 min-w-0 flex-1 text-left text-[10px] font-medium leading-tight text-neutral-600">
          {label}
        </span>
      </label>
    </li>
  );
}
