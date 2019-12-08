const { allForYear } = require( '@18f/us-federal-holidays' );

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

	// Add Christmas Eve, New Year's Eve, and the day after Thanksgiving.
	const thanksgiving = fedHolidays.find( ( { name } ) => name.toLowerCase().includes( 'thanksgiving' ) );
	const blackFriday = new Date( new Date( thanksgiving.date ).getTime() + 60 * 60 * 24 * 1000 );

	return [
		// Remove Veterans Day.
		...fedHolidays.filter( ( { name } ) => ! name.toLowerCase().includes( 'veteran' ) ),
		{
			name: 'Day after Thanksgiving',
			date: blackFriday,
			dateString: `${year}-${blackFriday.getUTCMonth() + 1}-${blackFriday.getUTCDate()}`,
		},
		{
			name: 'Christmas Eve',
			date: new Date( `${year}-12-24` ),
			dateString: `${year}-12-24`,
		},
		{
			name: 'New Year\'s Eve',
			date: new Date( `${year}-12-31` ),
			dateString: `${year}-12-31`,
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
