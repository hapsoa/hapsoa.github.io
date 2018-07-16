let timers = [];

const fractalGenerator = new function () {

    let generateData = {};
    let nodes = {};

    const drawLineByAngle = (x1, y1, degree, depth) => {

        // depthCount 이상이면 함수종료
        if (depth > generateData.depthCount) return;

        const length = Math.pow(generateData.childBranchLengthRatio, depth)
            * generateData.initialBranchLength;

        const radian = degree / 180 * Math.PI;
        const x2 = Math.cos(radian) * length + x1;
        const y2 = Math.sin(radian) * length + y1;


        // 현재 선 정보를 저장한다.
        nodes[`${depth}`].push({
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2
        });

        let startAngle = -(generateData.childBranchCount - 1)
            * generateData.childBranchAngle / 2 + degree * 1;

        for (let i = 0; i < generateData.childBranchCount; i++) {
            drawLineByAngle(x2, y2, startAngle, depth + 1);
            startAngle += generateData.childBranchAngle * 1;
        }


    };


    const lerpHexColor = (ratio) => {
        const r1 = Number('0x' + generateData.startColor[1] + generateData.startColor[2]);
        const g1 = Number('0x' + generateData.startColor[3] + generateData.startColor[4]);
        const b1 = Number('0x' + generateData.startColor[5] + generateData.startColor[6]);
        const r2 = Number('0x' + generateData.endColor[1] + generateData.endColor[2]);
        const g2 = Number('0x' + generateData.endColor[3] + generateData.endColor[4]);
        const b2 = Number('0x' + generateData.endColor[5] + generateData.endColor[6]);
        const r = r1 * (1 - ratio) + r2 * ratio;
        const g = g1 * (1 - ratio) + g2 * ratio;
        const b = b1 * (1 - ratio) + b2 * ratio;

        return {
            r,
            g,
            b,
        }
    };

    const hslHexColor = (ratio) => {
        const r1 = Number('0x' + generateData.startColor[1] + generateData.startColor[2]);
        const g1 = Number('0x' + generateData.startColor[3] + generateData.startColor[4]);
        const b1 = Number('0x' + generateData.startColor[5] + generateData.startColor[6]);
        const r2 = Number('0x' + generateData.endColor[1] + generateData.endColor[2]);
        const g2 = Number('0x' + generateData.endColor[3] + generateData.endColor[4]);
        const b2 = Number('0x' + generateData.endColor[5] + generateData.endColor[6]);
        let h1 = rgbToHsl(r1, g1, b1)[0];
        let s1 = rgbToHsl(r1, g1, b1)[1];
        let l1 = rgbToHsl(r1, g1, b1)[2];
        let h2 = rgbToHsl(r2, g2, b2)[0];
        let s2 = rgbToHsl(r2, g2, b2)[1];
        let l2 = rgbToHsl(r2, g2, b2)[2];
        const h = h1 * (1 - ratio) + h2 * ratio;
        const s = s1 * (1 - ratio) + s2 * ratio;
        const l = l1 * (1 - ratio) + l2 * ratio;

        return {
            h,
            s,
            l
        };
    };


    this.generate = (data) => {

        generateData = data;
        blendMode(BLEND);
        background(0);
        for (let i = 1; i < 99999; i++)
            window.clearInterval(i);

        timers = [];

        blendMode(ADD);
        const cx = width / 2;
        const cy = height / 2;

        const dAngle = 360 / data.startBranchCount;
        let currentAngle = 0;

        // 초기화
        nodes = {};
        for (let i = 0; i <= data.depthCount + 1; i++)
            nodes[i] = [];

        // 첫 가지를 그린다.
        for (let i = 0; i < data.startBranchCount; i++) {
            drawLineByAngle(cx, cy, currentAngle, 1);
            currentAngle += dAngle;
        }

        // 한 depth 돌때마다, timer가 하나 있도록 한다.
        let i = 0;
        const totalTimer = new IntervalTimer(() => {
            if (i > generateData.depthCount)
                totalTimer.clearSetInterval();

            // 1초 1depth, 2초 2depth ... 노드 수만큼 돌린다.
            let m = 0;
            const milliTimer = new IntervalTimer(() => {

                    if (m > 10)
                        milliTimer.clearSetInterval();

                    //색상 설정
                    let c;
                    const $colorChange = $('#colorChange');
                    if ($colorChange.text() === 'RGB') {
                        c = lerpHexColor(i / generateData.depthCount);
                        colorMode(RGB, 255, 255, 255, 255);
                        stroke(c.r, c.g, c.b, 10);
                    }
                    else if ($colorChange.text() === 'HSV') {
                        // hsl에 관함 함수로 적용시킨다.
                        c = hslHexColor(i / generateData.depthCount);

                        colorMode(HSL, 1, 1, 1, 255);
                        stroke(c.h, c.s, c.l, 10);
                    }
                    //*

                    for (let j = 0; j < nodes[i].length; j++) {
                        const e = nodes[i][j];

                        line(e.x1, e.y1, e.x2, e.y2);
                    }

                    console.log(m);
                    m++;

            }, 100);
            timers.push(milliTimer);
            i++;
        }, 1000);
        timers.push(totalTimer);
    }

};


// Object.size = function (obj) {
//     var size = 0, key;
//     for (key in obj) {
//         if (obj.hasOwnProperty(key)) size++;
//     }
//     return size;
// };