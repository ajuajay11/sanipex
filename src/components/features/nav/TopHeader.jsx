// TopHeader.jsx
import { FaMapMarkerAlt, FaPhone, FaTruck, FaStore, FaAngleRight } from 'react-icons/fa';

const flexcenter = "flex items-center gap-1";

export default function TopHeader() {
    return (
        <>
            <div role="complementary" aria-label="Site utilities" className={`bg-[#f8f8f8] justify-between ${flexcenter} p-1`} >
                <address className={`hidden lg:block ${flexcenter} gap-5 not-italic`}>
                    <a href="/store-locator" className={`${flexcenter} gap-1`} aria-label="Find our store">
                        <FaMapMarkerAlt aria-hidden="true" color="#333" />
                        <span>Find us</span>
                    </a>
                    <a href="tel:+97145076000" className={`${flexcenter} gap-1`} aria-label="Call us">
                        <FaPhone aria-hidden="true" color="#333" />
                        <span>+971 4 507 6000</span>
                    </a>
                </address>
                <ul className={`hidden lg:block ${flexcenter} gap-5 list-none m-0 p-0`} aria-label="Delivery information">
                    <li className={`${flexcenter} gap-2`}>
                        <FaTruck aria-hidden="true" color="#333" />
                        <small>Free 48H delivery on all online orders</small>
                    </li>
                    <li className={`${flexcenter} gap-2`}>
                        <FaStore aria-hidden="true" color="#333" />
                        <small>Click &amp; collect</small>
                    </li>
                </ul>

            </div>
            <div className='block lg:hidden flex gap-2'>
                <span className='sale px-3 text-white rounded-sm'>Sale</span>
                <p className={`${flexcenter} gap-1`}>Up to 80% Off - Shop Clearance <FaAngleRight color="#444" /></p>
            </div></>
    );
}