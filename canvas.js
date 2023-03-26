const canvas = document.getElementById("textCanvas");
const raycastLength = 2000;

if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const resizeWindow = window.addEventListener("resize", resizeCanvas);
    const mouseEvent = addEventListener("mousemove", mouseMove);
    let mouseX = 0;
    let mouseY = 0;
    resizeCanvas();
    requestAnimationFrame(draw);
    function mouseMove(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        draw();
    }
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "100px Lato";
        ctx.textBaseline = "middle";
        const text = ctx.measureText("Severi Lybeck");
        ctx.fillText("Severi Lybeck", (canvas.width / 2) - text.width / 2, canvas.height / 2);
        let raycasts = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //ctx.putImageData(raycasts, 0, 0);

        //does the raycasting
        for (let i = 0; i < Math.PI * 2*10; i++) {
            let baseX = mouseX;
            let baseY = mouseY;
            let endX = mouseX + Math.sin(i) * raycastLength;
            let endY = mouseY + Math.cos(i) * raycastLength;
            raycastToTextCollision(baseX, baseY, i);
            ctx.strokeStyle = "blue";
            ctx.beginPath();
            ctx.moveTo(baseX, baseY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
        //binary search the collision point
        function raycastToTextCollision(sx, sy, angle) {
            let continueCheck = true;
            while (continueCheck) {
                //start by checking text rectangle end angles compared to mousepos;
                if (sy > canvas.height / 2) {
                    const textMaxAngle = Math.atan((canvas.height/2 + text.actualBoundingBoxDescent) / ((canvas.width/2) + text.actualBoundingBoxLeft));
                    const textMinAngle = Math.atan((canvas.height/2 + text.actualBoundingBoxDescent) / ((canvas.width/2) + text.actualBoundingBoxRight));
                    console.log((textMaxAngle/Math.PI)*180);
                    console.log((textMinAngle/Math.PI)*180);
                }
                else {
                    const textMaxAngle = Math.atan((canvas.height/2 + text.actualBoundingBoxAscent) / ((canvas.width/2) + text.actualBoundingBoxLeft));
                    const textMinAngle = Math.atan((canvas.height/2 + text.actualBoundingBoxAcent) / ((canvas.width/2) + text.actualBoundingBoxRight));
                    console.log((textMaxAngle/Math.PI)*180);
                    console.log((textMinAngle/Math.PI)*180);
                }

                continueCheck = false;
            }
        }
        requestAnimationFrame(draw);
    }
}
else {
    console.log("lol ur computer bad");
}

