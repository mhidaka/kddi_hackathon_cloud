var server = (function () {

  function CloudPoint() {
    cloud = this;
    this.HOST = 'http://firefox-team9.azurewebsites.net/hamster';

    this.xhr = function(method, url, data, success, error){
        var ajax = new XMLHttpRequest();
        ajax.open(method, url,true);
        ajax.onreadystatechange = function Receive() {
          if (ajax.readyState == 4 && ajax.status == 200){
              success(ajax.responseText);
          } else if (ajax.status != 200) {
              error("Loading failure");
          }
        };
        ajax.send(data);
      };

      this.getLastData = function(){
        url = cloud.HOST + '/get_latest?callback=server.callback';
        server.xhr('GET', url, {}, function(data){
          console.log(data);
          json = JSON.stringify(data);
          alert(json);
        });

        //var script = document.createElement('script');
        //script.src = cloud.HOST + '/get_latest?callback=server.callback';
        //document.body.appendChild(script);
      };

      this.callback = function(data){
          console.log(data);
          json = JSON.stringify(data);
          alert(json);
      };
      
  }
  return new CloudPoint();
})();

