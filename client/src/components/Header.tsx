import { Link } from "react-router-dom";
import LinkBtn from "./LinkBtn";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          className="font-[impact] text-slate-800 flex items-center gap-2 font-bold text-xl hover:scale-105 transition-transform duration-300"
          to="/"
        >
          <span className="text-2xl">📝</span>Google Forms Lite
        </Link>

        <nav className="flex gap-2">
          <LinkBtn variant="secondary" to="/">
            Main page
          </LinkBtn>
          <LinkBtn to="/forms/new">
            + Create Form
          </LinkBtn>
        </nav>
      </div>
    </header>
  );
}
