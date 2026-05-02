
import { logo } from "../../../common";
import TopHeader from './TopHeader';


const countries = [
    { code: 'AE', label: 'UAE', flag: '🇦🇪' },
    { code: 'GB', label: 'UK', flag: '🇬🇧' },
    { code: 'US', label: 'USA', flag: '🇺🇸' },
];
export default function Header() {
    return (
        <>
            <header className='topheader'>
                <TopHeader />
                <div className="grid grid-cols-3 items-center gap-4 px-6 py-3 bg-white border-b border-gray-100">

                    {/* ── Col 1 : Logo ── */}
                    <a href="/" aria-label="Sanipex Group — Home">
                        <img
                            src={logo}
                            alt="Sanipex Group — Bystro, Bagnodesign, Gymkhana"
                            className="h-12 w-auto"
                        />
                    </a>

                    {/* ── Col 2 : Search ── */}
                    <div role="search">
                        <label htmlFor="site-search" className="sr-only">Search products</label>
                        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 gap-2 focus-within:ring-2 focus-within:ring-gray-400">
                            <input
                                id="site-search"
                                type="search"
                                placeholder="Search"
                                autoComplete="off"
                                className="flex-1 outline-none text-sm bg-transparent"
                            />
                            <button aria-label="Submit search" className="text-gray-500 hover:text-gray-800">
                                <FaSearch size={14} aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    {/* ── Col 3 : Actions ── */}
                    <div className="flex items-center justify-end gap-5">

                        {/* Showrooms */}

                        <a href="/showrooms"
                            className="flex flex-col items-center text-xs text-gray-700 hover:text-black gap-0.5"
                            aria-label="Showrooms"
                        >
                            <MdStorefront size={22} aria-hidden="true" />
                            <span>Showrooms</span>
                        </a>

                        {/* Brochures */}

                        <a href="/brochures"
                            className="flex flex-col items-center text-xs gap-0.5 bg-blue-600 text-white px-2 py-1 rounded"
                            aria-label="Download Brochures"
                        >
                            <IoBookOutline size={20} aria-hidden="true" />
                            <span>Brochures</span>
                        </a>

                        {/* Country selector */}
                        <div>
                            <label htmlFor="country-select" className="sr-only">Select country</label>
                            <select
                                id="country-select"
                                defaultValue="AE"
                                className="text-sm border-none outline-none cursor-pointer bg-transparent"
                            >
                                {countries.map((c) => (
                                    <option key={c.code} value={c.code}>
                                        {c.flag} {c.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Account */}
                        <a href="/account" aria-label="My account" className="text-gray-700 hover:text-black">
                            <FaUser size={18} aria-hidden="true" />
                        </a>

                        {/* Divider + Cart */}
                        <div className="flex items-center gap-2 text-gray-700">
                            <span aria-hidden="true" className="text-gray-300 text-lg font-light">|</span>

                            <a href="/cart"
                                aria-label={`Shopping cart, ${cartCount} items`}
                                className="flex items-center gap-1.5 hover:text-black"
                            >
                                <FaShoppingCart size={18} aria-hidden="true" />
                                <span className="text-sm font-medium">{cartCount}</span>
                            </a>
                        </div>

                    </div>
                </div>
            </header>
        </>
    )
}
