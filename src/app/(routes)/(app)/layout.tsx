import AuthStatus from "@/components/auth-status";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <header className="w-full h-15 border-b border-b-gray-200">
        <MaxWidthWrapper className="h-full flex justify-between items-center px-5 border-x border-x-gray-200">
          <Link href="/">
            <p className="text-3xl font-black tracking-tighter">Foodbase</p>
          </Link>
          <AuthStatus />
        </MaxWidthWrapper>
      </header>
      <MaxWidthWrapper className="min-h-[calc(100vh-60px)] border-x border-gray-200">
        {children}
      </MaxWidthWrapper>
    </div>
  );
}
