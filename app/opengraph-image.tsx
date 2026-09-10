import { ImageResponse } from "next/og";

export const alt = "VIDO Social — Työmaat näkyviksi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0B1324",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "980px", width: "100%" }}>
          <div style={{ color: "#FF1A1A", display: "flex", fontSize: 34, fontWeight: 800, letterSpacing: "0.08em" }}>
            VIDO SOCIAL
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 34 }}>
            Työmaakuvat WhatsAppiin.
          </div>
          <div style={{ color: "#FF1A1A", display: "flex", fontSize: 76, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.05, marginTop: 8 }}>
            Me hoidamme somen.
          </div>
          <div style={{ color: "#C4CBD6", display: "flex", fontSize: 30, marginTop: 42 }}>
            12 julkaisua / kk · Facebook + Instagram · 500 € / kk + ALV
          </div>
        </div>
      </div>
    ),
    size
  );
}
