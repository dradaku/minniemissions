
import { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 bg-polkadot-pattern opacity-[0.02] pointer-events-none z-0" />
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        {children}
      </main>
      <footer className="bg-minnie-dark text-white py-6 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} Minniemissions. Powered by Polkadot.
          </p>
        </div>
      </footer>
    </div>
  );
};
