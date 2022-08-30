export default [
  {
    hidden: false,
    path: '/index',
    meta: {
      title: 'Dashboard',
      icon: 'home',
      affix: true,
    },
  },
  {
    hidden: false,
    path: '/projects',
    meta: {
      title: 'Projects',
      icon: 'home',
      affix: true,
    },
  },
  {
    hidden: false,
    path: '/lga-budget-amount',
    meta: {
      title: 'LGA Budget Amount',
      icon: 'home',
      affix: true,
    },
  },
  {
    hidden: false,
    path: '/general-settings',
    meta: {
      icon: 'home',
      title: 'General Settings',
    },
    children: [
      {
        path: '/general-settings/mdas',
        meta: {
          icon: 'home',
          title: 'MDAs',
        },
      },
      {
        path: '/general-settings/sectors',
        meta: {
          icon: 'home',
          title: 'Sectors',
        },
      },
      {
        path: '/general-settings/contractors',
        meta: {
          icon: 'home',
          title: 'Contractors',
        },
      },
      {
        path: '/general-settings/states',
        meta: {
          icon: 'home',
          title: 'States',
        },
      },
      {
        path: '/general-settings/lgas',
        meta: {
          icon: 'home',
          title: 'LGAs',
        },
      },
    ],
  },
];
