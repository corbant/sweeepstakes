import { Button, Link, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

type Props = {
  onSubmit: (data: {
    username: string
    password: string
    firstName?: string
    lastName?: string
    groupId?: string
  }) => void
  registerMode?: boolean
}

function LoginForm(props: Props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [groupName, setGroupName] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchGroupName = async (groupId: string) => {
      try {
        const res = await fetch(`/api/auth/group/${groupId}/name`)
        if (res.ok) {
          const data = await res.json()
          setGroupName(data.name)
        } else {
          setSearchParams({})
          console.error('Failed to fetch group name')
        }
      } catch (error) {
        setSearchParams({})
        console.error('Error fetching group name:', error)
      }
    }

    const groupId = searchParams.get('groupId')
    if (groupId) {
      fetchGroupName(groupId)
    }
  }, [searchParams])

  return (
    <>
      <form
        action={(formData) =>
          props.onSubmit({
            username: formData.get('username') as string,
            password: formData.get('password') as string,
            firstName: formData.get('firstName') as string,
            lastName: formData.get('lastName') as string,
            groupId: formData.get('groupId') as string
          })
        }
      >
        <TextField name="username" label="Username" variant="outlined" fullWidth margin="normal" />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
        />
        {props.registerMode && (
          <>
            <TextField
              name="firstName"
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              name="lastName"
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {searchParams.get('groupId') ? (
              <>
                <input type="hidden" name="groupId" value={searchParams.get('groupId') || ''} />
                <p>You are joining the group {groupName}</p>
              </>
            ) : (
              <p>
                You will be creating a new group. If you want to join an existing group, register
                through the group's join link
              </p>
            )}
          </>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {props.registerMode ? 'Register' : 'Login'}
        </Button>
      </form>
      {props.registerMode ? (
        <Link component="button" onClick={() => navigate('/login')}>
          Already have an account? Log In
        </Link>
      ) : (
        <Link component="button" onClick={() => navigate('/register')}>
          No Account? Create One
        </Link>
      )}
    </>
  )
}

export default LoginForm
