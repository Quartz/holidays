# Quartz holidays

[![npm version](https://badge.fury.io/js/%40quartz%2Fholidays.png)](https://badge.fury.io/js/%40quartz%2Fholidays)

Determine if a day is a Quartz holiday.

```
const { isHoliday } = require( '@quartz/holidays' );

// Is today a Quartz holiday?
isHoliday() && console.log( '🙌' );

// Is today a non-working day at Quartz (includes weekends)?
isHoliday( undefined, { weekends: true } ) && console.log( '🏕️' );

// Was a specific day a Quartz holiday?
isHoliday( new Date( '2018-07-04' ) ) && console.log( '🎆' );
```

Or get a list of all Quartz holidays for a given year. Note that `dateString` is
formatted like the return values of `getDate` and `getMonth`. The `date`
property is a `Date` instance.

```
const { getHolidays } = require( '@quartz/holidays' );

console.log( getHolidays( '2019' ) );
// [
//   {
//     name: "New Year's Day",
//     date: 2019-01-01T00:00:00.000Z,
//     dateString: '2019-1-1',
//   },
//   ...
// ]
```
