$("#btn-show-pass-login").click(function(){
    if($("#input-password-login").attr("type") == "password"){
        $("#btn-show-pass-login").html(`<i class="fa-solid fa-eye-slash"></i>`);
        $("#input-password-login").attr("type","text");
    }else {
        $("#btn-show-pass-login").html(`<i class="fa-solid fa-eye"></i>`);
        $("#input-password-login").attr("type","password");
    }
})
$("#btn-show-pass-register").click(function(){
    if($("#input-password-register").attr("type") == "password"){
        $("#btn-show-pass-register").html(`<i class="fa-solid fa-eye-slash"></i>`);
        $("#input-password-register").attr("type","text");
    }else {
        $("#btn-show-pass-register").html(`<i class="fa-solid fa-eye"></i>`);
        $("#input-password-register").attr("type","password");
    }
})
