import clientPromise from '../../../../../lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'; 

export async function POST(req: NextRequest) {
  try {
    const { data } = await req.json();
    const objectId = new ObjectId(data);
    const client = await clientPromise
    const db = client!.db()
    const result = await db.collection('students').deleteOne({ _id: objectId });

    return NextResponse.json(
      {
        message: 'Data deleted successfully',
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
