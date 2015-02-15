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

        this.callback = function (data) {
//          console.log(data);
            json = JSON.stringify(data);
//          alert(json);
        };


        this.getActivity = function (){
          url = cloud.HOST + '/get_activity';
          server.xhr('GET', url, {}, function (data) {
              console.log(data);
              var json = JSON.parse(data);
              
              chart = [];
              chart[0] = [];
              chart[1] = [];
              chart[0][0] = '分';
              chart[1][0] = 'ハム';
              
              for (var i=0; i < json.data.length;i++){
                  index = i+1;
                  chart[0][index]  = index;
                  chart[1][index]  = json.data[i].rpm;
                  console.log(i +': '+json.data[i].rpm);
              } 
              chartdata.data = chart;
             	ccchart.init("activity", chartdata);
             
          });
        };

    }

    return new CloudPoint();
})();

