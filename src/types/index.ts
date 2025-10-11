

export interface User {
  email: string
  firstName: string
  lastName: string
  avatar: {
    url?: string
    initials: string
    color: string
  }
  // other field
}

export interface Chore {
    id: string;
    title: string;
    description: string;
    assignedTo: User[] | null;
    dueDate: Date;
    completed: boolean;
}

