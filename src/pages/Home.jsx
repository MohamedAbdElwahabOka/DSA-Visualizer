import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">
      {/* Welcome Message */}
      <h1 className="text-6xl font-black text-white mb-6 tracking-tight">
        Master Data Structures <br />
        <span className="text-blue-500">Through Visualization</span>
      </h1>
      
      {/* About Section */}
      <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
        DSA Lab is an interactive platform designed to help students and developers 
        understand complex algorithms. By watching the code move step-by-step, 
        you bridge the gap between theory and implementation.
      </p>

      <Link 
        to="/algorithms" 
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-blue-900/20"
      >
        <Play size={20} fill="currentColor" /> Get Started
      </Link>

      {/* Detail Section */}
      <div className="grid md:grid-cols-3 gap-8 mt-24">
        {[
          { title: "Visual Learning", desc: "Watch how elements move, swap, and compare in real-time." },
          { title: "Total Control", desc: "Pause, Resume, and Reset animations to learn at your own pace." },
          { title: "Open Source", desc: "Designed for the community. Add your own algorithms easily." }
        ].map((feature, i) => (
          <div key={i} className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 text-left">
            <h3 className="text-blue-400 font-bold text-lg mb-2">{feature.title}</h3>
            <p className="text-slate-400 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}