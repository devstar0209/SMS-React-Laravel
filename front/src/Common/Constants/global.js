// reporter
export const reportSubTabEnum = Object.freeze({
  all: 0,
  error_report: 1,
  suggestion_dev: 2,
  complaint: 3,
  question: 4,
})

export const report_tab_list = [
  'Nyinkomna', 'Vidarskickade', 'Parkerade', 'Åtgärdade', 'Arkiverade'
]

export const report_sub_tab_list = [
  'Alla', 'Felanmälan', 'Förbättringsförslag', 'Klagomål', 'Fråga'
]

export const category_list = [
  'new_release', 'sent', 'parked', 'fixed', 'archived'
]

export const categoryEnum = Object.freeze({
  release: 0,
  sent: 1,
  parked: 2,
  fixed: 3,
  archived: 4,
})

export const detailed_info_list = [
  'impacted-lighting-post', 'attached-pictures', 'comments'
]

export const detailed_content_list = [
  'Påkörd belysningsstolpe', 'Bifogade bilder', 'Kommentarer'
]

export const categoryOption = [
  { key: 'cat1', value: 10, text: 'Företag AB' },
  { key: 'cat1', value: 20, text: 'Företag AB1' },
  { key: 'cat2', value: 30, text: 'Företag AB2' },
  { key: 'cat3', value: 40, text: 'Företag AB3' },
  { key: 'cat4', value: 50, text: 'Företag AB4' },

]

export const report_list_header = [
  {
    title: 'Datum',
    className: 'date',
  },
  {
    title: 'Anmälare',
    className: 'reporter',
  },
  {
    title: 'Plats',
    className: 'place',
  },
  {
    title: 'Ämne',
    className: 'subject',
  },
  {
    title: 'Beskrivning',
    className: 'description',
  }
]

export const report_kind_list = [
  'error_report', 'suggestion_dev', 'complaint', 'question'
]

// provider
export const provider_tab_list = [
  'Leverantörer', 'Arkiverade Leverantörer'
]

export const providerTabEnum = Object.freeze({
  provider: 1,
  archived_vendor: 2,
})

export const provider_header = [
  {
    title: 'Leverantör',
    className: 'provider'
  },
  {
    title: 'Pågående ärende',
    className: 'ongoing_case',
  },
  {
    title: 'Alla ärende',
    className: 'matters'
  }
]

export const provider_data = [
  [
    {
      provider: 'Snickare Firma AB',
      ongoing_case: 8,
      matters: 5
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 5,
      matters: 5
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 9,
      matters: 4
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 3,
      matters: 2
    },
    {
      provider: 'Snickare Firma AB',
      ongoing_case: 8,
      matters: 1
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 2,
      matters: 0
    },
    {
      provider: 'Snickare Firma AB',
      ongoing_case: 1,
      matters: 0
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 2,
      matters: 2
    },
    {
      provider: 'Snickare Firma AB',
      ongoing_case: 5,
      matters: 4
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 8,
      matters: 4
    },
    {
      provider: 'Snickare Firma AB',
      ongoing_case: 4,
      matters: 3
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 8,
      matters: 5
    }
  ],
  [
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 8,
      matters: 0
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 5,
      matters: 0
    },
    {
      provider: 'Snickare Firma AB',
      ongoing_case: 9,
      matters: 4
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 3,
      matters: 2
    },
    {
      provider: 'Snickare Firma AB',
      ongoing_case: 8,
      matters: 1
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 2,
      matters: 0
    },
    {
      provider: 'Snickare Firma AB',
      ongoing_case: 1,
      matters: 0
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 2,
      matters: 2
    },
    {
      provider: 'Snickare Firma AB',
      ongoing_case: 5,
      matters: 4
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 8,
      matters: 4
    },
    {
      provider: 'Snickare Firma AB',
      ongoing_case: 4,
      matters: 3
    },
    {
      provider: 'Lerom Ipsum Firma AB',
      ongoing_case: 8,
      matters: 5
    }
  ]
]

// ongoing case
export const ongoing_case_tab_list = [
  'Pågående Ärende', 'Historiska ärende'
]

export const ongoingCaseTabEnum = Object.freeze({
  ongoing_case: 1,
  historical_matter: 2,
})

