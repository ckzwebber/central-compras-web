import { Separator } from "./ui/separator";

export const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950 pt-6 pb-6 pr-10 pl-10 text-white flex flex-col items-center justify-center hover:shadow-lg shadow-black/20 transition-all duration-300">
      <Separator className="mb-4 bg-zinc-700" />
      <p className="text-sm text-zinc-500">&copy; 2025 GURI'S STORE. All rights reserved.</p>
    </footer>
  );
};
