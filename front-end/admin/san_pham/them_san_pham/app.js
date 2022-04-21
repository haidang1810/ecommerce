$('.input-price').on('input',function(){
    var value = $(this).val().replaceAll('.','').replace(/[^\d]/,'');
    $(this).val(numberWithCommas(value));
})

$('.input-amount').on('keypress', function (event) {
    var charCode = !event.charCode ? event.which : event.charCode;
    if( charCode == 46 || charCode == 69 || charCode == 101 
    || charCode == 45 || charCode == 43)
        event.preventDefault();
});
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
$('#avatar_input').change(function (event) {
    $('.avatar_img').attr("src",URL.createObjectURL(event.target.files[0]));
    var reader = new FileReader();

    reader.onload = function (e) {
        var img = new Image();      
        img.src = e.target.result;

        img.onload = function () {
            var w = this.width;
            var h = this.height;
            $('#width').html(w);
            $('#height').html(h);
        }
    };
    reader.readAsDataURL(event.target.files[0]);
}); 

$('#img-produce-input').change(function (event) {
    $('.list-img-produce').html("");
    for(let item of event.target.files){
        var reader = new FileReader();
        reader.onload = function (e) {
            var img = new Image();      
            img.src = e.target.result;

            img.onload = function () {
                var w = this.width;
                var h = this.height;
                $('.list-img-produce').append(`
                    <div>
                        <img class='img-produce' 
                        src='${URL.createObjectURL(item)}' alt="">
                        <p>${w}x${h}</p>
                    </div>
                `);       
            }
        };
        reader.readAsDataURL(item); 
    }
}); 
