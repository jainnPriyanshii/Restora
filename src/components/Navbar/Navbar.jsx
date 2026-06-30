/**
 * Fixed top navigation bar with brand name and text nav links.
 */
export default function Navbar() {
  const links = [
    { label: 'Approach', href: '#solution' },
    { label: 'Survey', href: '#survey-anchor' },
    { label: 'About Us', href: '#about-us' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="flex justify-between items-center max-w-[800px] mx-auto px-md py-sm">
        <span className="text-headline-md font-bold text-primary">
          Restora
        </span>
        <div className="flex items-center gap-md">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-label-md text-on-surface-variant hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
