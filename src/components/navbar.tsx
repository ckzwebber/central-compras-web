import { SiWolframlanguage } from "react-icons/si";
import { FiSearch } from "react-icons/fi";
import { CartSheet } from "./cart-sheet";

export const Navbar = () => {
  return (
    <nav className="w-full bg-zinc-900 pt-3 pb-3 pr-6 pl-6 text-white flex items-center hover:shadow-lg shadow-black/20 justify-between transition-all duration-300">
      <div className="flex items-center space-x-7 flex-1">
        <a href="#" className="bg-black p-2 rounded-lg flex items-center justify-center border border-zinc-700 hover:transform hover:scale-105 transition-transform">
          <SiWolframlanguage size={26} color="white" />
        </a>
        <a href="#" className="hover:underline font-bold text-sm">
          GURI'S STORE
        </a>
        <a href="#" className="hover:underline font-bold text-sm text-zinc-400 hover:text-white">
          All Products
        </a>
      </div>
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-md">
          <input type="text" placeholder="Search for products..." className="pt-2 pb-2 pl-3 pr-10 rounded-lg w-full border border-zinc-700 focus:outline-none focus:border-zinc-400 text-sm" />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={16} />
        </div>
      </div>
      <div className="flex-1 flex justify-end">
        <CartSheet />
      </div>
    </nav>
  );
};
