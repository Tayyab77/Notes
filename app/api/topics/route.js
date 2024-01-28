import connectMongoDB from "../../../libs/mongodb";
import Topic from "../../../models/topic";
import { NextResponse } from "next/server";

//POST will be hit here as from frontend we mentioned method POST
export async function POST(request) {
  //Here we are saying take out only titl and description out of request.json
  const {title, description} = await request.json();
  //Check connected with db
  await connectMongoDB();
  //By using Topic class create title and description
  await Topic.create({title, description});
  //After get create send response to frontend Topic is created
  return NextResponse.json({message: "Topic Created"}, {status: 201})

}

export async function GET() {
  await connectMongoDB();
  //here We are finding the data from db table Topic
  const topics = await Topic.find();
  //Here we are sending data to frontend and will filter out topics table there
  return NextResponse.json({topics});
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Topic.findByIdAndDelete(id);
  return NextResponse.json({ message: "Topic deleted" }, {status: 200})
};

