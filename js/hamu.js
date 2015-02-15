var server = (function () {

    function CloudPoint() {
        cloud = this;
        this.HOST = 'http://firefox-team9.azurewebsites.net/hamster';

        this.xhr = function (method, url, data, success, error) {
            var ajax = new XMLHttpRequest({mozSystem: true});
            ajax.open(method, url, true);
            ajax.onreadystatechange = function Receive() {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    success(ajax.responseText);
                } else if (ajax.status != 200) {
                    error("Loading failure");
                }
            };
            ajax.send(data);
        };

        this.getLastData = function () {
            url = cloud.HOST + '/get_latest';
            server.xhr('GET', url, {}, function (data) {
                console.log(data);
                var json = JSON.parse(data);
//          alert(json);

//          alert(json.data.id);


                var test = $("#test").html();
                $("#test").html(test + " " + json.data.id);

//                var hamStatus = calc(json);
//                if (hamStatus == 1) {
//                    $(".ham_status_image").attr("src", "images/hamu01.jpg");
//                } else {
//                    $(".ham_status_image").attr("src", "images/hamu02.jpg");
//                }

//                var calc = function (data) {
//
//                    return 1;
//                };

            });

            //var script = document.createElement('script');
            //script.src = cloud.HOST + '/get_latest?callback=server.callback';
            //document.body.appendChild(script);
        };

        this.callback = function (data) {
//          console.log(data);
            json = JSON.stringify(data);
//          alert(json);
//
//        var id = json.data.id;
//        var test = $("#test").html();
//        $("#test").html(test+ " " + json);
        };

    }

    return new CloudPoint();
})();

