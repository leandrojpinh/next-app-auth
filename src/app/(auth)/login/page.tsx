'use client'

import React, { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react';
import { Form, Formik } from 'formik';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Link from 'next/link';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';


export default function Login() {
  const router = useRouter();
  const { status } = useSession();

  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status !== 'unauthenticated') {
    return null;
  }

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Digite um e-mail válido").required("O campo e-mail é obrigatório"),
    password: Yup.string().required("O campo passwor é obrigatório"),
  });

  async function handleSubmit(values: any, { resetForm }: { resetForm: () => void }) {
    setSending(true);

    try {
      const res = await signIn('credentials', { ...values, redirect: false });
      if (!res?.error) {
        router.push("/");
      } else {
        renderError(res?.error.replace("Error: ", ""));
        resetForm();
      }

      setSending(false);
    } catch (err) {
      setSending(false);
      renderError("Erro ao fazer login");
    }
  }

  function renderError(message: string) {
    setError(message);
    setTimeout(() => { setError(""); }, 3000);
  }

  return (
    <main className='min-h-screen flex items-center justify-center'>
      <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {({ values }) => (
          <Form noValidate className='flex flex-col gap-2 p-4 border rounded-md border-zinc-300 min-w-[300px] bg-white '>
            <Input name='email' label='E-mail' type='email' required />
            <Input name='password' label='Password' type='password' autoComplete='off' required />

            <Button type='submit' disabled={sending} label={sending ? 'Logando...' : 'Entrar'} className='bg-green-500 text-white rounded p-2 cursor-pointer' />

            {!values.email && !values.password && error && (
              <span className='text-red-500 text-sm text-center'>{error}</span>
            )}

            <span className='text-xs text-zinc-500'>
              Não possui uma conta?
              <strong className='text-zinc-700'>
                <Link href={'/register'}> Inscreva-se</Link>
              </strong>
            </span>
          </Form>)}
      </Formik>
    </main>
  )
}
