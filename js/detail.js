var chartdata = {
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
    ["分",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    ["ハム",0,2,1,3,0,0,0,0,1,2,3,4,5,2,3,0,2,1,3,0,0,0,0,1,2,3,4,5,2,3,0,2,1,3,0,0,0,0,1,2,3,4,5,2,3,0,2,1,3,0,0,0,0,1,2,3,4,5,2,3]
  ]
};

$(document).ready(function() {
	ccchart.init("activity", chartdata);
	server.getActivity();
  server.getLastDataforDetail();
});

