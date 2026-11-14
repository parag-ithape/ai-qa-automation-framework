// Wireframe: Cart — study fixture
export function CartPage() {
  return (
    <div data-testid="cart-page">
      <div data-testid="cart-items" />
      <button data-testid="remove-item">Remove</button>
      <button data-testid="checkout-button">Checkout</button>
    </div>
  );
}
