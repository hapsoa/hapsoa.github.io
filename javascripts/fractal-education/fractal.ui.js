/**
 * Created by hyunwoo on 2018. 7. 10..
 */


function setup() {
    const $root = $('body');
    const canvas = createCanvas($root.width(), $root.height());
    canvas.parent('renderer');

    background(0);


}

const button = new function() {

    const inputs = $('input');
    const $stop = $('#stop');


    $('#exec').on('click',() => {

        const data = {};
        for(let i = 0 ; i < inputs.length ; i++){
            const $input = $(inputs[i]);
            const k = $input.attr('name');
            const v = $input.val();
            data[k] = v;
        }
        // console.log(data);

        fractalGenerator.generate(data);


        //execute버튼을 누르면 stop버튼이 stop으로 바뀐다.
        $stop.text('stop');
    });

    $stop.on('click', () => {

        let buttonName = $stop.text();

        switch(buttonName) {
            case 'stop' :
                $stop.text('continue');

                timers.forEach((element) => {
                    // 전부 멈추게 한다.
                    element.pause();
                });

                break;
            case 'continue' :
                $stop.text('stop');

                timers.forEach((element) => {
                    element.resume();
                });

                break;
            case '-' :
                console.log('no change');
                break;
        }

    });


    const $colorChange = $('#colorChange');

    $colorChange.on('click', () => {

        if ($colorChange.text() === 'RGB') {
            $colorChange.text('HSV');
            // HSV 적용
        }

        else if ($colorChange.text() === 'HSV') {
            $colorChange.text('RGB');
            // RGB 적용
        }
    });



};

/**
 * setInterval() 타이머
 * @param callback : 불리는 함수
 * @param interval : 간격 초
 */
function IntervalTimer(callback, interval) {
    var timerId, startTime, remaining = 0;
    var state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

    this.pause = function () {
        if (state !== 1) return;

        remaining = interval - (new Date() - startTime);
        window.clearInterval(timerId);
        state = 2;
    };

    this.resume = function () {
        if (state !== 2) return;

        state = 3;
        window.setTimeout(this.timeoutCallback, remaining);
    };

    this.timeoutCallback = function () {
        if (state !== 3) return;

        callback();

        startTime = new Date();
        timerId = window.setInterval(callback, interval);
        state = 1;
    };

    this.clearSetInterval = function () {
        window.clearInterval(timerId);
    };

    startTime = new Date();
    timerId = window.setInterval(callback, interval);
    state = 1;
}

/**
 * setTimeout timer
 */
// function Timer(callback, delay) {
//     let timerId;
//     let start;
//     let remaining = delay;
//
//     this.pause = function() {
//         clearTimeout(timerId);
//         remaining -= new Date() - start;
//     };
//
//     this.resume = function() {
//         start = new Date();
//         clearTimeout(timerId);
//
//         if (remaining >= 0)
//             timerId = setTimeout(callback, remaining);
//     };
//
//     this.resume();
// }

