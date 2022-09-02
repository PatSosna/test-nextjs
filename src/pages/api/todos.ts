// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const todoList = async (req: NextApiRequest, res: NextApiResponse) => {
  const todoList = await prisma.todo.findMany();
  res.status(200).json(todoList);
};

export default todoList;
