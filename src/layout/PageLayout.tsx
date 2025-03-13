import { ReactNode } from "react";
import HeaderPage from "../components/pages/Header";
import FooterPage from "../components/pages/Footer";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <HeaderPage/>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <FooterPage />
    </div>
  );
};

export default PageLayout;
