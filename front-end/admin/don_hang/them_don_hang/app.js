$('.amount-input').on('keypress', function (event) {
    var charCode = !event.charCode ? event.which : event.charCode;
    if( charCode == 46 || charCode == 69 || charCode == 101 
    || charCode == 45 || charCode == 43)
        event.preventDefault();
});
$('.amount-input').blur(function(){
    if($(this).val()==""||$(this).val()==0)
        $(this).val(1);
})
$(".btn-sub").on("click", function(){
    let value = Number($('.amount-input').val());
    if(value==0) return;
    $('.amount-input').val(value-1);
})
$(".btn-add").on("click", function(){
    let value = Number($('.amount-input').val());
    $('.amount-input').val(value+1);
})
$('#phone-add-customer').on('keypress', function (event) {
    var charCode = !event.charCode ? event.which : event.charCode;
    if( charCode == 46 || charCode == 69 || charCode == 101 
    || charCode == 45 || charCode == 43)
        event.preventDefault();
});
