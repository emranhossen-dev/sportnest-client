import { Outlet } from 'react-router';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-50 selection:text-slate-900">
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;