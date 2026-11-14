// Wireframe: Checkout — study fixture
export function CheckoutPage() {
  return (
    <form data-testid="checkout-form">
      <input name="firstName" placeholder="First Name" />
      <input name="lastName" placeholder="Last Name" />
      <input name="postalCode" placeholder="Postal Code" />
      <button type="submit" data-testid="continue-button">Continue</button>
    </form>
  );
}
