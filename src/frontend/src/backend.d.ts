import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Category {
    id: string;
    name: string;
}
export type Timestamp = bigint;
export interface OrderItem {
    productId: bigint;
    productName: string;
    quantity: bigint;
    priceAtPurchase: number;
}
export type ProductId = bigint;
export interface OrderItemInput {
    productId: bigint;
    quantity: bigint;
}
export interface Order {
    id: OrderId;
    customerName: string;
    status: OrderStatus;
    deliveryAddress: string;
    paymentMethod: string;
    customerPhone: string;
    deliveryPincode: string;
    createdAt: Timestamp;
    deliveryCity: string;
    items: Array<OrderItem>;
    totalPrice: number;
}
export type OrderId = bigint;
export interface Product {
    id: ProductId;
    name: string;
    description: string;
    stock: bigint;
    category: string;
    price: number;
    images: Array<string>;
}
export enum OrderStatus {
    shipped = "shipped",
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed"
}
export interface backendInterface {
    addProduct(token: string, name: string, description: string, price: number, category: string, images: Array<string>, stock: bigint): Promise<bigint>;
    adminLogin(username: string, password: string): Promise<string | null>;
    createOrder(items: Array<OrderItemInput>, customerName: string, customerPhone: string, deliveryAddress: string, deliveryCity: string, deliveryPincode: string, paymentMethod: string): Promise<bigint>;
    deleteProduct(token: string, id: bigint): Promise<boolean>;
    editProduct(token: string, id: bigint, name: string, description: string, price: number, category: string, images: Array<string>, stock: bigint): Promise<boolean>;
    getOrder(id: bigint): Promise<Order | null>;
    getOrdersByPhone(phone: string): Promise<Array<Order>>;
    getProduct(id: bigint): Promise<Product | null>;
    listCategories(): Promise<Array<Category>>;
    listOrders(token: string): Promise<Array<Order>>;
    listProducts(category: string | null, minPrice: number | null, maxPrice: number | null): Promise<Array<Product>>;
    updateOrderStatus(token: string, id: bigint, status: string): Promise<boolean>;
    verifyAdmin(token: string): Promise<boolean>;
}
