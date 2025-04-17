'use client'

import { useRouter } from "next/navigation";

export default function GoBack(){

  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <button
    className='text-sm font-bold text-primary tracking-tighter hover:tracking-widest duration-300'
    onClick={handleGoBack}>Go Back</button>
  )
}