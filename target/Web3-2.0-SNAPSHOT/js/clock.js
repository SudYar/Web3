clocks = (querySelect, canvasSize, interval, dataPanel) => {

    this.colors = {
        background: 'white',
        clockface: 'black',
        numbers: 'grey',
        marks: {
            hours: 'navy',
            minutes: 'blue'
        },
        clockhands: {
            hours: 'black',
            minutes: 'black',
            seconds: 'red'
        }
    };

    this.SIZE = 150;
    this.DPI_SIZE = SIZE * 2;

    this.INTERVAL = interval;
    this.dataPanel = dataPanel;
    this.canvas = document.querySelector(querySelect);
    this.ctx = this.canvas.getContext('2d');


    this.setCanvasSize = (canvasSize) => {
        if (canvasSize !== undefined) {
            this.SIZE = canvasSize;
            this.DPI_SIZE = SIZE * 2;
        }
        this.canvas.style.width = this.SIZE + 'px';
        this.canvas.style.height = this.SIZE + 'px';
        this.canvas.width = this.DPI_SIZE;
        this.canvas.height = this.DPI_SIZE;

        this.chSeconds = DPI_SIZE * 0.44;
        this.chMinutes = DPI_SIZE * 0.35;
        this.chHours = DPI_SIZE * 0.26;
        this.radiusNum = SIZE;
    }

    this.drawHand = (leng, angle, widt, color) => {
        this.ctx.beginPath();
        this.ctx.lineWidth = widt;
        this.ctx.strokeStyle = color;
        this.ctx.moveTo(SIZE, SIZE);
        this.ctx.lineTo(SIZE + leng * Math.cos(Math.PI / 2 - angle * (Math.PI / 180)),
            SIZE - leng * Math.sin(Math.PI / 2 - angle * (Math.PI / 180)));
        this.ctx.stroke();
        this.ctx.closePath();
    }

    this.draw = (date) => {
        this.ctx.clearRect(0, 0, DPI_SIZE, DPI_SIZE);
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        
        this.ctx.strokeStyle = this.colors.clockface;
        this.ctx.fillStyle = this.colors.background;
        this.ctx.arc(this.SIZE, this.SIZE, this.SIZE - 2, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.arc(this.SIZE, this.SIZE, this.SIZE - 2, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();

        this.radiusNum = SIZE - 10;
        
        for (var tm = 0; tm < 60; tm++) {
            this.ctx.beginPath();
            if (tm % 5 === 0) {
                this.ctx.strokeStyle = colors.marks.hours;
                this.ctx.lineWidth = 4;
            } else {
                this.ctx.strokeStyle = colors.marks.minutes;
                this.ctx.lineWidth = 2;
            }
            var xPointM = this.SIZE + this.radiusNum * Math.cos(-6 * tm * (Math.PI / 180) + Math.PI / 2);
            var yPointM = this.SIZE - this.radiusNum * Math.sin(-6 * tm * (Math.PI / 180) + Math.PI / 2);
            this.ctx.moveTo(SIZE, SIZE);
            this.ctx.lineTo(xPointM, yPointM);
            this.ctx.stroke();
            this.ctx.closePath();
        }

        
        this.ctx.beginPath();
        this.ctx.fillStyle = colors.background;
        this.ctx.arc(SIZE, SIZE, SIZE - 20, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
        
        var fillStyle = this.ctx.strokeStyle;
        this.ctx.strokeStyle = colors.numbers;
        this.ctx.fillStyle = colors.numbers;
        for (var th = 1; th <= 12; th++) {
            this.ctx.beginPath();
            this.ctx.font = 'bold 25px sans-serif';
            var xText = this.SIZE + (this.radiusNum - 30) * Math.cos(-30 * th * (Math.PI / 180) + Math.PI / 2);
            var yText = this.SIZE - (this.radiusNum - 30) * Math.sin(-30 * th * (Math.PI / 180) + Math.PI / 2);
            if (th <= 9) {
                this.ctx.fillText('' + th, xText - 5, yText + 10);
            } else {
                this.ctx.fillText('' + th, xText - 15, yText + 10);
            }
            this.ctx.stroke();
            this.ctx.closePath();
        }
        this.ctx.strokeStyle = fillStyle;
        
        this.ctx.beginPath();
        var angleSec = 6 * date.getSeconds();
        var angleMin = 6 * (date.getMinutes() + (1 / 60) * date.getSeconds());
        var angleHour = 30 * (date.getHours() + (1 / 60) * date.getMinutes());

        this.drawHand(chHours, angleHour, 4, colors.clockhands.hours);
        this.drawHand(chMinutes, angleMin, 2, colors.clockhands.minutes);
        this.drawHand(chSeconds, angleSec, 1, colors.clockhands.seconds);

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#000000";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.lineWidth = 3;
        this.ctx.arc(SIZE, SIZE, 5, 0, 2 * Math.PI, true);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    this.fillClockPanel = () => {
        if (this.dataPanel !== undefined) {
            var container = document.querySelector(this.dataPanel);
            if (container !== undefined) {
                container.innerText = new Intl.DateTimeFormat('ru', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }).format(lastDate);
            }
        }
    }

    this.setCanvasSize(canvasSize);

    this.lastDate = new Date();

    this.animate = () => {
        var date = new Date();
        var diff = date - this.lastDate;
        if (diff >= 1000 * this.INTERVAL) {
            this.lastDate = date;
            this.draw(this.lastDate);
            this.fillClockPanel(this.lastDate);
        }
        requestAnimationFrame(animate);
    }

    this.run = () => {
        c.draw(lastDate);
        c.fillClockPanel(lastDate);
        this.animate();
    }
    return this;
};