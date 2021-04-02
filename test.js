const test = require( 'tape' );
const { getHolidays, isHoliday } = require( './index' );

test( 'getHolidays works in this century', t => {
	t.throws( () => getHolidays() );
	t.throws( () => getHolidays( '1999' ) );
	t.throws( () => getHolidays( 1999 ) );
	t.throws( () => getHolidays( 2525 ) );

	t.end();
} );

test( 'getHolidays returns properly formatted response', t => {
	const holidays = getHolidays( new Date().getFullYear() );

	holidays.forEach( holiday => {
		t.ok( holiday.name.length > 0, 'name has length' );
		t.ok( holiday.date instanceof Date, 'date is a Date' );
		t.ok( /^[0-9]+\-[0-9]+\-[0-9]+$/.test( holiday.dateString ), 'dateString looks like a date string' );
	} );

	t.end();
} );

test( 'isHoliday works for known holidays and non-holidays', t => {
	t.ok( isHoliday( new Date( '2018-12-25' ) ), 'Christmas 2018' );
	t.ok( isHoliday( new Date( '2019-01-01' ) ), 'New Year\'s 2019' );
	t.ok( isHoliday( new Date( '2023-06-19' ) ), 'Juneteenth 2023' );
	t.ok( isHoliday( new Date( '2019-12-08' ), { weekends: true } ), 'a random Sunday' );

	t.notOk( isHoliday( new Date( '2019-12-23' ) ), 'day before Christmas Eve' );
	t.notOk( isHoliday( new Date( '2019-12-09' ), { weekends: true } ), 'a random Monday' );

	t.end();
} );

test( 'isHoliday works for one-offs', t => {
	t.ok( isHoliday( new Date( '2021-4-5' ) ), 'COVID bonus' );
	t.end();
} )
