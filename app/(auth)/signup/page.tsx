import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '../../../lib/database.types'
import { redirect } from 'next/navigation'
import Signup from '../../_components/signup'

const SignupPage = async () => {
  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect('/dashboard')
  }
  return <Signup />
}

export default SignupPage
