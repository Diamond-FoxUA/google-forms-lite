export default function Footer() {
  return (
    <footer className="border-t border-slate-200 py-6">
      <div className="max-w-6xl px-4 mx-auto flex flex-col items-center">
        <p className="text-sm text-slate-500 font-medium">
          &copy;{new Date().getFullYear()}{" "}
          <span className="text-slate-700 hover:text-violet-800 transition-colors duration-300 cursor-default">
            Google Forms Lite
          </span>
          . Built with TypeScript and React.
        </p>
      </div>
    </footer>
  );
}
