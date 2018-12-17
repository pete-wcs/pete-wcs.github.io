$(document).on('submit', '#feedback-form', function(event) {
    event.preventDefault();

    var submitButton = $('#submit-feedback');
    submitButton.hide();

    var status = $('#feedback-status');
    status.html('<div class="alert alert-light">Submitting feedback....</div>');

    var message = '';
    $(this).find('.feedback-item').each(function (){
        var key = $(this).find('label').text();
        var value = $(this).find('.feedback-input').val();
        message += key + ': ' + value + '<br/>';
    });

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "admin@winfordcommunityshop.org.uk",
        Password : "6b78c4a0-26c9-46f4-b994-91ef3e703349",
        To : 'admin@winfordcommunityshop.org.uk',
        From : "pledges@winfordcommunityshop.org.uk",
        Subject : 'Pledge received from ' + $('#name').val(),
        Body : message
    }).then(
        response => {
            console.log(response);
            if (response === 'OK') {
                status.html('<div class="alert alert-success">Your feedback was submitted successfully</div>');
            } else {
                submitButton.show();
                status.html('<div class="alert alert-danger">There was an error submitting your feedback - ' + response + '</div>');
            }
        }
    );

    return false;
});