import { Request, Response } from "express";
import client from "../utils/prisma";

export async function purchaseCourse(req: Request, res: Response) {
  try {
    const courseId = req.params.courseId;
    const userId = res.locals.User.id;

    const course = await client.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    const existingPurchase = await client.purchase.findFirst({
      where: {
        studentId: userId,
        courseId: courseId,
      },
    });

    if (existingPurchase) {
      res.status(400).json({ error: "Course already purchased" });
      return;
    }

    const purchase = await client.purchase.create({
      data: {
        studentId: userId,
        courseId: courseId,
      },
    });

    res.status(201).json({ message: "Course purchased successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to purchase course" });
    return;
  }
}

export function getPurchases(req: Request, res: Response) {
  try {
    const userId = res.locals.User.id;

    const purchases = client.purchase.findMany({
      where: { studentId: userId },
      include: { course: true },
    });

    res.status(200).json({ purchases });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to get purchases" });
    return;
  }
}
