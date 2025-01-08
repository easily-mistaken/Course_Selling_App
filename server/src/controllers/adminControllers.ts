import { Request, Response } from "express";
import {
  createCourseSchema,
  signinSchema,
  signupSchema,
  updateCourseSchema,
} from "../types/zod";
import client from "../utils/prisma";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const validateData = signupSchema.safeParse(req.body);

    if (!validateData.success) {
      res.status(411).json({ error: validateData.error });
      return;
    }
    const { name, email, password } = validateData.data;

    const hashedPassword = await hash(password, 10);
    const existingUser = await client.creator.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({ error: "User already exists" });
      return;
    }

    const user = await client.creator.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.ADMIN_JWT_SECRET as string
    );

    res.cookie("auth", token, {
      httpOnly: true,
      sameSite: "none",
      // secure: "true",
      path: "/",
    });

    res.status(201).json({ message: "User created successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
    return;
  }
};

export async function signIn(req: Request, res: Response) {
  try {
    const validateData = signinSchema.safeParse(req.body);

    if (!validateData.success) {
      res.status(411).json({ error: validateData.error });
      return;
    }
    const { email, password } = validateData.data;

    const user = await client.creator.findFirst({
      where: { email: email },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const comparePassword = await compare(password, user.password);
    if (!comparePassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.ADMIN_JWT_SECRET as string
    );

    res.cookie("auth", token, {
      httpOnly: true,
      sameSite: "none",
      // secure: "true",
      path: "/",
    });

    res.status(200).json({ message: "User signed in successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to sign in user" });
    return;
  }
}

export async function createCourse(req: Request, res: Response) {
  try {
    const validateInput = createCourseSchema.safeParse(req.body);
    if (!validateInput.success) {
      res.status(400).json({ error: validateInput.error });
      return;
    }

    const { title, description, price, imageUrl } = validateInput.data;
    const creatorId = res.locals.Admin.creatorId;

    console.log(creatorId);

    const creator = await client.user.findFirst({
      where: { id: creatorId },
    });
    if (!creator) {
      res.status(404).json({ error: "Creator not found" });
      return;
    }

    const course = await client.course.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        creator: {
          connect: {
            id: creatorId,
          },
        },
      },
    });

    res.status(201).json({ message: "Course created successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function updateCourse(req: Request, res: Response) {
  try {
    const courseId = req.params.courseId;
    const validateInput = updateCourseSchema.safeParse(req.body);

    if (!validateInput.success) {
      res.status(400).json({ error: validateInput.error });
      return;
    }

    const { title, description, price, imageUrl } = validateInput.data;

    if (!title && !description && !price && !imageUrl) {
      res.status(400).json({ message: "No fields provided for update." });
      return;
    }

    const updatedCourse = await client.course.update({
      where: { id: courseId },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(price && { price }),
        ...(imageUrl && { imageUrl }),
      },
    });
    res.status(200).json({ message: "Course updated successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
}

export async function deleteCourse(req: Request, res: Response) {
  try {
    const courseId = req.params.courseId;
    const id = res.locals.Admin.creatorId;

    const course = await client.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      res.status(404).json({ error: "Course not found" });
      return;
    }

    if (course.creatorId !== id) {
      res
        .status(403)
        .json({ error: "You are not authorized to delete this course" });
      return;
    }

    const response = client.course.delete({
      where: { id: courseId },
    });

    res.status(200).json({ message: "Course deleted successfully" });
    return;
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
    return;
  }
}
