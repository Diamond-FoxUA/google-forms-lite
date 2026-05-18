import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="font-sans text-slate-700 bg-white antialiased min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
