import React from 'react'

const Footer = () => {
  return (
    <div>
      {/* FOOTER */}
<footer className="mt-16 border-t border-white/10 py-8">

  <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">

    {/* LEFT */}
    <p className="text-white/40 text-sm text-center md:text-left">
      © {new Date().getFullYear()} Laundry OS. All rights reserved.
    </p>

    {/* CENTER LINKS */}
    <div className="flex gap-6 text-sm">
      <a href="#" className="text-white/50 hover:text-white transition">
        Privacy
      </a>
      <a href="#" className="text-white/50 hover:text-white transition">
        Terms
      </a>
      <a href="#" className="text-white/50 hover:text-white transition">
        Support
      </a>
    </div>

    {/* RIGHT */}
    <p className="text-white/30 text-xs">
      Built with ❤️ using Next.js
    </p>

  </div>
</footer>
    </div>
  )
}

export default Footer
