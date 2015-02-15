var chartdata53 = {
  "config": {
    "type": "stackedarea",
    "colorSet": 
          ["#e67e22"],
    "useMarker": "arc",
    "useVal": "no",
    "roundedUpMaxY": 100,
    "width": 325,
    "height": 200,
    "onlyChart":"yes",
    "bg": "#fff"
  },

  "data": [
    ["分",1,2,3,4,5,6,7,8,9,10,11,12],
    ["ハム",52,57,44,50,60,55,68,80,64,41,57,78]
  ]
};

$(document).ready(function() {
	ccchart.init("activity", chartdata53);
    server.getLastDataforDetail();
});
