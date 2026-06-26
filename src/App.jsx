import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      {/* গ্লোবাল টোস্ট কন্টেইনার */}
      <Toaster position="top-right" reverseOrder={false} />
      
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;