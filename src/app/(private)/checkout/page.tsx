import { Separator } from "@/components/ui/separator";
import { SiWolframlanguage } from "react-icons/si";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";

export default function CheckoutPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex justify-center gap-10">
        <div className="flex flex-col gap-3 items-start">
          <a href="/" className="bg-black p-2 rounded-lg flex items-center justify-center border border-zinc-800 hover:transform hover:scale-105 transition-transform">
            <SiWolframlanguage size={26} color="white" />
          </a>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-zinc-500 hover:underline hover:text-white">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-bold">Information</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-zinc-500">Shipping</BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-zinc-500">Payment</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-col gap-3 items-start">
            <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
          </div>
        </div>
        <Separator orientation="vertical" className="h-12 bg-gray-400" />
        <div className="">asd</div>
      </div>
    </main>
  );
}
