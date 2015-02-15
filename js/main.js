$(document).ready(function() {
    $.material.init();
    setInterval(function(){
        server.getLastData();
    },1000);
});
