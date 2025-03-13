import React from "react";

const FooterPage: React.FC = () => {
  return (
    <footer className="bg-black text-white pt-28 md:pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6 py-6">
        {/* Logo & Copyright */}
        <div className="space-y-4">
          <img
            src="/images/logo/logo-dark.svg" // Use a proper path
            alt="Company Logo"
            className="w-32"
          />
          <p className="text-sm text-gray-400">
            Thanks to remove.bg's clever AI, you can slash editing time - and
            have more fun!
          </p>
          <button className="mt-4 px-4 py-2 border border-white rounded-lg text-sm hover:bg-white hover:text-black transition-colors duration-300">
            Your business solution
          </button>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tools</h3>
          <nav>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                "Background Remover",
                "Watermark Remover",
                "Image Upscale",
                "Short Link",
                "Generate QR",
                "Image Converter",
                "Image Resize",
                "Colors Change",
                "Image to Link",
              ].map((tool, index) => (
                <li key={index}>
                  <a href="#" className="hover:underline hover:text-white">
                    {tool}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Platform */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Platform</h3>
          <nav>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                "E-Commerce and Retail",
                "Graphic Design and Media",
                "Photography",
                "Marketing and Advertising",
                "Travel and Hospitality",
                "Social Media and Content Creation",
                "Finance",
                "Education",
                "Real Estate",
              ].map((platform, index) => (
                <li key={index}>
                  <a href="#" className="hover:underline hover:text-white">
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Legal & Socials */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Solutions</h3>
            <nav>
              <ul className="space-y-2 text-sm text-gray-400">
                {[
                  "Web Help Center",
                  "App Help Center",
                  "Contact Us",
                  "Try Esytools",
                  "Careers",
                ].map((solution, index) => (
                  <li key={index}>
                    <a href="#" className="hover:underline hover:text-white">
                      {solution}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

         
        </div>
      </div>

      {/* Copyright Section with Legal Menu */}
      <div className="border-t border-gray-800 mt-12 text-center">
        <div className="flex items-end justify-around h-full my-auto flex-wrap pt-4">
        <p className="text-sm text-gray-400">
          © 2024 AI Creativity Esytools. All rights reserved.
        </p>
        <nav className="mt-4">
          <ul className="flex justify-center space-x-4 text-sm text-gray-400">
            {[
              { text: "Privacy Policy", link: "/privacy-policy" },
              { text: "Terms of Service", link: "/terms-of-service" },
              { text: "Cookie Policy", link: "/cookie-policy" },
            ].map((legal, index) => (
              <li key={index}>
                <a
                  href={legal.link}
                  className="hover:underline hover:text-white"
                >
                  {legal.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        </div>
      
      </div>
    </footer>
  );
};

export default FooterPage;