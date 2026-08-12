import { ImageResponse } from "next/og";

export const alt = "A Regra é Clara — descubra o que vem primeiro";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#171512",
          color: "#fbf7ee",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 850,
            padding: "60px 68px 54px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            A REGRA É CLARA.
          </div>
          <div
            style={{
              width: 86,
              height: 5,
              marginTop: 30,
              background: "#bc5637",
              display: "flex",
            }}
          />
          <div
            style={{
              marginTop: 70,
              display: "flex",
              flexDirection: "column",
              fontSize: 74,
              fontWeight: 760,
              lineHeight: 0.95,
              letterSpacing: "-0.055em",
            }}
          >
            <span>Você não precisa</span>
            <span style={{ color: "#bc5637", fontSize: 104 }}>mudar tudo.</span>
            <span style={{ marginTop: 16 }}>Precisa saber o</span>
            <span>que vem primeiro.</span>
          </div>
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              color: "rgba(251,247,238,.66)",
              fontSize: 17,
            }}
          >
            Diagnóstico gratuito · 10 perguntas · cerca de 90 segundos
          </div>
        </div>

        <div
          style={{
            width: 350,
            padding: "60px 50px",
            background: "#bc5637",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              paddingBottom: 18,
              borderBottom: "2px solid rgba(251,247,238,.55)",
              display: "flex",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Um ponto de partida
          </div>
          <div
            style={{
              margin: "auto 0",
              display: "flex",
              flexDirection: "column",
              fontSize: 46,
              fontWeight: 650,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
            }}
          >
            <span>Comece pelo</span>
            <span>que organiza</span>
            <span>o resto.</span>
          </div>
          <div
            style={{
              paddingTop: 18,
              borderTop: "2px solid rgba(251,247,238,.55)",
              display: "flex",
              fontSize: 17,
              lineHeight: 1.35,
            }}
          >
            Sem rótulo. Sem julgamento. Com direção.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
