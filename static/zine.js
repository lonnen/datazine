// ace editor setup and configuration
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");

// publish functionality
$('#publish').click(function() {
    $.ajax({
        type: 'POST',
        url: '/publish',
        data: { zine: editor.session.getValue() },
        success: function(data) { window.location = data.url; },
    })
})
