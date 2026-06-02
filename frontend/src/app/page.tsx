export default function Home() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>CareerPilot AI</h1>

      <h2>Register</h2>

      <form>
        <input
          type="email"
          placeholder="Email"
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
        />
        <br />
        <br />

        <button>
          Register
        </button>
      </form>

      <hr />

      <h2>Login</h2>

      <form>
        <input
          type="email"
          placeholder="Email"
        />
        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
        />
        <br />
        <br />

        <button>
          Login
        </button>
      </form>
    </main>
  );
}
