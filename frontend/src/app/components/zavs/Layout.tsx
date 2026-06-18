import { Link, Outlet, useLocation } from "react-router";
import { Home, FileText, Clock, HelpCircle } from "lucide-react";

export function Layout() {
  const location = useLocation();

  const navigation = [
    { name: "Start", href: "/", icon: Home },
    { name: "Ticket einreichen", href: "/ticket/new", icon: FileText },
    { name: "Ticketstatus", href: "/ticket/status", icon: Clock },
    { name: "Hilfe", href: "/help", icon: HelpCircle },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
          <div className="flex h-20 shrink-0 items-center">
            <Link to="/">
              <img
                src="/zavs-logo.svg"
                alt="ZAVS – Zentrales Anliegen- und Verwaltungssystem"
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`
                      group flex gap-x-3 rounded-xl px-4 py-3 transition-all duration-200
                      ${isActive(item.href)
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }
                    `}
                  >
                    <item.icon
                      className={`h-5 w-5 shrink-0 transition-colors ${
                        isActive(item.href) ? "text-[#E2001A]" : ""
                      }`}
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm">
        <Link to="/">
          <img
            src="/zavs-logo.svg"
            alt="ZAVS"
            className="h-7 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Main Content */}
      <main className="lg:pl-72 pl-20">
        <div className="px-4 py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Left Navigation */}
      <nav className="lg:hidden fixed left-0 top-16 bottom-0 z-40 flex flex-col gap-2 border-r border-gray-200 bg-white/80 backdrop-blur-xl px-3 py-4 shadow-lg w-20">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`flex flex-col items-center gap-1 py-3 rounded-xl transition-all duration-200 ${
              isActive(item.href)
                ? "text-[#E2001A] bg-gray-100"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs text-center leading-tight">{item.name.split(" ")[0]}</span>
          </Link>
        ))}
      </nav>

      {/* Desktop Footer */}
      <footer className="hidden lg:block border-t border-gray-200 bg-white mt-auto">
        <div className="pl-72 px-8 py-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p className="ml-4">&copy; 2026 DHBW - Zentrales Anliegen- und Verwaltungssystem</p>
            <div className="flex items-center gap-6">
              <Link to="/impressum" className="hover:text-gray-900 transition-colors">
                Impressum
              </Link>
              <Link to="/impressum#datenschutz" className="hover:text-gray-900 transition-colors">
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
