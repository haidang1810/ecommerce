$('#input_discount').on('keypress', function (event) {
    var charCode = !event.charCode ? event.which : event.charCode;
    if( charCode == 46 || charCode == 69 || charCode == 101 
    || charCode == 45 || charCode == 43)
        event.preventDefault();
});
$(document).ready(function() {
    $('#product-list').DataTable({
        "lengthMenu": [10, 15, 20, 25, 30, 40, 50 ]
    });
});