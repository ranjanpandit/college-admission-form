import dynamic from 'next/dynamic'
const RegistrationForm = dynamic(() => import('../../components/RegistrationForm'), { ssr: false })

export default function Page() {
  return <RegistrationForm />
}
