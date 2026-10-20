
import AddOrderModal from "@/components/orders/AddOrderModal";
import { Button } from "@/components/ui/button";
import CustomLoader from "@/customs/CustomLoader";
import CustomTable from "@/customs/CustomTable";
import EmptyBox from "@/customs/EmptyBox";
import { getData } from "@/services/services";
import useModalStore from "@/store/modal-store";
import { Order, OrderStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import {
    AlertCircle,
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    CalendarDays,
    FilterX,
    PackageSearch,
    Search,
} from "lucide-react";
import { useEffect, useState } from "react";

type OrdersResponse = {
    status: "success";
    orders: Order[];
    allOrders: number;
    page: number;
    pages: number;
};

const statusStyles: Record<OrderStatus, string> = {
    pending: "bg-warning/10 text-warning border-warning/20",
    processing: "bg-primary/10 text-primary border-primary/20",
    completed: "bg-success/10 text-success border-success/20",
    cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels: Record<OrderStatus, string> = {
    pending: "قيد الانتظار",
    processing: "قيد المعالجة",
    completed: "مكتمل",
    cancelled: "ملغي",
};

const Orders = () => {
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const { isOpen, setOpen } = useModalStore()
    const [sortBy, setSortBy] = useState<"createdAt" | "amount">(
        "createdAt"
    );
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
    const [pageIndex, setPageIndex] = useState(0);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setSearch(searchInput.trim());
        }, 400);

        return () => clearTimeout(timeout);
    }, [searchInput]);
    useEffect(() => {
        setPageIndex(0);
    }, [search, statusFilter, sortBy, sortOrder]);

    const {
        data,
        isPending,
        isError,
        error,
        refetch,
        isFetching,
    } = useQuery<OrdersResponse>({
        queryKey: [
            "orders",
            pageIndex,
            search,
            statusFilter,
            sortBy,
            sortOrder,
        ],
        queryFn: () =>
            getData("/orders", {
                page: pageIndex + 1,
                limit: 10,
                ...(search ? { search } : {}),
                ...(statusFilter !== "all"
                    ? { status: statusFilter }
                    : {}),
                sortBy,
                sortOrder,
            }),
    });

    const orders = data?.orders ?? [];
    const totalPages = data?.pages ?? 0;
    const totalOrders = data?.allOrders ?? 0;

    const clearFilters = () => {
        setSearchInput("");
        setSearch("");
        setStatusFilter("all");
        setSortBy("createdAt");
        setSortOrder("desc");
        setPageIndex(0);
    };

    const columns: ColumnDef<Order>[] = [
        {
            accessorKey: "customerName",
            header: "العميل",
            cell: ({ row }) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-semibold text-primary">
                        {row.original.customerName.trim().charAt(0).toUpperCase()}
                    </div>

                    <div className="flex min-w-0 flex-col gap-1">
                        <p className="font-medium">
                            {row.original.customerName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            #{row.original._id.slice(-8)}
                        </p>
                    </div>
                </div>
            ),
        },
        {
            accessorKey: "customerEmail",
            header: "البريد الإلكتروني",
            cell: ({ row }) => (
                <span className="text-sm text-muted-foreground">
                    {row.original.customerEmail}
                </span>
            ),
        },
        {
            accessorKey: "status",
            header: "الحالة",
            cell: ({ row }) => (
                <span
                    className={`inline-flex whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[row.original.status]
                        }`}
                >
                    {statusLabels[row.original.status]}
                </span>
            ),
        },
        {
            id: "itemsCount",
            accessorFn: (row) => row.items.length,
            header: "المنتجات",
            cell: ({ row }) => (
                <span className="text-sm">
                    {row.original.items.length} منتجات
                </span>
            ),
        },
        {
            accessorKey: "amount",
            header: "الإجمالي",
            cell: ({ row }) => (
                <span className="whitespace-nowrap font-semibold">
                    {new Intl.NumberFormat("en-US").format(
                        row.original.amount
                    )}
                </span>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "تاريخ الطلب",
            cell: ({ row }) => (
                <span className="whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(row.original.createdAt).toLocaleDateString(
                        "ar-EG",
                        {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        }
                    )}
                </span>
            ),
        },
    ];

    return (
        <div className="space-y-5" dir="rtl">

            <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">إدارة الطلبات</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        ابحث عن الطلبات وفلترها ورتبها بسهولة.
                    </p>
                </div>



                <div className="rounded-xl border bg-card px-4 py-2.5">
                    <p className="text-xs text-muted-foreground">
                        إجمالي الطلبات المطابقة
                    </p>
                    <p className="mt-1 text-xl font-bold">
                        {totalOrders.toLocaleString("en-US")}
                    </p>
                </div>
                <Button onClick={() => setOpen(!isOpen)} className="bg-primary text-white hover:bg-primary/90">
                    إضافة طلب
                </Button>
            </div>


            <div className="rounded-2xl border bg-card p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {/* Search */}
                    <div className="space-y-2 xl:col-span-2">
                        <label
                            htmlFor="order-search"
                            className="text-sm font-medium"
                        >
                            البحث عن طلب
                        </label>

                        <div className="relative">
                            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                            <input
                                id="order-search"
                                type="search"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="اسم العميل أو البريد الإلكتروني..."
                                className="h-10 w-full rounded-lg border bg-background pr-10 pl-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>


                    <div className="space-y-2">
                        <label
                            htmlFor="order-status"
                            className="text-sm font-medium"
                        >
                            حالة الطلب
                        </label>

                        <select
                            id="order-status"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                        >
                            <option value="all">كل الحالات</option>
                            <option value="pending">قيد الانتظار</option>
                            <option value="processing">قيد المعالجة</option>
                            <option value="completed">مكتمل</option>
                            <option value="cancelled">ملغي</option>
                        </select>
                    </div>

                    {/* Sort field */}
                    <div className="space-y-2">
                        <label
                            htmlFor="order-sort"
                            className="text-sm font-medium"
                        >
                            ترتيب حسب
                        </label>

                        <select
                            id="order-sort"
                            value={sortBy}
                            onChange={(e) =>
                                setSortBy(e.target.value as "createdAt" | "amount")
                            }
                            className="h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary"
                        >
                            <option value="createdAt">تاريخ الطلب</option>
                            <option value="amount">قيمة الطلب</option>
                        </select>
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                    <button
                        type="button"
                        onClick={() =>
                            setSortOrder((current) =>
                                current === "asc" ? "desc" : "asc"
                            )
                        }
                        className="inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-sm transition hover:bg-muted"
                    >
                        {sortOrder === "asc" ? (
                            <ArrowUp className="h-4 w-4" />
                        ) : (
                            <ArrowDown className="h-4 w-4" />
                        )}

                        {sortOrder === "asc"
                            ? "تصاعدي: من الأقل للأعلى"
                            : "تنازلي: من الأعلى للأقل"}
                    </button>

                    <button
                        type="button"
                        onClick={clearFilters}
                        disabled={
                            !searchInput &&
                            !search &&
                            statusFilter === "all" &&
                            sortBy === "createdAt" &&
                            sortOrder === "desc"
                        }
                        className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-muted-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <FilterX className="h-4 w-4" />
                        مسح الفلاتر
                    </button>
                </div>

                {isFetching && !isPending && (
                    <p className="mt-3 text-xs text-muted-foreground">
                        جاري تحديث النتائج...
                    </p>
                )}
            </div>
            {isPending ? (
                <CustomLoader />
            ) : isError ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
                    <AlertCircle className="h-10 w-10 text-destructive" />

                    <h2 className="font-semibold">
                        تعذر تحميل الطلبات
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        {error instanceof Error
                            ? error.message
                            : "حدث خطأ أثناء الاتصال بالخادم."}
                    </p>

                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
                    >
                        إعادة المحاولة
                    </button>
                </div>
            ) : orders.length === 0 ? (
                <EmptyBox
                    title="لا توجد طلبات مطابقة"
                    icon={<PackageSearch className="h-12 w-12" />}
                />
            ) : (
                <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
                        <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                                نتائج الطلبات
                            </span>
                        </div>

                        <span className="text-xs text-muted-foreground">
                            الصفحة {pageIndex + 1} من {totalPages}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <CustomTable
                            columns={columns}
                            data={orders}
                            onPageChange={setPageIndex}
                            pageSize={10}
                            totalPages={totalPages}
                            pageIndex={pageIndex}
                        />
                    </div>
                </div>
            )}
            {isOpen && <AddOrderModal />}
        </div>
    );
};

export default Orders;
