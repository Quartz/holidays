const { allForYear } = require( '@18f/us-federal-holidays' );

// Sometimes we get the day off.
const oneOffHolidays = {
	2020: [
		{
			name: 'Monday after Indepedence Day',
			date: new Date( '2020-07-06' ),
			dateString: '2020-7-6',
		},
		{
			name: 'Monday after Good Friday',
			date: new Date( '2020-04-05' ),
			dateString: '2020-4-5',
		},
	],
};

function getHolidays( year ) {
	// Expect a reasonable year. This code will die.
	if ( ! /^20[0-9]{2}$/.test( year ) ) {
		throw new Error( 'Please provide a year in this century.' );
	}

	const options = {
		shiftSaturdayHolidays: true,
		shiftSundayHolidays: true,
	};

	const fedHolidays = allForYear( year, options );

	// Add the day after Thanksgiving.
	const thanksgiving = fedHolidays.find( ( { name } ) => name.toLowerCase().includes( 'thanksgiving' ) );
	const blackFriday = new Date( new Date( thanksgiving.date ).getTime() + 60 * 60 * 24 * 1000 );

	// Remove Veterans Day and Columbus Day.
	const removeUnobserved = ( { name } ) => ! [ 'veterans', 'columbus' ].includes( name.toLowerCase() );

	return [
		...fedHolidays.filter( removeUnobserved ),
		...( oneOffHolidays[ year ] || [] ),
		{
			name: 'Juneteenth',
			date: new Date( `${year}-06-19` ),
			dateString: `${year}-6-19`,
		},
		{
			name: 'Day after Thanksgiving',
			date: blackFriday,
			dateString: `${year}-${blackFriday.getUTCMonth() + 1}-${blackFriday.getUTCDate()}`,
		},
	].sort( ( a, b ) => a.date < b.date ? -1 : 1 );
}

function getHolidayByDate( date = new Date() ) {
	const currentDateString = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
	const holidays = getHolidays( date.getUTCFullYear() );

	return holidays.find( ( { dateString } ) => dateString === currentDateString ) || null;
}

function isHoliday( date = new Date(), options = {} ) {
	// Saturday and Sunday
	if ( options.weekends && [ 0, 6 ].includes( date.getUTCDay() ) ) {
		return true;
	}

	return !! getHolidayByDate( date );
}

module.exports = {
	getHolidays,
	isHoliday,
};
