import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import Business from "./pages/Business";
import Investing from "./pages/Investing";
import Rates from "./pages/Rates";
import Support from "./pages/Support";
import OpenAccount from "./pages/OpenAccount";
import SignIn from "./pages/SignIn";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/business" element={<Business />} />
          <Route path="/investing" element={<Investing />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/support" element={<Support />} />
          <Route path="/open-account" element={<OpenAccount />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
