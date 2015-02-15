$(document).ready(function() {
    $.material.init();
    setInterval(function(){
        server.getLastDataforMain();
    },1000);
    server.getLastDataforMsg();
});
