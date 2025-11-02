"use client";

import { useState, useMemo } from "react";
import { Search, MoreVertical, Edit, Key, Power } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type UserType = "admin" | "store" | "supplier";
type UserStatus = "active" | "inactive";

interface User {
  id: string;
  nome: string;
  email: string;
  tipo: UserType;
  status: UserStatus;
  createdAt: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao.silva@guristore.com",
    tipo: "admin",
    status: "active",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria.santos@guristore.com",
    tipo: "admin",
    status: "active",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    nome: "Loja ABC - Pedro Costa",
    email: "store2847@guristore.com",
    tipo: "store",
    status: "active",
    createdAt: "2024-02-01",
  },
  {
    id: "4",
    nome: "Supermercado XYZ - Ana Lima",
    email: "store1532@guristore.com",
    tipo: "store",
    status: "active",
    createdAt: "2024-02-05",
  },
  {
    id: "5",
    nome: "Tech Distribuidora",
    email: "supplier5832@guristore.com",
    tipo: "supplier",
    status: "active",
    createdAt: "2024-02-10",
  },
  {
    id: "6",
    nome: "Office Solutions",
    email: "supplier2749@guristore.com",
    tipo: "supplier",
    status: "active",
    createdAt: "2024-02-12",
  },
  {
    id: "7",
    nome: "Minimercado do Bairro - Carlos Souza",
    email: "store9843@guristore.com",
    tipo: "store",
    status: "inactive",
    createdAt: "2024-01-28",
  },
];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<UserType | "all">("all");

  const filteredUsers = useMemo(() => {
    let users = mockUsers;

    // Filter by type
    if (filterType !== "all") {
      users = users.filter((user) => user.tipo === filterType);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      users = users.filter((user) => user.nome.toLowerCase().includes(query) || user.email.toLowerCase().includes(query));
    }

    return users;
  }, [searchQuery, filterType]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  const getUserTypeConfig = (type: UserType) => {
    const configs = {
      admin: { label: "Admin", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
      store: { label: "Store", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
      supplier: { label: "Supplier", color: "bg-green-500/10 text-green-400 border-green-500/20" },
    };
    return configs[type];
  };

  const handleEdit = (id: string) => {
    console.log("Edit user:", id);
    // TODO: Navigate to edit page or open edit dialog
  };

  const handleResetPassword = (id: string, email: string) => {
    console.log("Reset password for:", email);
    // TODO: Show confirm dialog
    alert(`Password reset link will be sent to ${email}`);
  };

  const handleToggleStatus = (id: string, currentStatus: UserStatus) => {
    const action = currentStatus === "active" ? "deactivate" : "activate";
    console.log(`${action} user:`, id);
    // TODO: Show confirm dialog
    alert(`User will be ${action}d`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white">Users</h1>
          <p className="text-sm text-zinc-400">Manage system users and their permissions</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input placeholder="Search by name or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="border-zinc-800 bg-zinc-950 pl-10" />
          </div>

          <div className="flex gap-2">
            <Button variant={filterType === "all" ? "default" : "outline"} onClick={() => setFilterType("all")} className={filterType !== "all" ? "border-zinc-800 text-zinc-500 hover:text-zinc-950" : ""}>
              All
            </Button>
            <Button variant={filterType === "admin" ? "default" : "outline"} onClick={() => setFilterType("admin")} className={filterType !== "admin" ? "border-zinc-800 text-zinc-500 hover:text-zinc-950" : ""}>
              Admins
            </Button>
            <Button variant={filterType === "store" ? "default" : "outline"} onClick={() => setFilterType("store")} className={filterType !== "store" ? "border-zinc-800 text-zinc-500 hover:text-zinc-950" : ""}>
              Stores
            </Button>
            <Button variant={filterType === "supplier" ? "default" : "outline"} onClick={() => setFilterType("supplier")} className={filterType !== "supplier" ? "border-zinc-800 text-zinc-500 hover:text-zinc-950" : ""}>
              Suppliers
            </Button>
          </div>
        </div>

        {/* Users Table */}
        {filteredUsers.length === 0 ? (
          <Card className="border-zinc-800 bg-zinc-950/80">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-zinc-400">No users found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredUsers.map((user) => {
              const typeConfig = getUserTypeConfig(user.tipo);
              return (
                <Card key={user.id} className="border-zinc-800 bg-zinc-950/80 transition hover:border-zinc-700 hover:bg-zinc-900/60">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-1 items-center gap-4">
                        {/* User Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-white">{user.nome}</h3>
                            <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${typeConfig.color}`}>{typeConfig.label}</span>
                            {user.status === "inactive" && <span className="rounded-full border border-zinc-700 bg-zinc-800/50 px-2.5 py-0.5 text-xs font-medium text-zinc-400">Inactive</span>}
                          </div>
                          <p className="mt-0.5 text-sm text-zinc-400">{user.email}</p>
                        </div>

                        {/* Created Date */}
                        <div className="hidden text-sm text-zinc-400 sm:block">Registered: {formatDate(user.createdAt)}</div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="default" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-950">
                          <DropdownMenuItem onClick={() => handleEdit(user.id)} className="text-zinc-300 hover:text-white">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleResetPassword(user.id, user.email)} className="text-zinc-300 hover:text-white">
                            <Key className="mr-2 h-4 w-4" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-zinc-800" />
                          <DropdownMenuItem onClick={() => handleToggleStatus(user.id, user.status)} className={user.status === "active" ? "text-red-400 hover:text-red-300" : "text-green-400 hover:text-green-300"}>
                            <Power className="mr-2 h-4 w-4" />
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
