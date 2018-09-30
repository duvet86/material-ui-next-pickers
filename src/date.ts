export const fillInDigit = (n: number, digit: number) => {
  const max = Math.pow(10, digit);
  let clean = (n % max).toString();
  while (clean.length < digit) {
    clean = "0" + clean;
  }

  return clean;
};

export const months = [
  {
    short: "Jan",
    long: "January"
  },
  {
    short: "Feb",
    long: "February"
  },
  {
    short: "Mar",
    long: "March"
  },
  {
    short: "Apr",
    long: "April"
  },
  {
    short: "May",
    long: "May"
  },
  {
    short: "Jun",
    long: "June"
  },
  {
    short: "Jul",
    long: "July"
  },
  {
    short: "Aug",
    long: "August"
  },
  {
    short: "Sep",
    long: "September"
  },
  {
    short: "Oct",
    long: "October"
  },
  {
    short: "Nov",
    long: "November"
  },
  {
    short: "Dec",
    long: "December"
  }
];

export const days = [
  {
    short: "Su",
    long: "Sunday"
  },
  {
    short: "Mo",
    long: "Monday"
  },
  {
    short: "Tu",
    long: "Tuesday"
  },
  {
    short: "We",
    long: "Wednesday"
  },
  {
    short: "Th",
    long: "Thursday"
  },
  {
    short: "Fr",
    long: "Friday"
  },
  {
    short: "Sa",
    long: "Saturday"
  }
];

export const formatDate = (date: Date, format: string) =>
  [
    [
      {
        keyword: "mm",
        word: fillInDigit(date.getMinutes(), 2)
      },
      {
        keyword: "m",
        word: date.getMinutes().toString()
      }
    ],
    [
      {
        keyword: "HH",
        word: fillInDigit(date.getHours(), 2)
      },
      {
        keyword: "H",
        word: date.getHours().toString()
      }
    ],
    [
      {
        keyword: "hh",
        word: fillInDigit(
          date.getHours() > 12
            ? date.getHours() - 12
            : date.getHours() === 0
              ? 12
              : date.getHours(),
          2
        )
      },
      {
        keyword: "h",
        word: (date.getHours() > 12
          ? date.getHours() - 12
          : date.getHours() === 0
            ? 12
            : date.getHours()
        ).toString()
      }
    ],
    [
      {
        keyword: "a",
        word: date.getHours() >= 12 ? "pm" : "am"
      }
    ],
    [
      {
        keyword: "dd",
        word: fillInDigit(date.getDate(), 2)
      },
      {
        keyword: "d",
        word: date.getDate().toString()
      }
    ],
    [
      {
        keyword: "MMMM",
        word: months[date.getMonth()].long
      },
      {
        keyword: "MMM",
        word: months[date.getMonth()].short
      },
      {
        keyword: "MM",
        word: fillInDigit(date.getMonth() + 1, 2)
      },
      {
        keyword: "M",
        word: (date.getMonth() + 1).toString()
      }
    ],
    [
      {
        keyword: "yyyy",
        word: fillInDigit(date.getFullYear(), 4)
      },
      {
        keyword: "yy",
        word: fillInDigit(date.getFullYear(), 2)
      }
    ],
    [
      {
        keyword: "EEE",
        word: days[date.getDay()].short
      },
      {
        keyword: "EEEE",
        word: days[date.getDay()].long
      }
    ]
  ].reduce((dateString, formattings) => {
    const foundFormatting = formattings.find(formatting =>
      dateString.includes(formatting.keyword)
    );
    if (foundFormatting) {
      return dateString.replace(foundFormatting.keyword, foundFormatting.word);
    } else {
      return dateString;
    }
  }, format);

export const sameDay = (dateA?: Date, dateB?: Date) => {
  if (dateA !== undefined && dateB !== undefined) {
    return (
      dateA.getDate() === dateB.getDate() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getFullYear() === dateB.getFullYear()
    );
  } else {
    return false;
  }
};

export const generateYearCalendar = (index: number) => {
  const years: number[][] = [];
  let counter = 0;
  for (let year = index * 18; year < (index + 1) * 18; year++) {
    if (!years[Math.floor(counter / 3)]) {
      years[Math.floor(counter / 3)] = [year];
    } else {
      years[Math.floor(counter / 3)] = [
        ...years[Math.floor(counter / 3)],
        year
      ];
    }
    counter++;
  }
  return years;
};

export const generateMonthCalendar = (index: number) => {
  const calendarFocus = {
    year: Math.floor(index / 12),
    month: index % 12
  };
  const firstDay = new Date(calendarFocus.year, calendarFocus.month, 1);
  const daysInWeekInMonth: Array<Array<Date | undefined>> = [
    Array(firstDay.getDay()).fill(undefined)
  ];
  let counter = firstDay.getDay();
  for (
    let day = firstDay;
    day.getMonth() === calendarFocus.month;
    day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1)
  ) {
    if (!daysInWeekInMonth[Math.floor(counter / 7)]) {
      daysInWeekInMonth[Math.floor(counter / 7)] = [
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ];
    } else {
      daysInWeekInMonth[Math.floor(counter / 7)] = [
        ...daysInWeekInMonth[Math.floor(counter / 7)],
        new Date(day.getFullYear(), day.getMonth(), day.getDate())
      ];
    }
    counter++;
  }
  for (
    let day = 6;
    !daysInWeekInMonth[daysInWeekInMonth.length - 1][day];
    day--
  ) {
    daysInWeekInMonth[daysInWeekInMonth.length - 1][day] = undefined;
  }
  return daysInWeekInMonth;
};
