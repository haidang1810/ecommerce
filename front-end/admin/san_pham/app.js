$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
$(document).ready(function() {
    $('#product-list').DataTable({
        "lengthMenu": [10, 15, 20, 25, 30, 40, 50 ]
    });
});