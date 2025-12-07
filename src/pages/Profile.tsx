import { Avatar, Button } from '@mui/material'
import { useUserStore } from '../stores/user'
import Statistic from '../components/Statistic'
import { useEffect, useState } from 'react'
import { type Badge } from '../types'

function Profile() {
  const user = useUserStore((state) => state.user)

  const [badges, setBadges] = useState<Badge[]>([])
  const [points, setPoints] = useState<number>(0)
  const [choresCompleted, setChoresCompleted] = useState<number>(0)

  useEffect(() => {
    const fetchStats = async () => {
      let res = await fetch('/api/user/badges')
      const userBadges = await res.json()
      setBadges(userBadges)

      res = await fetch('/api/user/points')
      const userPoints = await res.json()
      setPoints(userPoints.totalPoints)

      res = await fetch('/api/user/chores/completed')
      const userChores = await res.json()
      setChoresCompleted(userChores.totalCompleted)
    }

    fetchStats()
  }, [])

  return (
    <>
      <h1>Profile</h1>
      <Avatar sx={{ width: 56, height: 56, bgcolor: user?.avatar.color }}>
        {user?.avatar.initials}
      </Avatar>
      <h2>
        {user?.firstName} {user?.lastName}
      </h2>
      <div style={{ display: 'flex', gap: '8px', margin: '16px 0' }}>
        {badges.map((badge) => (
          <img src={badge.url} alt={badge.name} />
        ))}
      </div>
      <div>
        <h2>Lifetime Points</h2>
        <Statistic value={points.toString()} />
      </div>
      <div>
        <h2>Lifetime Completed Chores</h2>
        <Statistic value={choresCompleted.toString()} />
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
