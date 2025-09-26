import { useNavigate } from 'react-router-dom'
import { usePageStore } from '../stores/page'
import { useEffect } from 'react'

function RouteUpdater() {
  const pageStore = usePageStore()
  const navigate = useNavigate()

  useEffect(() => {
    navigate(pageStore.page)
  }, [pageStore.page])

  return null
}

export default RouteUpdater
