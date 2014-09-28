function swap_week(elm1, elm2) {
	elm1.removeClass('hidden');
	elm2.addClass('hidden');
}

function form_validate() {
	var inputBegin = $('#inputBegin');
	var inputEnd = $('#inputEnd');
	if (inputBegin.val() >= inputEnd.val()) {
		inputBegin.parents('div.form-group').addClass('has-error');
		inputEnd.parents('div.form-group').addClass('has-error');
		$('#timeWarning').removeClass('hidden');
		return false;
	}
	var inputName = $('#inputName');
	if (!inputName.val()) {
		inputName.parents('div.form-group').addClass('has-error');
		$('#nameWarning').removeClass('hidden');
		return false;
	}
	return true;
}

function set_active_week() {
	if (active_week === 1) {
		$('#this-week').parent().addClass('active');
		$('#next-week').parent().removeClass('active');
	} else if (active_week === 2) {
		$('#this-week').parent().removeClass('active');
		$('#next-week').parent().addClass('active');
		swap_week($('div.next-week'), $('div.this-week'));
	}
}

$(document).ready(function() {
	var day = active_day;
	if (day > 0 && day < 6) {
		$('div.masthead.this-week').find('li').eq(day - 1).addClass('active');
		$('div.masthead.next-week').find('li').eq(day - 1).addClass('active');
		$('div.this-week').find('div.tab-pane').eq(day - 1).addClass('active');
		$('div.next-week').find('div.tab-pane').eq(day - 1).addClass('active');
	}
	set_active_week();
	
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
	
	$('button#commit').click(function(event) {
		if (! form_validate()) {
			event.preventDefault();
			return;
		}
		var pane;
		if ($('#this-week').closest('li').hasClass('active'))
			pane = $('.tab-content.this-week').find('.tab-pane.active');
		else
			pane = $('.tab-content.next-week').find('.tab-pane.active');

		var date = pane.find('h2').text();
		$('#inputDate').attr('value', date);
	});
});