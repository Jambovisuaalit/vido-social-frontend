import { ImageResponse } from "next/og";

export const alt = "Nyholm Brothers – rakentamista sovitusti";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#0d0d0d",
          color: "#f7f4ee",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "64px 72px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background: "#f56800",
            height: 10,
            left: 0,
            position: "absolute",
            top: 0,
            width: "100%",
          }}
        />
        <div
          style={{
            alignItems: "center",
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#f56800", marginRight: 12 }}>▲</span>
          NYHOLM BROTHERS
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#f56800",
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.12em",
              marginBottom: 24,
              textTransform: "uppercase",
            }}
          >
            Rakennusliike · Espoo
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1,
              maxWidth: 980,
            }}
          >
            Rakentamista, joka etenee sovitusti.
          </div>
        </div>
        <div
          style={{
            color: "#b9b6b0",
            display: "flex",
            fontSize: 24,
            justifyContent: "space-between",
          }}
        >
          <span>Remontit · Piharakennukset · Vaativat kohteet</span>
          <span>nyholmbrothers.fi</span>
        </div>
      </div>
    ),
    size,
  );
}
