function swap_week(elm1, elm2) {
	elm1.removeClass('hidden');
	elm2.addClass('hidden');
}

function form_validate() {
	return true;
}

$(document).ready(function() {
	var date = new Date();
	var day = date.getDay();
	if (day > 0 && day < 6) {
		$('div.masthead.this-week').find('li').eq(day - 1).addClass('active');
		$('div.masthead.next-week').find('li').eq(day - 1).addClass('active');
		$('div.this-week').find('div.tab-pane').eq(day - 1).addClass('active');
		$('div.next-week').find('div.tab-pane').eq(day - 1).addClass('active');
	}
	
	$('#this-week').click(function() {
		if ($(this).closest('li').hasClass('active'))
			return;
		$(this).closest('li').addClass('active');
		$('#next-week').closest('li').removeClass('active');
		swap_week($('div.this-week'), $('div.next-week'));
	});
	
	$('#next-week').click(function() {
		if ($(this).closest('li').hasClass('active'))
			return;
		$(this).closest('li').addClass('active');
		$('#this-week').closest('li').removeClass('active');
		swap_week($('div.next-week'), $('div.this-week'));
	});
	
	$('button#commit').click(function() {
		var pane;
		if ($('#this-week').closest('li').hasClass('active'))
			pane = $('.tab-content.this-week').find('.tab-pane.active');
		else
			pane = $('.tab-content.next-week').find('.tab-pane.active');

		var date = pane.find('h2').text();
		$('#inputDate').attr('value', date);
	});
});