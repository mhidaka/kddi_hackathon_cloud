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

            MATCH_WATER = 100;
            STANDARD_WATER = 10;

            MATCH_FOOD = 100;
            STANDARD_FOOD = 10;

            server.xhr('GET', url, {}, function (data) {
                console.log(data);
                var json = JSON.parse(data);

                console.log("室温" + json.data.room);
                console.log("水量" + json.data.water);
                console.log("餌量" + json.data.food);

                var getWaterStatus = function(json){
                    var waterRate = json.data.water;
                    msg = "すくない";

                    if (waterRate >= MATCH_WATER) {
                        msg = "いっぱい";
                    } if (waterRate >= STANDARD_WATER) {
                        msg = "ふつう";
                    }else{
                        msg = "すくない";
                    }
                    return msg;
                };

                var getFoodStatus = function(json){
                    var foodRate = json.data.food;
                    msg = "すくない";

                    if (foodRate >= MATCH_FOOD) {
                        msg = "いっぱい";
                    } if (foodRate >= STANDARD_FOOD) {
                        msg = "ふつう";
                    }else{
                        msg = "すくない";
                    }
                    return msg;
                };

                $("#temperature").html(json.data.room);
                $("#water").html(getWaterStatus(json));
                $("#food").html(getFoodStatus(json));
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

