function setup() {
    // put setup code here
    const canvas = createCanvas(700, 700);

    canvas.parent('sketch-holder');

    background(10, 10, 10);
}

// 중심점
const centerPointX = 350;
const centerPointY = 350;

let length = 20;
let depth = 10;
let angle = 30.0;

function draw() {
    // put drawing code here
    background(10, 10, 10);

    // 한 점에서 6개의 선을 그린다.
    stroke(255);
    translate(centerPointX, centerPointY);
    line(0, 0, length, 0);

    fractalize(depth, length, angle);

    stroke(255);
    rotate(2 * PI / 3.0);
    line(0, 0, length, 0);

    fractalize(depth, length, angle);

    stroke(255);
    rotate(2 * PI / 3.0);
    line(0, 0, length, 0);

    fractalize(depth, length, angle);


}

const fractalize = function (depth, length, angle) {

    const smallizedLength = length * 0.95;

    if (depth > 0) {
        stroke(depth * 20, 255, 255 / depth);
        translate(length, 0);

        rotate(radians(angle));
        line(0, 0, smallizedLength, 0);
        fractalize(depth - 1, smallizedLength, angle);

        rotate(-radians(angle * 2));

        line(0, 0, smallizedLength, 0);
        fractalize(depth - 1, smallizedLength, angle);
        rotate(radians(angle));

        translate(-length, 0);
    }
};

const section = new function () {

    const $input = $('input');


    const $execute = $('.execute');

    $execute.on('click', function () {

        // 프렉탈이 옵션에 따라 변경된다.
        $input.each(function () {
            const $this = $(this);
            const title = $this.parent().find('.title').text();

            if ($this.val() !== '') {
                if (title === 'Length') {
                    length = $this.val();
                }
                else if (title === 'Depth') {
                    depth = $this.val();
                }
                else if (title === 'Angle') {
                    angle = $this.val();
                }
            }
        });
        // length = ;
        // depth = ;
    });

};


