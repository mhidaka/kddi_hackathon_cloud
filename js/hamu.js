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

        this.getLastDataforMain = function () {
            url = cloud.HOST + '/get_latest';

            STATUS_ACTIVE = 100;
            STATUS_NATURAL = 10;

            // ハムスターのアクティブ値を計算し、imgパスを返す
            // 01:普通 02:寝ている 03:元気
            var getStatusImageSrc = function(data){
                var hamStatus = data.data.rpm;
                var src = "";

                if (hamStatus >= STATUS_ACTIVE) {
                    src = "images/hamu03.jpg";
                } if (hamStatus >= STATUS_NATURAL) {
                    src = "images/hamu01.jpg";
                }else{
                    src = "images/hamu02.jpg";
                }

                return src;
            };

            server.xhr('GET', url, {}, function (data) {
                console.log(data);
                var json = JSON.parse(data);
//          alert(json);
//          alert(json.data.id);

                var hamStatusImg = getStatusImageSrc(json);
                console.log(hamStatusImg);

                $(".ham_status_image").attr("src", hamStatusImg);
            });

            //var script = document.createElement('script');
            //script.src = cloud.HOST + '/get_latest?callback=server.callback';
            //document.body.appendChild(script);
        };

        this.getLastDataforDetail = function(){
            url = cloud.HOST + '/get_latest';

            server.xhr('GET', url, {}, function (data) {
                console.log(data);
                var json = JSON.parse(data);

                console.log("室温" + json.data.room);
                console.log("水量" + json.data.water);
                console.log("水量" + json.data.food);

                $("#temperature").html(json.data.room);
                $("#temperature").paddingTop();
                $("#water").html(json.data.water);
                $("#food").html(json.data.food);
            });

        };

        this.callback = function (data) {
//          console.log(data);
            json = JSON.stringify(data);
//          alert(json);
        };

    }

    return new CloudPoint();
})();

