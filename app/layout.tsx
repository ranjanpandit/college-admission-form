import './globals.css'
import { FC, PropsWithChildren } from 'react'
import { Toaster } from "sonner";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Registration Form</title>
      </head>
      <body>
        <Toaster />
        {children}
        </body>
    </html>
  )
}

export default RootLayout
