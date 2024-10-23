import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon.jsx";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function NavbarCustom({ search }) {
  const [navbarOpacity, setNavbarOpacity] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScrollDistance = 300;
      const minOpacity = 0.9; // Pastikan minimal opacity tidak terlalu rendah
      const newOpacity = Math.max(1 - scrollTop / maxScrollDistance, minOpacity); 
      setNavbarOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = [
    { label: "Movies", href: "/" },
    { label: "TV Series", href: "/series" },
  ];

  return (
    <div 
      className="bg-black text-red-600 z-50 fixed top-0"
      style={{ opacity: navbarOpacity, transition: 'opacity 0.2s ease-in-out'}}
    >
      <Navbar className="mb-4 bg-black fixed top-0 z-50">
        <NavbarContent justify="start" className="flex flex-nowrap items-center">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden"
          />
          <NavbarBrand className="mr-2" style={{ flexBasis: '100px' }}>
            <Link
              color="foreground"
              href="/"
              className={location.pathname === "/" ? "font-bold" : "font-medium"}
            >
              <p className="sm:block font-extrabold text-red-600 text-4xl">BINFLIX</p>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-8 text-lg">
          {menuItems.map((item, index) => (
            <NavbarItem key={index}>
              <Link
                color="foreground"
                href={item.href}
                className={location.pathname === item.href ? "font-bold text-xl" : "font-medium"}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[20rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper: "h-full font-normal text-default-500 bg-gray-800/80 dark:bg-gray-700/80 rounded-lg",
            }}
            size="sm"
            startContent={<SearchIcon size={18} />}
            type="search"
            placeholder="Search for anything..."
            onChange={({ target }) => search(target.value)}
          />
        </NavbarContent>

        {isMenuOpen && (
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={index}>
                <Link
                  color="foreground"
                  href={item.href}
                  className="w-full text-red-600 text-xl font-semibold"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        )}
      </Navbar>
    </div>
  );
}
