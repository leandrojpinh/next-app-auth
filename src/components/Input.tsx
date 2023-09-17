'use client';

import { ErrorMessage, Field } from 'formik';
import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}

export default function Input({ name, label, type, required, ...rest }: InputProps) {
  return (
    <div className='flex flex-col'>
      <div className='capitalize'>
        {label || name} {required && <span className='text-red-500'>*</span>}
      </div>
      <Field name={name} type={type} {...rest} className='p-2 rounded border-zinc-300 border border-solid outline-0 focus:border-blue-500' />
      <div className='text-red-500 text-xs mt-1'>
        <ErrorMessage name={name!} />
      </div>
    </div>
  )
}