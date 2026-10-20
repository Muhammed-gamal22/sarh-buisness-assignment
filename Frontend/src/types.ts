export interface HeaderCardProps {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
};

export interface PagesLayoutWrapperProps extends HeaderCardProps {
    children: React.ReactNode;
};

export interface ModalStoreProps {
    isOpen: boolean;
    setOpen: (v: boolean) => void;
}

export interface ErrorResponse {
    status: string;
    message: string;
}



export type OrderStatus =
    | "pending"
    | "processing"
    | "completed"
    | "cancelled";

export interface OrderItem {
    productName: string;
    quantity: number;
    unitPrice: number;
}

export interface Order {
    _id: string;
    customerName: string;
    customerEmail: string;
    status: OrderStatus;
    items: OrderItem[];
    amount: number;
    createdAt: string;
    updatedAt: string;
}

export interface OrdersResponse {
    status: "success";
    orders: Order[];
    allOrders: number;
    page: number;
    pages: number;
}