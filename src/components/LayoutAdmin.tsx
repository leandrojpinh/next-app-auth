'use client'

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type LayoutAdminProps = {
  children: React.ReactNode
}

export default function LayoutAdmin({ children }: LayoutAdminProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  if (!session) {
    setTimeout(() => {
      router.push('/login');
    }, 100);

    return null;
  }

  return <div className="min-h-screen">{children}</div>
}