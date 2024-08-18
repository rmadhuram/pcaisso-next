export async function POST(req: Request) {
  const body = await req.json()
  console.log(body)
  return Response.json({ message: "Hello from Next.js!" });
}