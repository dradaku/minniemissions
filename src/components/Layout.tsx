
import { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-minnie-dark text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-75">
            © {new Date().getFullYear()} Minniemissions. Powered by Polkadot.
          </p>
        </div>
      </footer>
    </div>
  );
};
