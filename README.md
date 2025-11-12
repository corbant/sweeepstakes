# 🧹 Sweeepstakes

Sweeepstakes is a real-time chore coordination app that helps roommates and families manage tasks, track progress, and earn fun badges. It’s designed to make shared living smoother and a little more competitive — in a good way.

## Index

- [Elevator Pitch](#elevator-pitch)
- [Design](#design)
- [Key Features](#key-features)
- [Technologies](#technologies)
- [Deployment Instructions](#deployment-instructions)
- [HTML Deliverable](#html-deliverable)
- [CSS Deliverable](#css-deliverable)
- [React Deliverable Phase 1](#react-deliverable-phase-1)
- [React Deliverable Phase 2](#react-deliverable-phase-2)

## Elevator Pitch

Say goodbye to the constant pile of dishes in your sink! Sweeepstakes makes chores fun and more coordinated. Perfect for families or roomates in a shared living space. Do you like a good freindly competition? Now you can see who is the best at getting their chores done. Show off your laundry folding skills with a nice profile badge.

Users can join a household group, assign chores, track completion, and earn badges for their contributions. Real-time updates keep everyone in sync.

## Design

### Login

![Login Page](assets/sample-views/login-page.png)

### Dashboard

![Dashboard Page](assets/sample-views/dashboard-page.png)

### Chores

![Chores Page](assets/sample-views/chores-page.png)

### Group

![Group Page](assets/sample-views/group-page.png)

### Profile

![Profile Page](assets/sample-views/profile-page.png)

### Chore Edit Modal

![Chore Modal](assets/sample-views/chore-modal.png)

## Key Features

- Group creation and chore assignment
- Real-time updates for task completion
- Badge rewards for milestones
- Clean, responsive UI

## Technologies

- **HTML** – Static layout for login, dashboard, and chore form
- **CSS** – Responsive design and chore status styling
- **React** – Refactor into components and add routing
- **Service** – Backend endpoints
  - Login
  - Get user assigned chores
  - Edit/Create chore and edit status
  - Edit group info
  - User info
  - Leaderboard info
  - Third Party Endpoint:
    - shields.io for badge generation
- **Database** – Keep track of info for users, groups, chores, leaderboard
- **WebSocket** – Real-time updates of leaderboard/points

## Deployment Instructions

- Clone the repo
- Install dependencies
- Set environment variables
- Run the server

## HTML Deliverable

- [x] **HTML pages** - Login page, dashboard, chores page, group settings, and profile settings.
- [x] **Proper HTML element usage** - head, body, header, main, footer, nav, img, form, button, etc.
- [x] **Links** - Links for navigation between pages
- [x] **Text** - Each page has text
- [x] **3rd party API placeholder** - Has a placeholder for displaying badges
- [x] **Images** - Image placeholder on the profile page
- [x] **Login** - Login form placeholder on the login page
- [x] **DB placeholder** - Various number placeholders for db stored values
- [x] **WebSocket placeholder** - Real-time chore data update

## CSS Deliverable

- [x] **Header, footer, and main content body**
- [x] **Navigation elements** - Made navigation elements buttons, and removed underline
- [x] **Responsive to window resizing** - App looks good at different window sizes and uses a mobile-first design approach
- [x] **Dark/Light theme** - Made app responsive to user preference of dark and light theme
- [x] **Application text content** - Using roboto font
- [x] **Application Images** - Styled avatar image

## React Deliverable Phase 1

- [x] **Bundled using Vite**
- [x] **Components**
  - BrandedNavbar - Top navbar with branding logo and menu that appears if the app isn't on mobile
  - Checklist - Checklist component that manages checked state for chores
  - GroupChoreList - Table component for adding, editing, and deleting chores from the group
  - Leaderboard - List of leaderboard results
  - LoginForm - Redirects to dashboard when login is clicked
  - Statistic - displays a number in a full width container
- [x] **Router** - Used ReactRouter for client-side navigation
- [x] **Bundled and transpiled**
- [x] **Hooks** - UseState for managing checklist component state

## React Deliverable Phase 2

- [x]

## Service Deliverable

**Endpoints:**

- Authentication
  - POST /login - User login
  - POST /register - User registration
- User
  - GET /user - Get user info
  - PUT /user - Update user info
  - GET /user/group - Get user's group info
  - GET /user/chores - Get chores assigned to the user
  - GET /user/badges - Get user's badges
- Group
  - GET /group - Get group info for current user
  - POST /group - Create new group
  - PUT /group - Update group info
  - GET /group/members - Get all group members
  - GET /group/members/:userId - Get member info
  - GET /group/chores - Get all group chores
  - POST /group/chores - Create new chore
  - PUT /group/chores/:choreId - Update chore
  - DELETE /group/chores/:choreId - Delete chore
  - GET /group/leaderboard - Get group leaderboard
