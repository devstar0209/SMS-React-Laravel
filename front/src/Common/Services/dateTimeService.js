import moment from 'moment';

class DateTimeService {
	static toBackEndDate(date) {
		return moment(date).utc().format();
	}

	static toCalendarDate(date) {
		return moment(date).format('dddd, MMMM DD, YYYY');
	}

	static isBefore(date, limitDate) {
		return moment(date).isBefore(moment(limitDate));
	}

	static isSameOrBefore(date, limitDate) {
		return moment(date).isSameOrBefore(moment(limitDate));
	}

	static isSameOrAfter(date, limitDate) {
		return moment(date).isSameOrAfter(moment(limitDate));
	}

	static toLongFormatDate(date, time) {
		const dateString = moment(date).format('ddd MMM DD YYYY');

		return moment(`${dateString} ${time}`, 'LLLL');
	}
}

export default DateTimeService;
