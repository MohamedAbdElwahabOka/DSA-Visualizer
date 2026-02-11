export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <div className="bg-slate-800/50 border border-slate-700 p-10 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold text-white mb-2 text-center">Get in Touch</h2>
        <p className="text-slate-400 text-center mb-10">Have questions or want to contribute? Send us a message.</p>
        
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="bg-slate-900 border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-blue-500" />
            <input type="text" placeholder="Last Name" className="bg-slate-900 border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-blue-500" />
          </div>
          <input type="email" placeholder="Email Address" className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-blue-500" />
          <textarea rows="4" placeholder="Your Message" className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl text-white outline-none focus:border-blue-500"></textarea>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}