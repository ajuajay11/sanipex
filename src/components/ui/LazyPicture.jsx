import { forwardRef } from "react";
 
const LazyPicture = forwardRef(function LazyPicture(
  {
    webpSrc,
    fallbackSrc = null,
    alt = "",
    className = "",
    pictureClassName = "",
    imgClassName,
    loading = "lazy",
    decoding = "async",
    fetchPriority,
    sizes,
    ...imgProps
  },
  ref
) {
  const cls = imgClassName ?? className;
  const mergedImgClass =
    pictureClassName && cls
      ? `${pictureClassName} ${cls}`.trim()
      : pictureClassName || cls || undefined;

  if (webpSrc && fallbackSrc == null) {
    return (
      <img
        ref={ref}
        src={webpSrc}
        alt={alt}
        className={mergedImgClass}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        {...(fetchPriority != null ? { fetchPriority } : {})}
        {...imgProps}
      />
    );
  }

  return (
    <picture className={pictureClassName}>
      {webpSrc ? <source type="image/webp" srcSet={webpSrc} sizes={sizes} /> : null}
      <img
        ref={ref}
        src={fallbackSrc}
        alt={alt}
        className={cls}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        {...(fetchPriority != null ? { fetchPriority } : {})}
        {...imgProps}
      />
    </picture>
  );
});

export default LazyPicture;
