$(document).ready(function(){
  $("#form_1").validate({
  		onfocusout: false,
  		onkeyup: false,
  		onclick: false,
      errorElement: 'div',
      errorPlacement: function (error, element) {
        error.insertAfter($("#text-field"));
        error.css({ 'color': 'red', 'font-size': '16px', 'margin-top': '10px' });
      },

  		rules: {
  			"code": {
  				required: true,
  				maxlength: 15
  			}
  		},
  		messages: {
  			"code": {
  				required: "Không được bỏ trống",
  				maxlength: "Hãy nhập tối đa 15 ký tự"
  			},
  		}
  	});

    var downloadToken = new Date().getTime();

    $("#button-submit").click(function() {
      downloadToken = new Date().getTime();
      $("#downloadToken").val(downloadToken);
      $("#form_1").trigger("submit");
      timer();
    });

    function timer() {
        var attempts = 200;
        var downloadTimer = window.setInterval(function () {
            var token = getCookie("downloadToken");
            attempts--;

            if (token == downloadToken || attempts == 0) {
                document.getElementById("icon-spinner").style.display = "none";
                window.clearInterval(downloadTimer);
            }
            else {
              document.getElementById("icon-spinner").style.display = "block";
            }
        }, 1000);
    }

    function parse(str) {
        var obj = {};
        var pairs = str.split(/ *; */);
        var pair;
        if ('' == pairs[0]) return obj;
        for (var i = 0; i < pairs.length; ++i) {
            pair = pairs[i].split('=');
            obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return obj;
    }

    function getCookie(name) {
        var parts = parse(document.cookie);
        return parts[name] === undefined ? null : parts[name];
    }
});
