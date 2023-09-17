import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/utils/db";
import User from "@/models/User";

export async function POST(req: any) {
  try {
    const { name, email, password } = await req.json();

    await connect();

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return NextResponse.json({
        message: 'Email já cadastrado!',
        ststus: 409
      });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
      name, email, password: hashedPassword
    });

    await newUser.save();

    return NextResponse.json({
      message: 'Usuário criado com sucesso!',
      status: 201
    });
  } catch (err) {
    return NextResponse.json({
      message: 'Erro ao cadastrar usuário!',
      status: 500
    });
  }
}