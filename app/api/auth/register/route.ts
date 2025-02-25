import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/lib/db";   
import User from "@/models/User";

export async function POST(request: NextRequest){
    try {
       const {email, password} = await request.json()

       if(!email || !password){
           return NextResponse.json(
            {error: 'Email and password are required'},
        {status: 400})
       }

       await connectToDatabase()

       const existingemail =  await User.findOne({email})

       if(existingemail){
        return NextResponse.json(
            {error: 'Email already exists'},
        {status: 400})
       }

       await User.create({email, password})

       return NextResponse.json(
           {message: 'User created successfully'},
           {status: 201}
       )
    } catch (error) {
        return NextResponse.json(
            {message: 'Failed to regidter', error},
            {status: 201}
        )
    }
}

// const res = await fetch("/api/auth/register",{
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//         email: "darshank@gmail.com",
//         password: "password",})}
// )

// res.json();