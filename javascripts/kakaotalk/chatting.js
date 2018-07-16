(function () {

    let $root = $('.chatting-log-box');
    let template;

    // function Dialog() {
    //     template = '';
    //
    //     const $transparentBlackBox = $('.transparent-black-box');
    //
    //     this.setDisplay = function () {
    //         // $content.css('background-color', 'black');
    //         $transparentBlackBox.css('background-color', 'rgba(0,0,0,0.3)');
    //     };
    //
    // }

    function CreateModal(targetClass) {
        const $modal = $(targetClass);
        const $buttonOk = $modal.find('.button.positive');
        const $buttonCancel = $modal.find('.button.negative');
        const that = this;
        const $header = $('.header');
        const $text = $('.text');

        let positiveEvent = null;

        this.open = function(option, event) {
            $header.text(option.headerText);
            $text.text(option.contentText);
            $buttonOk.text(option.positiveText);
            $buttonCancel.text(option.negativeText);
            positiveEvent = event;
            $modal.attr('status', 'open');
        };

        this.close = function() {
            $modal.attr('status', 'close');
        };

        $buttonOk.on('click', function() {
            if (positiveEvent !== null) positiveEvent();
            that.close();
        });
        $buttonCancel.on('click', function() {
            that.close();
        });

        return this;
    }

    function Element(id, isMine) {
        if (isMine) {
            template = '<div class="self-element"><i class="material-icons">close</i>\n' +
                '    <div class="time"></div>\n' +
                '    <div class="speech-bubble self"></div>\n' +
                '</div>';
        }
        else {
            template = '<div class="friend-element">\n' +
                '    <div class="image-container">\n' +
                '        <div class="title-image"></div>\n' +
                '    </div>\n' +
                '    <div class="chat-bundle">\n' +
                '        <div class="name"></div>' +
                '        <div class="bubble-line">\n' +
                '            <div class="speech-bubble moon"></div>\n' +
                '            <div class="time"></div>\n' +
                // '<div class="self-element"><i class="material-icons">close</i>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
        }

        let $ele = $(template);
        const that = this;

        if (isMine) {
            $ele.find('i.material-icons').on('click', function () {

                //dialog 창이 뜬다.
                const modal = new CreateModal('.modal');

                modal.open({
                    headerText: '메세지 삭제',
                    contentText: '삭제 할까요?',
                    positiveText: 'Yes',
                    negativeText: 'No'
                }, function(){
                    chatApi.deleteMessage(id);
                });





                // const dialog = new Dialog();
                // dialog.setDisplay();
                //
                // chatApi.deleteMessage(id);
            });
        }

        $ele.attr('id', id);

        let elementData = {};

        if (isMine !== undefined && !isMine)
            $ele.addClass('receive');

        this.getTime = function () {
            return elementData.date;
        };

        this.getUserName = function () {
            return elementData.id;
        };

        this.setMessage = function (data) {
            elementData = data;

            $ele.find('.speech-bubble').html(data.message);
            $ele.find('.name').text(data.id);
            $ele.find('.time').text(data.date);
        };

        this.setVisibleTime = function (usage) {
            $ele.find('.time').css('visibility', usage ? 'visible' : 'hidden');
        };

        this.setVisibleName = function (usage) {
            $ele.find('.name').css('display', usage ? 'block' : 'none');
        };

        this.setVisibleProfile = function (usage) {
            $ele.find('.title-image').css('display', usage ? 'block' : 'none');
        };


        // pre
        var prev = null;
        this.prev = function (ele) {
            if (ele === undefined) return prev;
            prev = ele;
            that.update();
        };

        // next
        var next = null;
        this.next = function (ele) {
            if (ele === undefined) return next;
            next = ele;
            that.update();
        };

        // check Visible
        this.update = function () {
            // 1. 이전께 내가 보낸 거면서 시간이 같으면 나의 이름과 사진을 삭제한다.
            if (prev !== null && prev.getUserName() === that.getUserName() && prev.getTime() === that.getTime()) {
                that.setVisibleName(false);
                that.setVisibleProfile(false);
            } else {
                that.setVisibleName(true);
                that.setVisibleProfile(true);
            }

            // 2. 다음꺼와 나의 이름이 같으면서 나의 시간이 같으면 나의 시간을 삭제한다.
            if (next !== null && next.getUserName() === that.getUserName() && next.getTime() === that.getTime()) {
                that.setVisibleTime(false);
            } else {
                that.setVisibleTime(true);
            }
        };

        this.remove = function () {
            $ele.remove();
            var prev = that.prev();
            var next = that.next();
            if (prev !== null) prev.next(next);

            if (next !== null) next.prev(prev);
        };

        // get date, get text ,get user
        $ele.appendTo($root);
        this.$ele = $ele;
        return this;


    }

    let userId = 'jaejongss';

    let eles = {};
    let lastElement = null;

    chatApi.on('child_added', function (d) {

        var id = Object.keys(d)[0];
        var data = d[id];
        var date = new Date(data.date);
        let dateString = (date.getHours() >= 12 ? '오후 ' + ((date.getHours() === 12) ? date.getHours() : date.getHours() - 12) : '오전 ' + date.getHours()) + ':' + date.getMinutes();
        data.date = dateString;
        var ele = new Element(id, userId === data.id);
        ele.setMessage(data);

        if (lastElement !== null) {
            lastElement.next(ele);
            ele.prev(lastElement);
        }
        eles[id] = ele;
        lastElement = ele;

        $(".chatting-log-box").scrollTop($(".chatting-log-box")[0].scrollHeight);
    });

    // 메세지 삭제 이벤트
    chatApi.on('child_removed', function (d) {
        var id = Object.keys(d)[0];
        var ele = eles[id];
        ele.remove();
        delete eles[id];
    });

    let $textarea = $('#messageInput');

    $textarea.on('keyup', function (event) {
        var val = $textarea.val();
        if (event.keyCode === 13) {

            $textarea.val('');
            if (val !== '') chatApi.sendMessage(userId, val);
        }
    });



})();