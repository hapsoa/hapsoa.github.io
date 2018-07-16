(function () {

    // const openCloseButton = new Button('.open-close-button');

    const $openCloseButton = $('.open-close-button');
    const $aside = $('aside');

    /**
     * 검색 옵션을 열고 닫는다
     */
    $openCloseButton.on('click', function () {

        if ($openCloseButton.attr('status') === undefined ||
            $openCloseButton.attr('status') === 'open') {
            // 닫는다
            $aside.css('width', '0');
            $openCloseButton.attr('status', 'close');
        }
        else {
            // 연다.
            $aside.css('width', '400px');
            $openCloseButton.attr('status', 'open');
        }

    });

    /**
     * checkbox 버튼
     */
    function Button(targetClass) {
        const $target = $(targetClass);
        const $name = $target.parent().find('.name');

        this.applyText = function ($text) {
            if ($name.text() === '밑줄') {
                $text.find('span').css('text-decoration-line', 'underline');
            }
            if ($name.text() === '백그라운드') {
                // 텍스트에다 그 위치의 글자를 형광칠한다
                // $text에 어떻게 그 위치만 적용시킬 수 있을까
                // 적용한다.
                $text.find('span').css('background-color', 'yellow');

            }
            if ($name.text() === '굵게')
                $text.find('span').css('font-weight', 'bolder');
            if ($name.text() === '기울이기')
                $text.find('span').css('font-style', 'oblique');
        };


        this.applyTextUnit = function () {

        };

        return this;
    }


    // 적용할 함수들을 담아둔다.
    let textApplies = [];


    // 체크박스 설정하기
    const $checkbox = $('.checkbox');

    $checkbox.on('click', function () {
        // console.log(this);

        if (!$(this).hasClass('checked')) {
            $(this).addClass('checked');
            $(this).append('<i class="fas fa-check"></i>');

        }
        else {
            $(this).removeClass('checked');
            $(this).find('i').remove();

        }

        // 텍스트 적용 함수를 비운다.
        textApplies = [];

        // 체크된걸 스타일함수를 배열에 넣는다.
        const $decorationOption = $('.decoration-option');
        const $checked = $decorationOption.find('.checked');
        $checked.each(function () {
            const checkbox = new Button(this);
            textApplies.push(checkbox.applyText);
        });

        // 스타일 초기화
        const $checkbox = $('.checkbox');
        $checkbox.each(function () {
            $mainText.find('span').css('text-decoration-line', 'none');
            $mainText.find('span').css('background-color', 'rgba(0, 0, 0, 0)');
            $mainText.find('span').css('font-weight', 'normal');
            $mainText.find('span').css('font-style', 'normal');
        });

        // 새로운 스타일 적용한다.
        for (let i = 0; i < textApplies.length; i++) {
            textApplies[i]($mainText);
        }

    });


    // 라디오버튼 설정하기
    const $radioButton = $('.radio-button');
    let unitType = '글자';

    $radioButton.on('click', function () {

        if (!$(this).hasClass('checked')) {
            $(this).addClass('checked');
            $(this).append('<div class="full-circle"></div>');

            unitType = $(this).parent().find('.name').text();

            const that = this;
            // 나머지 라디오 버튼들은 체크 해제
            $radioButton.each(function () {
                if (this !== that) {
                    $(this).removeClass('checked');
                    $(this).find('.full-circle').remove();
                }
            });

        }

        //새로운 span을 적용한다.
        $mainText.html(originalMainText);

        if ($input.val() !== '')
            putSpan($mainText, $input.val());

        // 새로운 span이 적용이 되었으니, span에다 속성을 다시 넣는다.
        const $checkbox = $('.checkbox');
        $checkbox.each(function () {
            $mainText.find('span').css('text-decoration-line', 'none');
            $mainText.find('span').css('background-color', 'rgba(0, 0, 0, 0)');
            $mainText.find('span').css('font-weight', 'normal');
            $mainText.find('span').css('font-style', 'normal');
        });

        // 새로운 스타일 적용한다.
        for (let i = 0; i < textApplies.length; i++) {
            textApplies[i]($mainText);
        }


        // result 화면 적용
        showResult();


    });


    const $input = $('input');

    const $mainText = $('.main-text-box');
    const originalMainText = $mainText.html();

    // input창의 값을 본문에서 찾는다.
    $input.on('keyup', function (event) {

        // input 내용 : $input.val()
        // 본문 : $mainText.text()

        $mainText.html(originalMainText);

        // input 검색값을 mainText의 text에 span을 넣는 단위기능
        if ($input.val() !== '')
            putSpan($mainText, $input.val());

        console.log($mainText.html());
        // 글자 단어 문장 옵션인지 체크해서
        // 원하는 옵션에 꾸미기를 적용한다.
        for (let i = 0; i < textApplies.length; i++) {
            textApplies[i]($mainText);
        }


        // 아래 화면에 선택된 text들을 띄운다.
        showResult();

    });

    /**
     * 아래 화면에 선택된 text들을 띄운다.
     */
    function showResult() {
        //초기화 한다.
        const $span = $mainText.find('span');

        const $resultBox = $('.result-box');
        $resultBox.empty();

        // 아래 화면에 span.text를 넣는다.
        $span.each(function (index) {
            $(this).attr('id', 'result-item' + index);
            $resultBox.append('<div class="result-item" num=' + index + '>' + index + ': ' + $(this).text() + '</div>');
        });

        const $resultItem = $('.result-item');

        // result item 클릭시
        $resultItem.on('click', function() {
            // 초기화 한다.
            $span.css('color', 'black');
            $mainText.scrollTop();

            // 선택된 녀석을 고른다.
            const number = $(this).attr('num');
            console.log(number);
            // 그녀석의 원래 해당하는 $maintext의 span 위치로 이동한다.
            console.log($('span[id="result-item'+ number + '"]').html());

            let position = $('span[id="result-item'+ number + '"]').position();
            $('span[id="result-item'+ number + '"]').css('color', 'red');
            // $mainText.scrollTop(offset.top);

            $mainText.animate({scrollTop : position.top}, 400);
        });

        console.log($resultBox.html());
    }


    function replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }

    function putSpan($text, inputValue) { //parameter 하나 더
        console.log(unitType);
        if (unitType === '글자')
            $text.html(replaceAll($text.html(), inputValue, '<span>' + inputValue + '</span>'));

        if (unitType === '단어') {
            // 글자를 포함한 단어를 모두 span을 친다.
            // 띄우기를 기준으로 적용을 해야 한다.

            let temp = $text.html().split(/(,|<br>|\.| )/);

            for (let i = 0; i < temp.length; i++) {
                // 각각의 단어에 input값이 있는지 찾는다.
                if (temp[i].includes(inputValue)) {
                    temp[i] = '<span>' + temp[i] + '</span>';
                }
            }

            temp = temp.join('');

            // console.log(temp);
            $text.html(temp);

        }
        if (unitType === '문장') {
            // 문장 기준으로 적용한다.

            let temp = $text.html().split(/(<br>|\.|\?)/);

            for (let i = 0; i < temp.length; i++) {
                if (temp[i].includes(inputValue)) {
                    temp[i] = '<span>' + temp[i] + '</span>';
                }
            }

            temp = temp.join('');

            $text.html(temp);
        }
    }


})();

