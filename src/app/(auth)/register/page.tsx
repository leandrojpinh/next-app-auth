'use client'

import React, { useState, useEffect } from 'react'
import { Form, Formik } from 'formik';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Link from 'next/link';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


export default function Register() {
  const router = useRouter();
  const { status } = useSession();

  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status !== 'unauthenticated') {
    return null;
  }

  const initialValues = {
    name: '',
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O campo e-mail é obrigatório"),
    email: Yup.string().email("Digite um e-mail válido").required("O campo e-mail é obrigatório"),
    password: Yup.string().required("O campo passwor é obrigatório"),
  })

  async function handleSubmit(values: any, { resetForm }: { resetForm: () => void }) {
    setSending(true);
    try {
      await fetch("/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      }).then(async (res) => {
        const result = await res.json();

        if (result.status === 201) {
          alert(result.message);
          router.push("/login");
        } else {
          renderError(result.message);
          resetForm();
        }

        setSending(false);
      })
    } catch (err) {
      setSending(false);
      renderError("Erro ao criar conta, tente mais tarde!")
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
            <Input name='name' label='Nome' type='text' required />
            <Input name='email' label='E-mail' type='email' required />
            <Input name='password' label='Password' type='password' autoComplete='off' required />

            <Button type='submit' disabled={sending} label={sending ? 'Enviando...' : 'Inscrever-se'} className='bg-green-500 text-white rounded p-2 cursor-pointer' />

            {!values.name && !values.email && !values.password && error && (
              <span className='text-red-500 text-sm text-center'>{error}</span>
            )}

            <span className='text-xs text-zinc-500'>
              Já possui uma conta?
              <strong className='text-zinc-700'>
                <Link href={'/login'}> Entre</Link>
              </strong>
            </span>
          </Form>)}
      </Formik>
    </main>
  )
}
