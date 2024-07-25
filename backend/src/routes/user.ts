import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import z from "zod";
import { signinInput, signupInput } from "@saurabhthedev/medium-common";


export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        SECRET: string
    }
}>();


// or we can use the ts ignore here and we can also give type to c but it becomes hectic
// environment variables have to decalred inside as they are not accessible outside

userRouter.post('/signup', async (c) => {
    // const dbUrl = c.env.DATABASE_URL;
    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({error: "Invalid inputs"});
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        })

        // const payload = {
        //   sub: 'user123',
        //   role: 'admin',
        //   exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expires in 5 minutes
        // }
        const secret = c.env.SECRET
        const token = await sign({ id: user.id }, secret)

        return c.json({ token });
    }
    catch (err) {
        console.log(err);
        return c.status(411);
    }
})

userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const {success} = signinInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({error: "Invalid inputs"});
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password
            }
        });
        if (!user) {
            c.status(403);
            return c.json("user not found");
        }

        const token = await sign({ id: user.id }, c.env.SECRET);
        return c.json({ token });
    }
    catch (errr) {
        console.log(errr);
        return c.status(403);
    }
})
