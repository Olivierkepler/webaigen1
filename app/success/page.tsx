export default function Success() {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
          fontFamily: "Arial, sans-serif",
          padding: 24,
        }}
      >
        <section
          style={{
            maxWidth: 520,
            background: "white",
            padding: 36,
            borderRadius: 24,
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.12)",
            textAlign: "center",
          }}
        >
          <h1>Payment Successful ✅</h1>
          <p>Your test payment was completed successfully.</p>
          <a href="/" style={{ color: "#4f46e5", fontWeight: 700 }}>
            Back to Home
          </a>
        </section>
      </main>
    );
  }