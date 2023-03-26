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
        ctx.clearRect(0,0, canvas.width, canvas.height);
        ctx.font = "100px Lato";
        ctx.textBaseline = "middle";
        const textMeasurements = ctx.measureText("Severi Lybeck");
        ctx.fillText("Severi Lybeck", (canvas.width/2)-textMeasurements.width/2, canvas.height/2);
        let raycasts = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //ctx.putImageData(raycasts, 0, 0);
        for(let i = 0; i< 3600; i++) {
            let baseX = mouseX;
            let baseY = mouseY;
            let endX = mouseX+Math.sin(i/180*Math.PI)*raycastLength;
            let endY = mouseY+Math.cos(i/180*Math.PI)*raycastLength;
            ctx.strokeStyle = "blue";
            ctx.beginPath();
            ctx.moveTo(baseX, baseY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
        requestAnimationFrame(draw);
    }
}
else {
    console.log("lol ur computer bad");
}

