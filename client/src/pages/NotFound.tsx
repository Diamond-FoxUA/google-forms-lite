import LinkBtn from "../components/LinkBtn";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center mt-[25dvh]">
      <div className="flex items-center">
        <h1 className="text-6xl font-semibold border-r-4 pr-4 mr-4">404</h1>
        <p className="text-3xl font-medium">Page Not Found.</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-sm text-slate-600">
          Oops.. that page can't be found.
        </p>
        <LinkBtn to="/">Back to Dashboard</LinkBtn>
      </div>
    </div>
  );
}
