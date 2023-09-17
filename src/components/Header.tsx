'use client'

import { signOut, useSession } from 'next-auth/react';
import Link from "next/link";
import Button from "./Button";

export default function Header() {
  const { status, data: session } = useSession();

  if (status !== 'authenticated') {
    return null
  }

  return (
    <div className="flex gap-4 justify-center p-2 flex-wrap">
      <Link href="/">Home</Link>
      <Link href="/about">Sobre</Link>
      <Link href="/contact">Contato</Link>

      <span className='bg-zinc-300 rounded-sm px-2'>
        {`Olá ${session?.user?.name?.split(" ")[0]}`}
      </span>

      <Button label="Sair" onClick={() => signOut()} className="bg-red-600 text-white rounded px-2 cursor-pointer" />
    </div>
  )
}