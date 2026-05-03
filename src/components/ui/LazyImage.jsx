import { forwardRef } from "react";
 
const LazyImage = forwardRef(function LazyImage(
  { alt = "", loading = "lazy", decoding = "async", fetchPriority, ...props },
  ref
) {
  return (
    <img
      ref={ref}
      alt={alt}
      loading={loading}
      decoding={decoding}
      {...(fetchPriority != null ? { fetchPriority } : {})}
      {...props}
    />
  );
});

export default LazyImage;
