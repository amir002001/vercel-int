import { prisma } from "../../server/db/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {
  const reqWord = req.query["word"] as string;

  const words = await autoComplete(reqWord);
  res.status(200).json(words);
}

const autoComplete = async (word: string): Promise<string[]> => {
  const words = await prisma.word.findMany({
    where: {
      text: {
        contains: word,
      },
    },
    take: 20,
  });
  return words.map((word) => word.text);
};
