import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'


const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    SECRET: string
    
  }
}>()

app.use('/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

// app.use("/api/v1/blog/*", async (c, next)=>{
//   //get the header
//   //verify the header
//   //if the header is correct then next()
//   // else return a status code 403
//   // for the above process we use verify method
//   const header = c.req.header("authorization") || "";

//   const token = header.split(" ")[1];
//   // ["Bearer","token"]

//   const res = await verify(token, c.env.SECRET)

//   if(res.id){
//     await next();
//   }
//   else{
//     c.status(403)
//     return c.json({error: "unauthorized"})
//   }

// })



export default app
