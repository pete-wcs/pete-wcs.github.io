$(document).on('submit', '#feedback-form', function(event) {
    event.preventDefault();

    var submitButton = $('#submit-feedback');
    submitButton.hide();

    var status = $('#feedback-status');
    status.html('<div class="alert alert-light">Submitting feedback....</div>');

    var message = '';
    $(this).find('.feedback-item').each(function (){
        var key = $(this).find('label').text();
        var value = $(this).find('.form-control').val();
        message += key + ': ' + value + '\r\n\r\n';
    });

    var data = {
        "access_token": "6w6a78zel2ca6iawom3p68qb",
        'subject': 'Feedback received from ' + $('#name').val(),
        'text': message
    };

    $.ajax({
        method: 'POST',
        url: 'https://postmail.invotes.com/send',
        data: data,
        success: function() {
            status.html('<div class="alert alert-success">Your feedback was submitted successfully</div>');
        },
        error: function(error) {
            submitButton.show();
            status.html('<div class="alert alert-danger">There was an error submitting your feedback - ' + error + '</div>');
        }
    });

    return false;
});