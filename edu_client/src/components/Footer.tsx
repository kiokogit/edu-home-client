import Logo from "./logo";

export default function Footer({ border = false }: { border?: boolean }) {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 justify-center">
        {/* Top area: Blocks */}
        <div
          className={`grid gap-10 py-8 grid-cols-12 md:py-12 ${border ? "border-t [border-image:linear-gradient(to_right,transparent,var(--color-slate-200),transparent)1]" : ""}`}
        >
          {/* 1st block */}
          <div className="space-y-2 col-span-12">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-gray-200">
                UniQuad
              </span>
            </div>
            <div className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} UniQuad - All rights reserved.
            </div>
          </div>
         
        </div>
      </div>
    </footer>
  );
}