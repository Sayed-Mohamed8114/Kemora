import LoginForm from "@/Components/Forms/LoginForm";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#f7f4ee] text-slate-800 dark:bg-[#121212] dark:text-gray-100">
      <div className="pointer-events-none absolute -left-40 -top-40 h-112.5 w-112.5 rounded-full bg-[#c49746]/10 dark:bg-[#c49746]/5" />

      <div className="pointer-events-none absolute -bottom-48 -right-40 h-125 w-125 rounded-full bg-[#c49746]/10 dark:bg-[#c49746]/5" />

      <div className="relative z-10 grid min-h-screen w-full lg:grid-cols-2">
        <section className="hidden min-h-screen flex-col justify-center px-10 py-10 lg:flex xl:px-20">
          <Link
            to="/"
            className="w-fit text-3xl font-extrabold font-cinzel tracking-[0.18em] text-slate-800 transition-colors hover:text-[#b3873f] dark:text-gray-100 dark:hover:text-[#c49a52]"
          >
          KEMORA
          </Link>

          <div className="max-w-xl">
            <span className="mb-5 inline-block text-sm font-bold tracking-[0.22em] text-[#b3873f]">
              WELCOME BACK
            </span>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight xl:text-7xl">
              Continue your
              <span className="block text-[#b3873f]">
                journey with Kemora.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-slate-500 dark:text-gray-400 xl:text-lg">
              Sign in to access your account, manage your trips, and continue
              discovering Egypt your way.
            </p>

            <div className="mt-10 space-y-6">
              <div>
                <h3 className="text-base font-semibold">
                  Discover
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                  Explore Egypt's most unforgettable destinations.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold">
                  Travel
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                  Plan your experiences with confidence and ease.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold">
                  Enjoy
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
                  Make every moment of your journey memorable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-10 block text-center text-2xl font-extrabold tracking-[0.18em] text-slate-800 dark:text-gray-100 lg:hidden"
            >
              KEMORA
            </Link>

            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_25px_80px_rgba(31,41,55,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/4 dark:shadow-black/30 sm:p-10">
              <div className="mb-8">
                <span className="mb-3 inline-block text-xs font-bold tracking-[0.22em] text-[#b3873f]">
                  YOUR ACCOUNT
                </span>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Welcome back
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-gray-400">
                  Enter your credentials to continue your journey.
                </p>
              </div>

              <LoginForm />

              <div className="mt-7 text-center text-sm text-slate-500 dark:text-gray-400">
                <span>Don't have an account?</span>{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-[#b3873f] transition-colors hover:text-[#9f7737]"
                >
                  Create one
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}