"use client";

import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>✕</div>

        <h1 style={styles.title}>Payment not completed</h1>

        <p style={styles.text}>
          Your payment was not completed. This may happen if the transaction was
          cancelled or declined. No charges were made.
        </p>

        <div style={styles.actions}>
          <button onClick={() => router.push("/")} style={styles.primaryBtn}>
            Try Again
          </button>

          <button
            onClick={() => router.push("/")}
            style={styles.secondaryBtn}
          >
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
    fontFamily: "Inter, Arial",
    padding: 20,
  },
  card: {
    background: "white",
    borderRadius: 24,
    padding: 40,
    maxWidth: 480,
    textAlign: "center",
    boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
  },
  icon: {
    width: 70,
    height: 70,
    margin: "0 auto 20px",
    borderRadius: "50%",
    background: "#fee2e2",
    color: "#dc2626",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 28,
    fontWeight: "bold",
  },
  title: {
    fontSize: 26,
    marginBottom: 12,
    color: "#111827",
  },
  text: {
    color: "#6b7280",
    lineHeight: 1.6,
    marginBottom: 24,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  primaryBtn: {
    padding: "14px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "12px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "white",
    cursor: "pointer",
  },
};