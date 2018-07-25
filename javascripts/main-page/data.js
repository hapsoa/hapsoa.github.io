const dataManager = new function () {
    const that = this;
    const dataArray = [];

    dataArray.push({
        title: 'Calculator',
        href: '/calculator',
        cellSize: 'small',
        imagePosition: 'img-center',
        tag: [
            'calculator',
            'number',
            'math'
        ]
    });
    dataArray.push({
        title: 'Kakaotalk',
        href: '/kakaotalk/login',
        cellSize: 'small',
        imagePosition: 'img-center',
        tag: [
            'kakaotalk',
            'chatting'
        ]
    });
    dataArray.push({
        title: 'Fractal',
        href: '/fractal',
        cellSize: 'big',
        imagePosition: 'img-center',
        tag: [
            'fractal',
            'math',
            'art'
        ]
    });
    dataArray.push({
        title: 'Text finder',
        href: '/textFinder',
        cellSize: 'small',
        imagePosition: 'img-top',
        tag: [
            'textFinder',
            'search'
        ]
    });
    dataArray.push({
        title: 'Ajou University website',
        href: '/ajou',
        cellSize: 'long',
        imagePosition: 'img-top',
        tag: [
            'ajou university',
            'website',
            'homepage'
        ]
    });
    dataArray.push({
        title: 'Firebase website',
        href: '/firebase',
        cellSize: 'small',
        imagePosition: 'img-top',
        tag: [
            'firebase',
            'website'
        ]
    });
    dataArray.push({
        title: 'Modal',
        href: '/modal',
        cellSize: 'big',
        imagePosition: 'img-center',
        tag: [
            'modal'
        ]
    });
    dataArray.push({
        title: 'Grid',
        href: '/grid-1',
        cellSize: 'small',
        imagePosition: 'img-center',
        tag: [
            'grid',
            'cell'
        ]
    });
    dataArray.push({
        title: 'Card',
        href: '/card-4',
        cellSize: 'small',
        imagePosition: 'img-center',
        tag: [
            'card design'
        ]
    });
    dataArray.push({
        title: 'Table',
        href: '/table',
        cellSize: 'big',
        imagePosition: 'img-center',
        tag: [
            'table'
        ]
    });

    const $root = $('.grid');
    // 데이터를 template으로 append
    dataArray.forEach((element) => {

        const template = `
            <div class="grid-item"> 
                <div class="cell-title">${element.title}</div>
                <a class="${element.imagePosition}" href="${element.href}">
                    <div class="curtain"></div>
                </a>
                <div class="tags">
                    <div class="empty-flex"></div>
                </div>
            </div>
            `;

        const $template = $(template);

        switch (element.cellSize){
            case 'small':
                $template.addClass('small-width');
                $template.find('a').addClass('small-height');
                break;
            case 'long':
                $template.addClass('small-width');
                $template.find('a').addClass('long-height');
                break;
            case 'big':
                $template.addClass('big-width');
                $template.find('a').addClass('big-height');
                break;
            default:
                console.log('size error!');
                break;
        }


        for (let i = 0; i < element.tag.length; i++) {
            const tagTemplate = `<div class="tag">#${element.tag[i]}</div>`;
            $template.find('.tags').append(tagTemplate);
        }

        $root.append($template);
    });


    const $searchButton = $('button.btn.btn-outline-success.my-2.my-sm-0');
    const $searchInput = $('input.form-control.mr-sm-2');

    $searchButton.on('click', () => {
        that.doSearch()
    });

    $searchInput.on('keyup', (event) => {
        if(event.keyCode === 13)
            that.doSearch();
    });

    this.doSearch = () => {
        // $root.find('.grid-item').remove();
        $root.masonry('remove', $root.find('.grid-item'))
            .masonry();


        // loop를 돌면서 모든 tag들을 검사한다.
        dataArray.forEach((element) => {

            let isIncluded = false;

            for (let i = 0; i < element.tag.length; i++) {
                if (element.tag[i].includes($searchInput.val())) {
                    // 이 조건에 충족하는 cell만 나타나도록 한다.
                    isIncluded = true;
                }
            }

            if (isIncluded) {
                const template = `
            <div class="grid-item"> 
                <div class="cell-title">${element.title}</div>
                <a class="${element.imagePosition}" href="${element.href}">
                    <div class="curtain"></div>
                </a>
                <div class="tags">
                    <div class="empty-flex"></div>
                </div>
            </div>
            `;

                const $template = $(template);

                switch (element.cellSize){
                    case 'small':
                        $template.addClass('small-width');
                        $template.find('a').addClass('small-height');
                        break;
                    case 'long':
                        $template.addClass('small-width');
                        $template.find('a').addClass('long-height');
                        break;
                    case 'big':
                        $template.addClass('big-width');
                        $template.find('a').addClass('big-height');
                        break;
                    default:
                        console.log('size error!');
                        break;
                }


                for (let i = 0; i < element.tag.length; i++) {
                    const tagTemplate = `<div class="tag">#${element.tag[i]}</div>`;
                    $template.find('.tags').append(tagTemplate);
                }

                $root.append($template)
                    .masonry('appended', $template);

            }
        });

        const $tags = $('.tag');

        $tags.on('click', (event) => {
            console.log('event!');
            // console.dir(event);
            const $this = $(event.target);

            const seedString = $this.text().substr(1);

            $searchInput.val(seedString);

            this.doSearch();

        });

        // $('body').css('scrollTop', 0);

        $('html, body').animate( {scrollTop: 0}, 400);

    };

    const $tags = $('.tag');

    $tags.on('click', (event) => {
        console.log('event!');
        // console.dir(event);
        const $this = $(event.target);

        const seedString = $this.text().substr(1);

        $searchInput.val(seedString);

        this.doSearch();

    });

    console.log('hi');
};


