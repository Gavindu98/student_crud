import clientPromise from '../../../../../lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'; 

export async function PUT(req: NextRequest) {
  try {
    const { data } = await req.json()
    const student_id = new ObjectId(data._id) 
    const updateData = {
      name: data.name,
      email: data.email,
      contactNumber: data.contactNumber
    }

    if (!student_id) {
      return NextResponse.json(
        { message: 'Student ID is required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client!.db()
    const result = await db.collection('students').updateOne(
      { _id: student_id },
      { $set: updateData }
    )

    return NextResponse.json(
      { message: 'Student data updated successfully',result: result },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: error },
      { status: 500 }
    )
  }
}
