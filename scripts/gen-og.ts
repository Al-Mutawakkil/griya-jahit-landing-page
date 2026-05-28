import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";

const ROOT = resolve(import.meta.dirname, "..");
const OUTPUT = resolve(ROOT, "public/og-image.png");

async function loadFont() {
  const url =
    "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIbaomQNQcsA88c7O9yZ4KMCoOg4IA6-91aHEjcWuA_m07NSg.ttf";

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch Plus Jakarta Sans: ${response.status}`);

  return Buffer.from(await response.arrayBuffer());
}

function buildMarkup() {
  return {
    type: "div",
    props: {
      style: {
        width: 1200,
        height: 630,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 76,
        background: "#fbf8f1",
        color: "#1c1917",
        position: "relative",
        fontFamily: "Plus Jakarta Sans",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(135,61,40,0.12), rgba(40,99,69,0.08) 48%, rgba(255,255,255,0))",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              right: -120,
              top: -120,
              width: 390,
              height: 390,
              borderRadius: 999,
              background: "#f5e3d7",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              left: -90,
              bottom: -110,
              width: 330,
              height: 330,
              borderRadius: 999,
              background: "#dbe8dd",
            },
          },
        },
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              position: "relative",
            },
            children: [
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "center", gap: 18 },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          width: 60,
                          height: 60,
                          borderRadius: 14,
                          background: "#873d28",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 28,
                          fontWeight: 800,
                        },
                        children: "FJ",
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: { display: "flex", flexDirection: "column" },
                        children: [
                          {
                            type: "div",
                            props: {
                              style: { fontSize: 32, fontWeight: 800 },
                              children: "Toko Jahit Fajar",
                            },
                          },
                          {
                            type: "div",
                            props: {
                              style: {
                                marginTop: 6,
                                fontSize: 18,
                                fontWeight: 600,
                                color: "#6b625a",
                              },
                              children: "Cibarusah, Kabupaten Bekasi",
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    borderRadius: 999,
                    background: "#ffffff",
                    border: "1px solid #e5ded5",
                    padding: "14px 22px",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#286345",
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: {
                          width: 10,
                          height: 10,
                          borderRadius: 999,
                          background: "#22c55e",
                        },
                      },
                    },
                    "Tanya via WhatsApp",
                  ],
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 24,
              maxWidth: 960,
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 78,
                    lineHeight: 1.04,
                    fontWeight: 800,
                    letterSpacing: "-0.035em",
                  },
                  children: "Toko alat jahit & permak pakaian di Cibarusah",
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: 28,
                    lineHeight: 1.42,
                    color: "#575049",
                    fontWeight: 600,
                    maxWidth: 860,
                  },
                  children:
                    "Toko Alat-Alat Jahit Fajar menyediakan bahan jahit, alat mesin jahit, dan layanan permak pakaian praktis.",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              position: "relative",
              display: "flex",
              gap: 14,
              fontSize: 20,
              fontWeight: 700,
              color: "#873d28",
            },
            children: "Alat & Bahan Jahit  •  Permak Pakaian  •  Kabupaten Bekasi",
          },
        },
      ],
    },
  };
}

async function main() {
  const jakarta = await loadFont();

  const svg = await satori(buildMarkup() as any, {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Plus Jakarta Sans", data: jakarta, weight: 500, style: "normal" },
    ],
  });

  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();

  if (!existsSync(dirname(OUTPUT))) mkdirSync(dirname(OUTPUT), { recursive: true });
  writeFileSync(OUTPUT, png);
  console.log(`Wrote ${OUTPUT} (${png.byteLength} bytes)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
