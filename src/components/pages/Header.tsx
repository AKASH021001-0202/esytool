import { useState } from "react";

const HeaderPage: React.FC = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu toggle

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <a href="#" className="text-white text-xl font-bold">
          <img src="/images/logo/logo.svg" alt="Company Logo" className="w-32" />
        </a>

        {/* Hamburger Menu (Mobile Only) */}
        <button
          className="text-white lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Navigation (Desktop) */}
        <nav className="hidden lg:flex gap-6">
          {/** Mega Menu Items */}
          {["Tools", "Platform", "Solutions"].map((item) => (
            <div
              key={item}
              className="relative group"
              onMouseEnter={() => setOpenMenu(item)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className="text-white">{item}</button>
              {openMenu === item && (
                <div className="absolute left-0 bg-white text-black p-4 shadow-lg w-64">
                  <a href="#" className="block p-2 hover:bg-gray-200">
                    {item} 1
                  </a>
                  <a href="#" className="block p-2 hover:bg-gray-200">
                    {item} 2
                  </a>
                </div>
              )}
            </div>
          ))}

          <a href="#" className="text-white">
            Pricing
          </a>
        </nav>

        {/* CTA Button (Desktop) */}
        <button className="hidden lg:block bg-white text-black px-4 py-2 rounded-full">
          Try Now
        </button>

        {/* Mobile Menu (Overlay) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-90 lg:hidden">
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Mobile Navigation Links */}
              {["Tools", "Platform", "Solutions", "Pricing"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white text-xl"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}

              {/* Mobile CTA Button */}
              <button className="bg-white text-black px-6 py-3 rounded-full text-xl">
                Try Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderPage;