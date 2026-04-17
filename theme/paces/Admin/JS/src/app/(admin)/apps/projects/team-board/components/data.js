import user1 from '@/assets/images/users/user-1.jpg'
import user10 from '@/assets/images/users/user-10.jpg'
import user2 from '@/assets/images/users/user-2.jpg'
import user3 from '@/assets/images/users/user-3.jpg'
import user4 from '@/assets/images/users/user-4.jpg'
import user5 from '@/assets/images/users/user-5.jpg'
import user6 from '@/assets/images/users/user-6.jpg'
import user7 from '@/assets/images/users/user-7.jpg'
import user8 from '@/assets/images/users/user-8.jpg'
import user9 from '@/assets/images/users/user-9.jpg'
export const teamData = [
  {
    rank: 5,
    name: 'IT-01 - Design Team',
    members: [
      {
        image: user7,
      },
      {
        image: user8,
      },
      {
        image: user9,
      },
      {
        image: user10,
      },
    ],
    description: 'The Design Team focuses on creating intuitive user experiences and visually appealing interfaces. We handle UI/UX design, prototyping, and brand consistency across all digital products.',
    progress: {
      value: 65,
      label: 'Status of current project',
    },
    updatedTime: '1 hour ago',
    status: 'new',
  },
  {
    rank: 2,
    name: 'IT-02 - Development Team',
    members: [
      {
        image: user1,
      },
      {
        image: user2,
      },
      {
        image: user3,
      },
      {
        image: user4,
      },
      {
        image: user5,
      },
      {
        image: user6,
      },
    ],
    description: 'Responsible for application logic, backend development, API integration, and performance optimization across platforms.',
    progress: {
      value: 82,
      label: 'Current Sprint Progress',
    },
    updatedTime: '30 mins ago',
    status: 'active',
  },
  {
    rank: 3,
    name: 'IT-03 - QA Team',
    members: [
      {
        image: user10,
      },
      {
        image: user9,
      },
      {
        image: user8,
      },
      {
        image: user3,
      },
      {
        image: user4,
      },
    ],
    description: 'Ensures software stability, conducts manual & automated tests, maintains bug reports & release validation.',
    progress: {
      value: 74,
      label: 'Testing Cycle Progress',
    },
    updatedTime: '45 mins ago',
    status: 'ongoing',
  },
  {
    rank: 4,
    name: 'MK-01 - Marketing Team',
    members: [
      {
        image: user3,
      },
      {
        image: user5,
      },
      {
        image: user7,
      },
      {
        image: user9,
      },
      {
        image: user1,
      },
      {
        image: user6,
      },
      {
        image: user6,
      },
      {
        image: user6,
      },
    ],
    description: 'Handles brand messaging, campaigns, email automation, awareness growth & product launch communication.',
    progress: {
      value: 58,
      label: 'Campaign Performance',
    },
    updatedTime: '20 mins ago',
    status: 'active',
  },
  {
    rank: 1,
    name: 'FN-01 - Finance Team',
    members: [
      {
        image: user7,
      },
      {
        image: user9,
      },
      {
        image: user6,
      },
    ],
    description: 'Maintains accounts, revenue reporting, budgeting, compliance tracking & payroll processing.',
    progress: {
      value: 91,
      label: 'Quarterly Closure Progress',
    },
    updatedTime: '45 mins ago',
    status: 'stable',
  },
  {
    rank: 6,
    name: 'CS-01 - Customer Success Team ',
    members: [
      {
        image: user9,
      },
      {
        image: user1,
      },
      {
        image: user10,
      },
      {
        image: user7,
      },
      {
        image: user6,
      },
      {
        image: user2,
      },
      {
        image: user5,
      },
    ],
    description: 'Onboards new clients, resolves customer issues, monitors usage retention & improves satisfaction scores.',
    progress: {
      value: 48,
      label: 'SLA Response Performance',
    },
    updatedTime: '10 mins ago',
    status: 'busy',
  },
]
