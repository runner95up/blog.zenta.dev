import { BrandLink, Logo } from "../brand";
import { ThemeButton } from "../buttton";

export const NavBar = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-around p-2 mx-auto max-w-7xl backdrop-blur-xl">
      {/* Brand */}
      <div className="flex items-center gap-2">
        <Logo />
        <BrandLink />
      </div>
      {/* Theme Button */}
      <div>
        <ThemeButton />
      </div>
    </header>
  );
};
