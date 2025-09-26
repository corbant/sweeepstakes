import { create } from 'zustand'

interface PageState {
  page: Page
  navigateTo: (page: Page) => void
}

export const Pages = {
  LOGIN: 'login',
  DASHBOARD: '',
  CHORES: 'chores',
  GROUP: 'group',
  PROFILE: 'profile'
}

export type Page = (typeof Pages)[keyof typeof Pages]

export const usePageStore = create<PageState>((set) => ({
  page: Pages.LOGIN,
  navigateTo: (page: Page) => set({ page })
}))

export const getPageName = (page: Page) => {
  switch (page) {
    case Pages.LOGIN:
      return 'Login'
    case Pages.DASHBOARD:
      return 'Dashboard'
    case Pages.CHORES:
      return 'Chores'
    case Pages.GROUP:
      return 'Group'
    case Pages.PROFILE:
      return 'Profile'
    default:
      return 'Not Found'
  }
}
