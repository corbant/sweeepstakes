import { Avatar, Button } from '@mui/material'
import { useUserStore } from '../stores/user'
import Statistic from '../components/Statistic'

function Profile() {
  const user = useUserStore((state) => state.user)

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
        {['Laundry Legend', 'Trash Titan', 'Bathroom Boss'].map((badge) => (
          <img key={badge} src={`https://img.shields.io/badge/${encodeURIComponent(badge)}-blue`} alt={badge} />
        ))}
      </div>
      <div>
        <h2>Lifetime Points</h2>
        <Statistic value="450" />
      </div>
      <div>
        <h2>Lifetime Completed Chores</h2>
        <Statistic value="32" />
      </div>
      <div>
        <h2>Week Streak</h2>
        <Statistic value="5" />
      </div>
      <div>
        <Button sx={{ mt: '12px'}} variant="text" color="error" onClick={() => useUserStore.getState().logout()}>
          Logout
        </Button>
      </div>
    </>
  )
}

export default Profile
