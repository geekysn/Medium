import { createBlogInput, updateBlogInput } from "@saurabhthedev/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from 'hono/jwt'
import { JWTPayload } from "hono/utils/jwt/types";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        SECRET: string
    }
    Variables:{
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next)=>{
    const token = c.req.header("authorization") || "";

    // const token = header.split(" ")[1];
    // ["Bearer","token"]

    try{
        const res = await verify(token, c.env.SECRET) as JWTPayload;

        if(res){
            c.set('userId', `${res.id}`);
            await next();
        }
        else{
            c.status(403)
            return c.json({error: "unauthorized"})
        }
    }catch(err){
        c.status(403)
        return c.json({error: "unauthorized"})
    }
})

blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({ error: "invalid input" });
    }
    const userId = c.get("userId");
    console.log("reached");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const post = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: (userId),
        }
    })
    return c.json({
        id: post.id
    });
})
  
blogRouter.put('/', async (c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411)
        return c.json({ error: "invalid input" });
    } 
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    await prisma.post.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id: body.id
    });
})
  
// add pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany();
    return c.json({blogs});
})
  
blogRouter.get('/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try{
        const blog = await prisma.post.findUnique({
            where:{id}
        })
        return c.json(blog);
    }
    catch(err){
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        })
    }
})
  