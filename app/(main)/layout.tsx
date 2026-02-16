import Navbar from "../components/Navbar";
import Chatbot from "../components/Chatbot";
import CookieConsent from "../components/CookieConsent";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Chatbot />
      <CookieConsent />
    </>
  );
}
