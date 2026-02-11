import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 border-b border-slate-800 p-5 flex justify-between items-center px-10">
      <h1 className="text-xl font-bold text-blue-500">DSA LAB</h1>
      <div className="flex gap-8 text-slate-300 font-medium">
        <Link to="/" className="hover:text-white transition">Home</Link>
        <Link to="/algorithms" className="hover:text-white transition">Algorithms</Link>
        <Link to="/contact" className="hover:text-white transition">Contact Us</Link>
      </div>
    </nav>
  );
}