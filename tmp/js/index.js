$(document).ready(function () {
    function draw() {
        var outerSize;
        var canvas = document.getElementById("headerCanvas");

        function resizeCanvas() {
            canvas.width = $('.canvas-wrapper').outerWidth();
            canvas.height = $('.canvas-wrapper').outerHeight();
            if (canvas.width > canvas.height) {
                outerSize = canvas.width;
            } else {
                outerSize = canvas.height;
            }
        }
        resizeCanvas();

        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");
            var radGrad;

            $(window).resize(resizeCanvas);

            function xyCoord(e) {
                return [e.pageX, e.pageY];
            }

            $('.canvas-wrapper').on('mousemove', function (e) {
                var tempCoord = xyCoord(e);
                genGradient(tempCoord);
            });

            function genGradient(coord) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                radGrad = ctx.createRadialGradient(coord[0], coord[1], 0, coord[0], coord[1], outerSize);
                radGrad.addColorStop(0, "#2E5771");
                radGrad.addColorStop(1, "rgba(0," + Math.floor((coord[0] / canvas.width) * 20) + "," + Math.floor((coord[1] / canvas.height) * 20) + ",1)");
                ctx.fillStyle = radGrad;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            genGradient([canvas.width / 2, canvas.height / 2]);
        }
    }

    draw();
});