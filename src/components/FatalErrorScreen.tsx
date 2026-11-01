export function FatalErrorScreen() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
        background: "#030305",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "34rem" }}>
        <h1 style={{ marginBottom: "1rem" }}>The page could not finish rendering.</h1>
        <p style={{ marginBottom: "1.5rem", color: "#c7c7d1" }}>
          Refresh the page to retry. If the problem continues, disable browser extensions for this local site.
        </p>
        <button type="button" className="button" onClick={() => window.location.reload()}>
          Refresh page
        </button>
      </div>
    </main>
  );
}
