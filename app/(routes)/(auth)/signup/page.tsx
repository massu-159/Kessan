import { redirect } from 'next/navigation'
import Signup from '../../../_components/auth/signup'
import { dashboardPath } from '../../../_common/constants/path'
import { createClient } from '../../../../utils/supabase/server'

const SignupPage = async () => {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(dashboardPath)
  }
  return <Signup />
}

export default SignupPage
