import type { VercelRequest, VercelResponse } from "@vercel/node";
import React from "react";
import satori from "satori";
import fetch from "node-fetch";

import sharp from "sharp";
// import { ZozoCard } from "../components/ZozoCard";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const fontData = await fetch(
    "https://fonts.gstatic.com/s/notoserifjp/v21/xn7mYHs72GKoTvER4Gn3b5eMXNg.otf"
  ).then((res) => res.arrayBuffer());

  const svg = await satori(<div>hoge</div>, {
    width: 400,
    height: 400,
    fonts: [
      {
        name: "Noto Serif JP",
        data: fontData,
      },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  console.log(png);

  return res.status(200).setHeader("Content-Type", "image/png").send(png);
}
