import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const method = req.method;

  if (method === "DELETE") {
    const id = req.body.id;
    const result = await prisma.room.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(result);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  
}


