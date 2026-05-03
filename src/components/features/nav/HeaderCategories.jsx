import { Link } from "react-router";
import categories from "../../../data/headerCategories";
 
function HeaderCategories({ variant = "horizontal", onNavigate }) {
  const isDrawer = variant === "drawer";

  return (
    <nav
      className={isDrawer ? "hcat-nav--drawer" : "hcat-nav--horizontal"}
      aria-label="Product categories"
    >
      {categories.map((cat) => (
        <Link
          key={cat.id}
          to={cat.name === "Shop by Brand" ? "/brands" : "/"}
          onClick={onNavigate}
          aria-label={`${cat.name}${cat.badge === "NEW" ? ", new" : ""}${cat.isSale ? ", sale" : ""}`}
          className={[
            "hcat-link",
            isDrawer && "hcat-link--drawer",
            cat.isSale && "sale px-2 my-1 text-[#fff] rounded-sm",
          ].filter(Boolean).join(" ")}
        >
          {cat.name}
          {cat.badge === "NEW" && (
            <span
              className={`hcat-badge ${isDrawer ? "hcat-badge--drawer" : ""}`}
              aria-hidden
            >
              NEW
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}

export default HeaderCategories;