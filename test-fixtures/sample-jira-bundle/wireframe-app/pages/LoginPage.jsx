// Wireframe: Login — study fixture (not runnable app)
export function LoginPage() {
  return (
    <form data-testid="login-form">
      <input name="username" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
      <div data-testid="login-error" hidden>Invalid credentials</div>
    </form>
  );
}
