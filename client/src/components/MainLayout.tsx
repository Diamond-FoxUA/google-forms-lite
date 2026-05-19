import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="font-sans text-slate-700 bg-white antialiased min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full mx-auto px-4 py-8 max-w-6xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
