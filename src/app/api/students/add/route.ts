import clientPromise from '../../../../../lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json()

    const client = await clientPromise
    const db = client!.db()
    const result = await db.collection('students').insertOne(data)
    const insertedId = result.insertedId.toString()

    return NextResponse.json(
      {
        message: 'Data stored successfully',
        student_id: insertedId, 
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