export const ongoing_case_header = [
  {
    title: "Ärende",
    className: 'matter',
  },
  {
    title: "Adress",
    className: 'address',
  },
  {
    title: "Beställdes den",
    className: 'order_date',
  },
  {
    title: "Leverans datum",
    className: 'delivery_date',
  },
  {
    title: "Status",
    className: 'status',
  },
  {
    title: "Antal meddelande",
    className: 'message_count',
  },
  {
    title: "Nya meddelande",
    className: 'new_message',
  },

]

export const ongoing_data = [
  [
    {
      matter: 'Vägmålning',
      address: 'Baldersvägen 35',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
    {
      matter: 'Vägmålning',
      address: 'Baldersvägen 35',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: 'Pågår',
      message_count: 5,
      new_message: 1,
    },
  ],
  [
    {
      matter: 'Vägmålning',
      address: 'Baldersvägen 35',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },{
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },{
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },{
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },{
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },{
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },{
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },
    {
      matter: 'Lorem Ipsum',
      address: 'Dolor sit amet',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },
    {
      matter: 'Vägmålning',
      address: 'Baldersvägen 35',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },
    {
      matter: 'Vägmålning',
      address: 'Baldersvägen 35',
      order_date: '2019-09-10',
      delivery_date: '2019-09-10',
      status: '',
      message_count: '',
      new_message: '',
    },
  ],
]

// reporter
export const reporter_tab_list = [
  'Anmälare', 'Arkiverade anmälare'
]

export const reporter_header = [
  {
    title: 'Anmälare',
    className: 'reporter'
  },
  {
    title: 'Pågående ärende',
    className: 'ongoing_case',
  },
  {
    title: 'Alla ärende',
    className: 'matters'
  }
]

export const reporter_sub_tab_list = [
  'Alla', 'Medborgare', 'Interna'
]

export const reporterSubTabEnum = Object.freeze({
  all: 0,
  national: 1,
  international: 2,
})

export const reporter_data = [
  [
    {
      reporter: 'Adam adamsson',
      ongoing_case: 8,
      matters: 5
    },
    {
      reporter: 'Lerom lpsum',
      ongoing_case: 5,
      matters: 5
    },
    {
      reporter: 'Lerom lpsum',
      ongoing_case: 9,
      matters: 4
    },
    {
      reporter: 'Lerom lpsum',
      ongoing_case: 3,
      matters: 2
    },
    {
      reporter: 'Lerom lpsum',
      ongoing_case: 8,
      matters: 1
    },
    {
      reporter: 'Lerom lpsum',
      ongoing_case: 2,
      matters: 0
    },
    {
      reporter: 'Lerom lpsum',
      ongoing_case: 1,
      matters: 0
    },
    {
      reporter: 'Lerom lpsum',
      ongoing_case: 2,
      matters: 2
    },
    {
      reporter: 'Lerom lpsum',
      ongoing_case: 5,
      matters: 4
    },
    {
      reporter: 'Lerom lpsum',
      ongoing_case: 8,
      matters: 4
    },
    {
      reporter: 'Lerom lpsum',
      ongoing_case: 4,
      matters: 3
    },
    {
      reporter: 'Lerom lpsum',
      ongoing_case: 8,
      matters: 5
    }
  ],
  [
    {
      reporter: 'Adam adamsson',
      ongoing_case: 8,
      matters: 0
    },
    {
      reporter: 'Lerom Ipsum',
      ongoing_case: 5,
      matters: 0
    },
    {
      reporter: 'Lerom Ipsum',
      ongoing_case: 9,
      matters: 4
    },
    {
      reporter: 'Lerom Ipsum',
      ongoing_case: 3,
      matters: 2
    },
    {
      reporter: 'Lerom Ipsum',
      ongoing_case: 8,
      matters: 1
    },
    {
      reporter: 'Lerom Ipsum',
      ongoing_case: 2,
      matters: 0
    },
    {
      reporter: 'Lerom Ipsum',
      ongoing_case: 1,
      matters: 0
    },
    {
      reporter: 'Lerom Ipsum',
      ongoing_case: 2,
      matters: 2
    },
    {
      reporter: 'Lerom Ipsum',
      ongoing_case: 5,
      matters: 4
    },
    {
      reporter: 'Lerom Ipsum',
      ongoing_case: 8,
      matters: 4
    },
    {
      reporter: 'Lerom Ipsum',
      ongoing_case: 4,
      matters: 3
    },
    {
      reporter: 'Lerom Ipsum',
      ongoing_case: 8,
      matters: 5
    }
  ]
]

export const reporter_ongoing_case_header = [
  {
    title: "Ärende",
    className: 'matter',
  },
  {
    title: "Adress",
    className: 'address',
  },
  {
    title: "Beställdes den",
    className: 'order_date',
  },
  {
    title: "Uppskattat datum till leverans",
    className: 'delivery_date',
  },
  {
    title: "Status",
    className: 'status',
  },
  {
    title: "Antal meddelande",
    className: 'message_count',
  },
  {
    title: "Nya meddelande",
    className: 'new_message',
  },

]

// users

export const users_tab_list = [
  'Användare', 'Arkiverade användare'
]

export const users_header = [
  {
    title: 'Name',
    className: 'name',
  },
  {
    title: 'Username',
    className: 'username',
  },
  {
    title: 'Email',
    className: 'email',
  },
  {
    title: 'Role',
    className: 'role',
  },
  {
    title: 'Rättigheter',
    className: 'right',
  },
]

export const users_data = [
  [
    {
      id: 1,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 2,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 3,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 4,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 5,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 6,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 1,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },

  ],
  [
    {
      id: 1,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 2,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 3,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 4,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 5,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 6,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },{
      id: 1,
      name: 'Adam Adamsson',
      username: 'mc4515',
      email: 'adam@adamsson.se',
      role: 'Admin',
      right: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel pretium sapien, quis semper ex. Quisque lorem urna, egestas vitae tincidunt at, mollis id felis. Integer a iaculis lectus.'
    },

  ],
]

export const users_role = [
  { key: 'admin', value: 10, text: 'Admin' },
  { key: 'user', value: 40, text: 'Användare' },
]

export const reportdata = [
  {
      label: 'Offentlig toalett sönder',
      data: 'Norraberget 4, 850 50 Härnösand',
      date: '2020-04-06 10:45:10'
  },
  {
    label: 'Offentlig toalett sönder',
    data: 'Norraberget 4, 850 50 Härnösand',
    date: '2020-04-06 10:45:10'
  },
  {
    label: 'Offentlig toalett sönder',
    data: 'Norraberget 4, 850 50 Härnösand',
    date: '2020-04-06 10:45:10'
  },
  {
    label: 'Offentlig toalett sönder',
    data: 'Norraberget 4, 850 50 Härnösand',
    date: '2020-04-06 10:45:10'
  },
  {
    label: 'Offentlig toalett sönder',
    data: 'Norraberget 4, 850 50 Härnösand',
    date: '2020-04-06 10:45:10'
  }
]

export const chatdata= {
  labels: [
    "JAN.",
    "FEB.",
    "MARS.",
    "APRIL",
    "MAJ",
    "JUNI.",
    "JULI",
    "AUG.",
    "SEP.",
    "OKT.",
    "NOV.",
    "DEC."
  ],
  datasets: [

    {
      label: "Felanmälan",
      backgroundColor: "#DC3737",
      borderColor: "#DC3737",
      borderWidth: 1,
      //stack: 1,
      hoverBackgroundColor: "#DC3737",
      hoverBorderColor: "#DC3737",
      data: [29, 15, 27, 18, 29, 22, 38]
    },

    {
      label: "Förbättringsförslag",
      backgroundColor: "#4F7CAC",
      borderColor: "#4F7CAC",
      borderWidth: 1,
      stack: 1,
      hoverBackgroundColor: "#4F7CAC",
      hoverBorderColor: "#4F7CAC",
      data: [27, 29, 10, 21, 19, 11, 24]
    },

    {
      label: "Klagomål",
      backgroundColor: "#DC6037",
      borderColor: "#DC6037",
      borderWidth: 1,
      //stack: 1,
      hoverBackgroundColor: "#DC6037",
      hoverBorderColor: "#DC6037",
      data: [18, 8, 7, 6, 7, 10, 12]
    },
    {
      label: "Frågor",
      backgroundColor: "#B49FCC",
      borderColor: "#B49FCC",
      borderWidth: 1,
      //stack: 1,
      hoverBackgroundColor: '#B49FCC',
      hoverBorderColor: '#B49FCC',
      data: [12, 11, 10, 11, 13, 15, 12]
    },

  ]
}
