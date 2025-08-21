// Site footer (server component)
// AI disclosure: assisted by GPT-5 Pro.
export default function Footer() {
  const today = new Date("2025-08-21");
  const dateStr = today.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" });
  return (
    <footer className="site-footer">
      <div className="container">
        <p>
          &copy; {new Date("2025-08-21").getFullYear()} Cong Chinh Phan — Student No. 21405057 — {
            dateStr
          }
        </p>
      </div>
    </footer>
  );
}
