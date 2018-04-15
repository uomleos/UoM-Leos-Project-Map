

$("#submit").click(function(){
    var name = $("#name").val().trim();
var address = $("#address").val().trim();
var lat = $("#lat").val().trim();
var lon = $("#lon").val().trim();
var url = $("#url").val().trim();
var password = $("#password").val().trim();

if(address!='' && name !='' && lat!='' && lon!='' && url!=''){

    if($.isNumeric( lat ) && $.isNumeric( lon )){

        if(password!= '' && password=='projectmap@uomleos'){
            $.post("https://www.projectmap.uomleos.org/submit/files/add.php",
            
    {
        pname: name,
        paddress: address,
        plat : lat,
        plon : lon,
        purl : url
    },
    function(data, status){
        if(status=='success'){
            loadSubmitted();
            $.alert({
                theme: 'modern',
                title: 'Successfully saved!',
                content: "Your enterd location successfully added!<br><a href='https://www.projectmap.uomleos.org/' title='View map'>Goto Map</a>",
                icon: 'fas fa-check-circle',
                type: 'green',
                draggable: true,
            });
            $("#name").val('');
            $("#address").val('');
            $("#lat").val('');
            $("#lon").val('');
            $("#url").val('');
            $("#password").val('');

        }else{
            $.alert({
                theme: 'modern',
                title: 'Submission Error!',
                content: "Error happend while submitting data. Please try again!",
                icon: 'fas fa-exclamation-circle',
                type: 'red',
                draggable: true,
            });
        }
    });
        }else{
            $.alert({
                theme: 'modern',
                title: 'Password Incorrect!',
                content: "Please enter correct passowrd!",
                icon: 'fas fa-exclamation-circle',
                type: 'red',
                draggable: true,
            });
            $("#password").val('');
            $("#password").css('border-color','red');
        }

    }else{
        $.alert({
            theme: 'modern',
            title: 'Lat Lon Error!',
            content: "Please enter correct latitude & longitude values!",
            icon: 'fas fa-exclamation-circle',
            type: 'red',
            draggable: true,
        });
        $("#lat").css('border-color','red');
        $("#lon").css('border-color','red');
        $("#password").val('');
        $("#password").css('border-color','red');
    }

}else{
    $.alert({
        theme: 'modern',
        title: 'Warning!',
        content: "Please Complete all fields before submitting!",
        icon: 'fas fa-exclamation-circle',
        type: 'red',
        draggable: true,
    });
    $("#password").val('');
    $("#password").css('border-color','red');
}


   
  
});

function loadSubmitted(){
$.get("https://www.projectmap.uomleos.org/submit/files/get.php", function(data, status){
                    var locations = JSON.parse(data);
    //place the markers
    var projects = "";
                 for (var i = 0; i < locations.length; i++) {
                    projects+='<span class="badge badge-success h2">'+locations[i].name+'</span>&nbsp;';
                }
                console.log(projects);
                document.getElementById('submitted').innerHTML = projects;
        
        
        });
}

loadSubmitted();