
import Link from "next/link";
import NavSign from "./nav-sign";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/90 backdrop-blur">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-80">
                BetterAuthNext
              </Link>

              <div className="flex items-center gap-2">
                <NavSign />
                {/* <ModeToggle /> */}
              </div>
            </div>
          </header>
  );
};

export default Header;