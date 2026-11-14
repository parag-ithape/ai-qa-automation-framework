export const routes = [
  { path: "/login", page: "LoginPage", auth: false },
  { path: "/inventory", page: "ProductListPage", auth: true },
  { path: "/cart", page: "CartPage", auth: true },
  { path: "/checkout-step-one", page: "CheckoutPage", auth: true },
  { path: "/checkout-complete", page: "OrderConfirmationPage", auth: true },
];
