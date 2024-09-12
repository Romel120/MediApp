import connect from "@/lib/db"
import User from "@/lib/models/users";
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        await connect() ;
        const users = await User.find() ;
        return new NextResponse(JSON.stringify(users) , {status : 200})
    } catch (error) {
        return new NextResponse("Error in fetching data" , error.message , {status : 500}) ;
    }       
}

export const POST = async (request) => {
    try {
        const body = await request.json() ;
        await connect() ;
        const newUser = new User(body) ;
        await newUser.save() ;
        return new NextResponse(JSON.stringify("User is created.") , {status : 201})
    } catch (error) {
        return new NextResponse("Error in creating User" , error.message , {status : 500}) ;
    }
}

