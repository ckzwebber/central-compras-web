"use client";

import { FormEvent, useMemo, useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiWolframlanguage } from "react-icons/si";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { OrderSummary } from "@/components/order-summary";
import useCart from "@/hooks/states/use-cart";
import useCheckout from "@/hooks/states/use-checkout";
import { authService } from "@/lib/auth";
import { lojasService } from "@/lib/lojas";
import { enderecosService, type Endereco } from "@/lib/enderecos";
import type { User } from "@/types/auth";
import { ArrowLeft } from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const { checkoutData, setCheckoutData } = useCheckout();
  const cartItems = cart?.produtos ?? [];
  const [user, setUser] = useState<User | null>(null);
  const [endereco, setEndereco] = useState<Endereco | null>(null);
  const [loading, setLoading] = useState(true);

  const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.valor_unitario * item.quantidade, 0), [cartItems]);

  const total = cart?.total ?? subtotal;

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const currentUser = authService.getUser();
        setUser(currentUser);

        if (currentUser?.sub) {
          const lojas = await lojasService.getMinhasLojas();
          if (lojas && lojas.length > 0 && lojas[0].endereco_id) {
            const enderecoData = await enderecosService.getById(lojas[0].endereco_id);
            setEndereco(enderecoData);
            console.log(enderecoData.estado);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      email: formData.get("email") as string,
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      address: formData.get("address") as string,
      apartment: formData.get("apartment") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postalCode: formData.get("postalCode") as string,
      phone: formData.get("phone") as string,
      country: formData.get("country") as string,
    };

    setCheckoutData(data);
    router.push("/store/checkout/shipping");
  };

  return (
    <main className="bg-zinc-950 text-zinc-100">
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <div className="rounded-xl border border-transparent px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="inline-flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-black transition-transform hover:scale-105">
              <SiWolframlanguage size={26} className="text-white" />
            </Link>

            <Breadcrumb>
              <BreadcrumbList className="flex flex-wrap gap-2 text-sm text-zinc-100/90">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-zinc-200 transition hover:text-white">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-zinc-200" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-white">Information</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-zinc-200" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-zinc-200">Shipping</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-zinc-200" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-zinc-200">Payment</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_auto_minmax(320px,1fr)] lg:items-start">
          <section className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-7">
              <section className="rounded-xl bg-zinc-950/80 p-5 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold">Contact information</h2>
                  <p className="text-sm text-zinc-400">We&apos;ll use these details to keep you updated about your order.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input className="border-zinc-800" id="email" name="email" type="email" placeholder="you@example.com" defaultValue={checkoutData?.email || user?.email || ""} required autoComplete="email" />
                  </div>
                </div>
              </section>

              <section className="rounded-xl bg-zinc-950/80 p-5 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold">Shipping address</h2>

                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country/Region</Label>
                    <select
                      id="country"
                      name="country"
                      defaultValue="Brazil"
                      className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-200 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40">
                      <option value="Brazil">Brazil</option>
                    </select>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input className="border-zinc-800" id="firstName" name="firstName" autoComplete="given-name" placeholder="Maria" defaultValue={checkoutData?.firstName || user?.nome || ""} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input className="border-zinc-800" id="lastName" name="lastName" autoComplete="family-name" placeholder="Silva" defaultValue={checkoutData?.lastName || user?.sobrenome || ""} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      className="border-zinc-800"
                      id="address"
                      name="address"
                      autoComplete="street-address"
                      placeholder="Rua Exemplo, 123"
                      defaultValue={checkoutData?.address || (endereco ? `${endereco.rua}, ${endereco.numero}` : "")}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input className="border-zinc-800" id="apartment" name="apartment" autoComplete="address-line2" placeholder="Apto 45" defaultValue={checkoutData?.apartment || endereco?.complemento || ""} />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input className="border-zinc-800" id="city" name="city" autoComplete="address-level2" placeholder="São Paulo" defaultValue={checkoutData?.city || endereco?.cidade || ""} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <select
                        id="state"
                        name="state"
                        className="h-10 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-200 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                        defaultValue={checkoutData?.state || endereco?.estado || "SP"}>
                        <option value="AC">Acre</option>
                        <option value="AL">Alagoas</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="DF">Distrito Federal</option>
                        <option value="ES">Espírito Santo</option>
                        <option value="GO">Goiás</option>
                        <option value="MA">Maranhão</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="PA">Pará</option>
                        <option value="PB">Paraíba</option>
                        <option value="PR">Paraná</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="SC">Santa Catarina</option>
                        <option value="SP">São Paulo</option>
                        <option value="SE">Sergipe</option>
                        <option value="TO">Tocantins</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal code</Label>
                      <Input className="border-zinc-800" id="postalCode" name="postalCode" autoComplete="postal-code" placeholder="00000-000" defaultValue={checkoutData?.postalCode || endereco?.cep || ""} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input className="border-zinc-800" id="phone" name="phone" type="tel" autoComplete="tel" placeholder="(11) 99999-9999" defaultValue={checkoutData?.phone || ""} />
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button asChild variant="link" className="group gap-2 px-0 text-sm text-zinc-300 hover:text-white">
                  <Link href="/">
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                    Return to cart
                  </Link>
                </Button>
                <Button type="submit" className="w-full sm:w-auto">
                  Continue to shipping
                </Button>
              </div>
            </form>
          </section>

          <Separator orientation="vertical" decorative className="hidden h-full w-px justify-self-center self-stretch bg-zinc-800/80 lg:block" />

          <OrderSummary items={cartItems} subtotal={subtotal} total={total} />
        </div>
      </div>
    </main>
  );
}
