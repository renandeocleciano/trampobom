var $uploadCrop,
    tempFilename,
    rawImg,
    imageId;

function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.upload-image').addClass('ready');
            $('#cropImagePop').modal('show');
            rawImg = e.target.result;
        }
        reader.readAsDataURL(input.files[0]);
    }
    else {
        swal("Sorry - you're browser doesn't support the FileReader API");
    }
}    

$uploadCrop = $('#upload-image').croppie({
    viewport: {
        width: 150,
        height: 200,
    },
    enforceBoundary: false,
    enableExif: true
});

$('#cropImagePop').on('shown.bs.modal', function(){
    $uploadCrop.croppie('bind', {
        url: rawImg
    }).then(function(){
        console.log('jQuery bind complete');
    });
});

$('.item-img').on('change', function () { 
    imageId = $(this).data('id'); 
    tempFilename = $(this).val();
    $('#cancelCropBtn').data('id', imageId); 
    readFile(this); 
});

$('#cropImageBtn').on('click', function (ev) {
    $uploadCrop.croppie('result', {
        type: 'base64',
        format: 'jpeg',
        size: {width: 130, height: 130}
    }).then(function (resp) {
        sendImage(resp);
        $('#item-img-output').attr('src', resp);
        $('#cropImagePop').modal('hide');
    });
});

function sendImage(resp) {
    $.ajax({
        type: "POST",
        url: "/user/saveprofileimage",
        data: {
          base64Img: resp
        },
        success: function(data){
            console.log(data);
        },
        error: function (error) {
            console.log(error);
        }
      });
}