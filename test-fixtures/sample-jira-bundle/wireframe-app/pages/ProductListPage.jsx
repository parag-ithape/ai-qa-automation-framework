// Wireframe: Product listing — study fixture
export function ProductListPage() {
  return (
    <div data-testid="product-list">
      <select data-testid="sort-dropdown" aria-label="Sort products">
        <option value="name-asc">Name (A to Z)</option>
        <option value="name-desc">Name (Z to A)</option>
        <option value="price-asc">Price (low to high)</option>
        <option value="price-desc">Price (high to low)</option>
      </select>
      <div className="product-grid">
        <button data-testid="add-to-cart">Add to cart</button>
      </div>
      <span data-testid="cart-badge">0</span>
    </div>
  );
}
