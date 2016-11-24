var messageListData = [];

$(document).ready(function() {
    populateTable();
    $('#messageList table tbody').on('click', 'td a.linkshowmessage', showMsgInfo);
    $('#messageList table tbody').on('click', 'td a.linkdeletemessage', deleteMsg);
});

// Functions =============================================================

function populateTable() {
    var tableContent = '';

    $.getJSON( '/admin/admin_contact', function( data ) {
        messageListData = data;
        console.log(messageListData);
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowmessage" rel="' + this.first_name + '">' + this.first_name + ' ' + this.last_name + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.message + '</td>';
            tableContent += '<td><a href="#" class="linkdeletemessage" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        $('#messageList table tbody').html(tableContent);
        console.log(tableContent);
    });
}

// Show Msg Info
function showMsgInfo(event) {
    event.preventDefault();
    var thisFirstName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = messageListData.map(function(arrayItem) { return arrayItem.first_name; }).indexOf(thisFirstName);
    var thisMsgObject = messageListData[arrayPosition];

    $('#firstname').text(thisMsgObject.first_name);
    $('#lastname').text(thisMsgObject.last_name);
    $('#email').text(thisMsgObject.email);
    $('#message').text(thisMsgObject.message);
}

// Delete Message
function deleteMsg(event) {

    event.preventDefault();

    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {
        $.ajax({
            type: 'DELETE',
            url: '/admin/deletemsg/' + $(this).attr('rel')
        }).done(function( response ) {
            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
            // Update the table
            populateTable();
        });
    }
    else {
        // If they said no to the confirm, do nothing
        return false;
    }
};