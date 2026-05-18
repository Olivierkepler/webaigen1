"use client";

export default function Home() {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();

    if (data.url) window.location.href = data.url;
    else alert(data.error || "Checkout failed");
  };

  return (
    <main style={styles.page}>
      <nav style={styles.nav}>
        <div style={styles.logo}>Webaigen</div>
        <div style={styles.secure}>🔒 Secure Checkout</div>
      </nav>

      <section style={styles.wrapper}>
        <div style={styles.left}>
          <span style={styles.badge}>AI Software & Automation Services</span>

          <h1 style={styles.title}>
            Build smarter business operations with Webaigen.
          </h1>

          <p style={styles.subtitle}>
            We help businesses automate workflows, build AI-powered software,
            and create scalable digital systems that save time, reduce manual
            work, and improve efficiency.
          </p>

          <div style={styles.features}>
            <div style={styles.feature}>
              ✓ Custom AI automation for business workflows
            </div>
            <div style={styles.feature}>
              ✓ Web apps, dashboards, and software solutions
            </div>
            <div style={styles.feature}>
              ✓ Secure Stripe-powered project payment
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <p style={styles.label}>Order Summary</p>
              <h2 style={styles.cardTitle}>
                Webaigen AI Automation Package
              </h2>
            </div>
            <span style={styles.status}>Test Mode</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.row}>
            <span>AI Software Consultation</span>
            <strong>$25.00</strong>
          </div>

          <div style={styles.rowMuted}>
            <span>Service type</span>
            <span>AI automation & software development</span>
          </div>

          <div style={styles.rowMuted}>
            <span>Payment type</span>
            <span>Project deposit / consultation fee</span>
          </div>

          <div style={styles.rowMuted}>
            <span>Processing</span>
            <span>Stripe Secure Checkout</span>
          </div>

          <div style={styles.divider} />

          <div style={styles.totalRow}>
            <span>Total</span>
            <strong>$25.00 USD</strong>
          </div>

          <button onClick={handleCheckout} style={styles.button}>
            Continue to Secure Payment
          </button>

          <p style={styles.note}>
            You will be redirected to Stripe’s secure checkout page to complete
            your Webaigen service payment. This is currently running in test
            mode.
          </p>
        </div>
      </section>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top left, #dbeafe, transparent 35%), linear-gradient(135deg, #020617, #0f172a)",
    color: "white",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Arial",
    padding: 32,
  },
  nav: {
    maxWidth: 1120,
    margin: "0 auto 80px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    letterSpacing: "-0.03em",
  },
  secure: {
    fontSize: 14,
    color: "#cbd5e1",
    border: "1px solid rgba(255,255,255,0.16)",
    padding: "10px 14px",
    borderRadius: 999,
    background: "rgba(255,255,255,0.06)",
  },
  wrapper: {
    maxWidth: 1120,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 48,
    alignItems: "center",
  },
  left: {
    maxWidth: 620,
  },
  badge: {
    display: "inline-block",
    padding: "9px 14px",
    borderRadius: 999,
    background: "rgba(99,102,241,0.18)",
    color: "#c7d2fe",
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 22,
    border: "1px solid rgba(199,210,254,0.24)",
  },
  title: {
    fontSize: 58,
    lineHeight: 1.02,
    letterSpacing: "-0.06em",
    margin: "0 0 22px",
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 1.7,
    color: "#cbd5e1",
    maxWidth: 560,
    marginBottom: 32,
  },
  features: {
    display: "grid",
    gap: 14,
    color: "#e2e8f0",
    fontSize: 16,
  },
  feature: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "14px 16px",
    borderRadius: 16,
  },
  card: {
    background: "white",
    color: "#0f172a",
    borderRadius: 28,
    padding: 32,
    boxShadow: "0 30px 90px rgba(0,0,0,0.35)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    alignItems: "flex-start",
  },
  label: {
    margin: "0 0 8px",
    color: "#64748b",
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  cardTitle: {
    margin: 0,
    fontSize: 26,
    lineHeight: 1.2,
    letterSpacing: "-0.03em",
  },
  status: {
    background: "#eef2ff",
    color: "#4f46e5",
    padding: "8px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 800,
    whiteSpace: "nowrap",
  },
  divider: {
    height: 1,
    background: "#e2e8f0",
    margin: "24px 0",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 16,
    marginBottom: 16,
  },
  rowMuted: {
    display: "flex",
    justifyContent: "space-between",
    gap: 20,
    fontSize: 14,
    color: "#64748b",
    marginBottom: 14,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 22,
    marginBottom: 24,
  },
  button: {
    width: "100%",
    padding: "17px 20px",
    borderRadius: 16,
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 16px 36px rgba(79,70,229,0.35)",
  },
  note: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 13,
    lineHeight: 1.5,
    margin: "18px 0 0",
  },
};