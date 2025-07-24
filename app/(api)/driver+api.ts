import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        const response = await sql`SELECT * FROM drivers`;

        return new Response(
            JSON.stringify({
                success: true,
                data: response
            })
        )
    } catch (error) {
        console.log(error);
        return new Response(
            JSON.stringify({
                message: "Something went wrong!",
                status: 500
            })
        )
    }
}