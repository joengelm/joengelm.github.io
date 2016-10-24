<script src="../lib/jquery-1.11.1.min.js"></script>
<script src="../lib/jquery-1.11.1.min.js"></script>
<script>
function typeText(string, speed) {
    $('#textDiv').append('<h1></h1>');
    $('#textDiv').append('<span id="bottom"></span>');
    var dest = $('h1:last')[0]; 
    var i = setInterval(function () { //basically a while loop with a delay between each iteration
        if (c >= string.length) {
            $(dest).html(string);
            clearInterval(i);
            // c = 0;
        } else {
            $('<span>').text(string[c]).
            appendTo(dest);
            c += 1;
            $('#bottom')[0].scrollIntoView(false);
        }
    }, speed); //this is the delay in milliseconds between each character, increase to slow down, decrease to speed up
};

function speakNType(str){
    //meSpeak.speak(str, {speed:155, amplitude:150, variant:"f5"});
    responsiveVoice.speak(str, "Australian Female", {rate: 0.9})
}
</script>