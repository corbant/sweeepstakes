import { Avatar, Button, IconButton, Stack, TextField } from '@mui/material'
import { useUserStore } from '../stores/user'
import Statistic from '../components/Statistic'
import { useEffect, useState } from 'react'
import { type Badge } from '../types'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'

function Profile() {
  const user = useUserStore((state) => state.user)

  const [badges, setBadges] = useState<Badge[]>([])
  const [points, setPoints] = useState<number>(0)
  const [choresCompleted, setChoresCompleted] = useState<number>(0)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [newName, setNewName] = useState<{
    firstName: string
    lastName: string
  }>({
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? ''
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        let res = await fetch('/api/user/badges')
        if (res.ok) {
          const userBadges = await res.json()
          setBadges(userBadges)
        }

        res = await fetch('/api/user/stats/points')
        if (res.ok) {
          const userPoints = await res.json()
          setPoints(userPoints.points)
        }

        res = await fetch('/api/user/stats/completed-chores')
        if (res.ok) {
          const userChores = await res.json()
          setChoresCompleted(userChores.choresCompleted)
        }
      } catch (error) {
        console.error('Error fetching user stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <>
      <h1>Profile</h1>
      <Avatar sx={{ width: 56, height: 56, bgcolor: user?.avatar.color }}>
        {user?.avatar.initials}
      </Avatar>
      <Stack direction="row" spacing={2} sx={{ mt: '16px' }}>
        {isEditing ? (
          <div>
            <TextField
              label="First Name"
              value={newName.firstName}
              onChange={(e) => setNewName({ ...newName, firstName: e.target.value })}
            />
            <TextField
              label="Last Name"
              value={newName.lastName}
              onChange={(e) => setNewName({ ...newName, lastName: e.target.value })}
            />
          </div>
        ) : (
          <h2>
            {user?.firstName} {user?.lastName}
          </h2>
        )}

        {isEditing ? (
          <IconButton
            onClick={() => {
              setIsEditing(false)
              if (newName.firstName !== user?.firstName || newName.lastName !== user?.lastName)
                useUserStore.getState().changeName(newName.firstName, newName.lastName)
            }}
          >
            <CheckIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        )}
      </Stack>
      <div style={{ display: 'flex', gap: '8px', margin: '16px 0' }}>
        {badges.map((badge, index) => (
          <img key={index} src={badge.url} alt={badge.name} />
        ))}
      </div>
      <div>
        <h2>Lifetime Points</h2>
        <Statistic value={points} />
      </div>
      <div>
        <h2>Lifetime Completed Chores</h2>
        <Statistic value={choresCompleted} />
      </div>
      <div>
        <Button
          sx={{ mt: '12px' }}
          variant="text"
          color="error"
          onClick={() => useUserStore.getState().logout()}
        >
          Logout
        </Button>
      </div>
    </>
  )
}

export default Profile
