import { Link } from "react-router-dom";
import { ArrowLeft, Home, SearchX } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-6">
      <div className="w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-50 text-red-500">
          <SearchX size={48} />
        </div>

        <h1 className="mt-8 text-7xl font-extrabold tracking-tight text-slate-900">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-semibold text-slate-800">
          Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
          Sorry, the page you are looking for doesn't exist, has been moved, or
          the URL is incorrect.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            <Home size={18} />
            Back to Dashboard
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-xs text-slate-400">
            Mini ERP • Inventory & Sales Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
