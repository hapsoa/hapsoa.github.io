(function () {


    var $value = $('#value');

    var $number = $('.number');
    var $operator = $('.operator');
    var $equal = $('#equal');

    var expression; //화면에 뜨는 수식 전체


    var $ac = $('#ac');
    var $convertingSign = $('#convert-sign');
    var $percent = $('#percent');
    var $dot = $('#dot');

    var $calButton = $('.cal-button');

    $number.on('click', function () {

        expression = $value.text();

        if (expression === '0')
        // 0을 없애고 해당 수를 채운다.
            $value.text('');

        expression = $value.text();

        expression += $(this).text();
        $value.text(expression);

    });

    $operator.on('click', function () {

        expression = $value.text();

        if (!isNaN(expression[expression.length - 1]))
        // 추가시킨다 연산자를
            $value.text(expression + $(this).attr('operator'));


        // 연산자를 2개이상 붙일 수 없다.
        // if (expression.charAt(expression.length-1) !== '+' &&
        //     expression.charAt(expression.length-1) !== '-' &&
        //     expression.charAt(expression.length-1) !== '*' &&
        //     expression.charAt(expression.length-1) !== '/')
        //     expression += $(this).attr('operator');
        //
        // $value.text(expression);


    });

    $equal.on('click', function () {
        $value.text(eval(expression));
    });


    $ac.on('click', function () {
        $value.text('0');
        expression = '0';
    });

    $convertingSign.on('click', function () {

        expression = $value.text();

        // 양수면, 음수면
        if (Number(expression) > 0)
            expression = '-' + $value.text();
        else if (Number(expression) < 0)
            expression = String(Number(expression) * (-1));

        $value.text(expression);

    });

    $percent.on('click', function () {
        //나누기 100을 한 값을 나타내준다.
        expression = $value.text();
        $value.text(String(Number(expression) / 100));
    });

    $dot.on('click', function() {
        //끝에 점을 하나 찍는다.
        expression = $value.text();
        if (expression.charAt(expression.length - 1) !== '.')
            $value.text(expression + $dot.text());
    });

    $calButton.on('click', function() {
        //길이가 길어지면 폰트 크기를 줄인다.
        expression = $value.text();
        console.log(expression);

        if (expression.length < 9)
            $value.css('font-size', '2.8rem');
        else
            $value.css('font-size', '1rem');
    });

})();

