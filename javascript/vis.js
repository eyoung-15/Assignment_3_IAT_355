//This file will contain the code for generating SVG drawings and visualization.


//Bar Chart
const barChart = document.getElementById('barChart');

const data = [350, 40, 70, 500, 300];
const barWidth = 80;
const gap = 20;

const maxVal = Math.max(...data);
const chartHeight = 350;

//drawing bars
data.forEach((val, i) => {
    const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const barHeight = (val / maxVal) * chartHeight;

    bar.setAttribute("x", i * (barWidth + gap) + 50);
    bar.setAttribute("y", chartHeight - barHeight + 30);
    bar.setAttribute("width", barWidth);
    bar.setAttribute("height", barHeight);
    bar.setAttribute("fill", "#8bd3fc");

    barChart.appendChild(bar);

});

//Creative Svg
const creative = document.getElementById('creative');

const width = creative.clientWidth;
const height = creative.clientHeight;

const numCircles = 30;
const circles = [];

//Create Circles
for (let i = 0; i < numCircles; i++) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    const cx = Math.random() * width;
    const cy = Math.random() * height;
    const r = 15 + Math.random() * 10;

    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', "#8bd3fc");

    circles.push({ el: circle, x: cx, y: cy, r, vx: 0, vy: 0 });

    creative.appendChild(circle);
}

//change colors randomly upon click
creative.addEventListener("click", () => {
    circles.forEach(c => {
        let randomColor = Math.floor(Math.random() * 16777215);
        c.el.setAttribute("fill", `#${randomColor}`);
    });

});

let mouseX = null;
let mouseY = null;

creative.addEventListener("mousemove", (e) => {
    const rect = creative.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
});

creative.addEventListener("mouseleave", () => {
    mouseX = null;
    mouseY = null;
});

function animate() {
    circles.forEach(c => {
        if (mouseX !== null && mouseY !== null) {
            const dx = c.x - mouseX;
            const dy = c.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
                const force = (100 - dist) / 100;
                c.vx += (dx / dist) * force * 2;
                c.vy += (dy / dist) * force * 2;

            }
        }

        c.x += c.vx;
        c.y += c.vy;

        c.vx *= 0.9;
        c.vy *= 0.9;

        //bounce off edges
        if (c.x - c.r < 0 || c.x + c.r > width) c.vx *= -1;
        if (c.y - c.r < 0 || c.y + c.r > height) c.vy *= -1;

        //make sure circles stay inside svg area
        c.x = Math.max(c.r, Math.min(width - c.r, c.x));
        c.y = Math.max(c.r, Math.min(height - c.r, c.y));

        c.el.setAttribute("cx", c.x);
        c.el.setAttribute("cy", c.y);

    });
    requestAnimationFrame(animate);
}
animate();