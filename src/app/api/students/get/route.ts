// Import necessary modules
import clientPromise from '../../../../../lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

// Define the GET API route handler
export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client!.db()

    const students = await db.collection('students').find().toArray()

    return NextResponse.json(
      {
        students,
      },
      {
        status: 200,
      }
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      },
      {
        status: 500,
      }
    )
  }
}
