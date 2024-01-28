import { Inter } from 'next/font/google'
import '../globals.css'


export default function Layout({ children }) {
  return (
      <div className='mt-8'>{children}</div>
  )
}
