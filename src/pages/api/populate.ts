import { prisma } from "../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "fs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const buffer = readFileSync("./wordlist.txt", "utf8");
  const words = buffer.toString().split("\n");
  words.pop();

  for (const word of words) {
    await prisma.word.create({ data: { text: word } });
  }
  res.status(200).json({ res: "ok" });
}
