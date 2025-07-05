import { BookOpen, Facebook, Github, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/books", label: "All Books" },
    { href: "/create-book", label: "Add Book" },
    { href: "/borrow-summary", label: "Borrow Summary" },
  ];
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 mt-auto">
      <section className="py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-10 h-10 text-blue-600" />
                <span className="text-xl font-bold ">BookBase</span>
              </div>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Transforming library management with smart technology. Join
                thousands of libraries worldwide using our platform.
              </p>
              <div className="flex mt-6 gap-3">
                {[
                  {
                    href: "#",
                    label: "Facebook",
                    icon: <Facebook className="w-4 h-4" />,
                    hoverColor: "hover:bg-[#1877F2]",
                  },
                  {
                    href: "#",
                    label: "Twitter",
                    icon: <Twitter className="w-4 h-4" />,
                    hoverColor: "hover:bg-[#1DA1F2]",
                  },
                  {
                    href: "#",
                    label: "Instagram",
                    icon: <Instagram className="w-4 h-4" />,
                    hoverColor: "hover:bg-[#E4405F]",
                  },
                  {
                    href: "#",
                    label: "GitHub",
                    icon: <Github className="w-4 h-4" />,
                    hoverColor: "hover:bg-[#333]",
                  },
                ].map(({ href, label, icon, hoverColor }, i) => (
                  <a
                    key={i}
                    href={href}
                    aria-label={label}
                    className={`w-9 h-9 flex items-center justify-center bg-gray-800 text-white rounded-lg ${hoverColor} transform hover:scale-110 transition-all duration-300`}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-gray-900 font-semibold mb-4 text-sm">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li>
                    <Link
                      key={link.href}
                      to={link.href}
                      className={` py-2 rounded-md text-sm `}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-gray-900 font-semibold mb-4 text-sm">
                Support
              </h4>
              <ul className="space-y-3">
                {["Help Center", "Documentation", "API", "Status"].map(
                  (item, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2"></span>
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h4 className="text-gray-900 font-semibold mb-4 text-sm">
                Stay Updated
              </h4>
              <p className="text-gray-600 mb-4">
                Subscribe to our newsletter for the latest updates and features.
              </p>
              <form className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200 bg-white"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 px-4 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} BookBase. All rights reserved.
              </p>
              <div className="flex space-x-6">
                {["Terms", "Privacy", "Cookies"].map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
