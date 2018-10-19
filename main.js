function onSuccess() {
    var submitButton = $('#submit-feedback');
    submitButton.prop('disabled', false);

    var status = $('#feedback-status');
    status.html('Your feedback was submitted successfully');
}

function onError(error) {
    var submitButton = $('#submit-feedback');
    submitButton.prop('disabled', false);

    var status = $('#feedback-status');
    status.html('There was an error submitting your feedback - ' + error);
}

$(document).on('submit', '#feedback-form', function(event) {
    event.preventDefault();

    var submitButton = $('#submit-feedback');
    submitButton.prop('disabled', true);

    var status = $('#feedback-status');
    status.html('Submitting feedback....');

    var message = '';
    $(this).find('.feedback-item').each(function (){
        var key = $(this).find('label').text();
        var value = $(this).find('input').val();
        message += key + ': ' + value + '\r\n';
    });

    var data = {
        "access_token": "6w6a78zel2ca6iawom3p68qb",
        'subject': 'Feedback received',
        'text': message
    };

    $.ajax({
        method: 'POST',
        url: 'https://postmail.invotes.com/send',
        data: data,
        success: function() {
            submitButton.prop('disabled', false);
            status.html('Your feedback was submitted successfully');
        },
        error: function(error) {
            submitButton.prop('disabled', false);
            status.html('There was an error submitting your feedback - ' + error);
        }
    });

    return false;
});