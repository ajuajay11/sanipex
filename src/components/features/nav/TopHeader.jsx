import {
  MapPin,
  Phone,
  Truck,
  Store,
  ChevronRight,
} from "lucide-react";

const flexcenter = "flex items-center gap-1";
 
export default function TopHeader({ forDrawer = false }) {
  if (forDrawer) {
    return (
      <div className="flex flex-col gap-4 border-b border-gray-100 pb-4">
        <address className={`flex flex-col gap-3 not-italic text-sm text-gray-800`}>
          <a
            href="/store-locator"
            className={`${flexcenter} gap-2 py-1 hover:text-gray-900`}
            aria-label="Find our store"
          >
            <MapPin aria-hidden="true" className="shrink-0 text-[#333]" size={14} />
            <span>Find us</span>
          </a>
          <a
            href="tel:+97145076000"
            className={`${flexcenter} gap-2 py-1 hover:text-gray-900`}
            aria-label="Call us"
          >
            <Phone aria-hidden="true" className="shrink-0 text-[#333]" size={14} />
            <span>+971 4 507 6000</span>
          </a>
        </address>

        <ul
          className={`flex flex-col gap-3 list-none m-0 p-0 text-sm text-gray-700`}
          aria-label="Delivery information"
        >
          <li className={`${flexcenter} gap-2`}>
            <Truck aria-hidden="true" className="shrink-0 text-[#333]" size={14} />
            <small>Free 48H delivery on all online orders</small>
          </li>
          <li className={`${flexcenter} gap-2`}>
            <Store aria-hidden="true" className="shrink-0 text-[#333]" size={14} />
            <small>Click &amp; collect</small>
          </li>
        </ul>

        <div className="flex flex-col gap-2 rounded-md bg-[#f8f8f8] px-3 py-2">
          <span className="sale inline-flex w-fit px-3 py-0.5 text-white text-xs rounded-sm">
            Sale
          </span>
          <p className={`${flexcenter} gap-1 text-sm text-gray-800`}>
            Up to 80% Off - Shop Clearance <ChevronRight className="shrink-0 text-[#444]" size={14} aria-hidden />
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        role="complementary"
        aria-label="Site utilities"
        className={`justify-between ${flexcenter} p-1`}
      >
        <address className={`hidden lg:flex ${flexcenter} gap-5 not-italic`}>
          <a
            href="/store-locator"
            className={`${flexcenter} gap-1`}
            aria-label="Find our store"
          >
            <MapPin aria-hidden="true" className="shrink-0 text-[#333]" size={14} />
            <span>Find us</span>
          </a>
          <a
            href="tel:+97145076000"
            className={`${flexcenter} gap-1`}
            aria-label="Call us"
          >
            <Phone aria-hidden="true" className="shrink-0 text-[#333]" size={14} />
            <span>+971 4 507 6000</span>
          </a>
        </address>

        <ul
          className={`hidden lg:flex ${flexcenter} gap-5 list-none m-0 p-0`}
          aria-label="Delivery information"
        >
          <li className={`${flexcenter} gap-2`}>
            <Truck aria-hidden="true" className="shrink-0 text-[#333]" size={14} />
            <small>Free 48H delivery on all online orders</small>
          </li>
          <li className={`${flexcenter} gap-2`}>
            <Store aria-hidden="true" className="shrink-0 text-[#333]" size={14} />
            <small>Click &amp; collect</small>
          </li>
        </ul>
      </div>
    </>
  );
}
