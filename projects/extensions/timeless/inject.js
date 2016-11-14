// This is the code that will be injected on any page
$('a').attr('href', function(i, oldHref) {
	const year = Math.floor((Math.random() * 15) + 2001).toString();

	let month = Math.floor((Math.random() * 12) + 1).toString();
	if (month.length < 2) {
		month = '0' + month;
	}

	let day = Math.floor((Math.random() * 28) + 1).toString();
	if (day.length < 2) {
		day = '0' + day;
	}

  	return 'http://timetravel.mementoweb.org/memento/' + year + month + day + '/' + oldHref;
});
