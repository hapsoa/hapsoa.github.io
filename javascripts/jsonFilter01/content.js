(function () {

    const studentInfo = [
        {
            gender: '남',
            children: [
                {
                    undergrad: '2010',
                    children: [
                        {
                            age: '25',
                            children: [
                                {
                                    name: '허재종'
                                }
                            ]
                        }
                    ]
                },
                {
                    undergrad: '2014',
                    children: [
                        {
                            age: '24',
                            children: [
                                {
                                    name: '홍준엽'
                                },
                                {
                                    name: '공현식'
                                }
                            ]

                        }
                    ]
                }

            ]
        },
        {
            gender: '여',
            children: [
                {
                    undergrad: '2016',
                    children: [
                        {
                            age: '22',
                            children: [
                                {
                                    name: '이수정'
                                }
                            ]
                        },
                        {
                            age: '21',
                            children: [
                                {
                                    name: '홍주원'
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];


    const $button = $('.button');
    const $names = $('.names-box');

    const filters = ['성별(ALL)', '학번(ALL)', '나이(ALL)'];

    // $('select').on('change', function () {
    //
    //     const $this = $(this);
    //     const $selectedOption = $this.find('option:selected');
    //
    //     const currentFilter = $selectedOption.text();
    //
    //     const index = $this.attr('index') * 1;
    //
    //     filters[index] = currentFilter;
    //     console.log(filters);


    //     const filterItems = function(filters, studentInfo) {
    //
    //         // 분류에 따라서 json을 변경
    //
    //         const modifiedData = [];
    //
    //         if (filters[0] !== '성별(ALL)' &&
    //             filters[1] !== '학번(ALL)' &&
    //             filters[2] !== '나이(ALL)') {
    //
    //             for (let i = 0; i < studentInfo.length; i++) {
    //                 if (filters[0] === studentInfo[i].gender) {
    //
    //                     for (let j = 0; j < studentInfo[i].children.length; j++) {
    //                         if (filters[1] ===
    //                             studentInfo[i].children[j].undergrad) {
    //
    //                             for (let k = 0; k < studentInfo[i].children[j].children.length; k++) {
    //                                 if (filters[2] ===
    //                                     studentInfo[i].children[j].children[k].age) {
    //
    //                                     for (let l = 0; l < studentInfo[i].children[j].children[k].children.length; l++) {
    //                                         modifiedData.push(studentInfo[i].children[j].children[k].children[l]);
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //
    //
    //             for (let i = 0; i < modifiedData.length; i++)
    //                 $names.text(modifiedData[i].name);
    //         }
    //
    //
    //         if (filters[0] === '성별(ALL)' &&
    //             filters[1] !== '학번(ALL)' &&
    //             filters[2] !== '나이(ALL)') {
    //
    //             for (let prop in studentInfo) {
    //
    //                 for ()
    //                 prop.children
    //
    //
    //             }
    //
    //         }
    //
    //
    //     };
    //
    //     filterItems(filters, studentInfo);
    //
    // });


    $('select').on('change', function () {

        const $this = $(this);
        const $selectedOption = $this.find('option:selected');

        const currentFilter = $selectedOption.text();

        const index = $this.attr('index') * 1;

        filters[index] = currentFilter;
        console.log(filters);

        if (filters[0] !== '성별(ALL)' &&
            filters[1] !== '학번(ALL)' &&
            filters[2] !== '나이(ALL)') {

            const names = function () {
                let namesString = '';

                console.log(filters[0]);

                for (let i = 0; i < studentInfo.length; i++) {
                    if (filters[0] === studentInfo[i].gender) {

                        for (let j = 0; j < studentInfo[i].children.length; j++) {
                            if (filters[1] ===
                                studentInfo[i].children[j].undergrad) {

                                for (let k = 0; k < studentInfo[i].children[j].children.length; k++) {
                                    if (filters[2] ===
                                        studentInfo[i].children[j].children[k].age) {

                                        for (let l = 0; l < studentInfo[i].children[j].children[k].children.length; l++) {
                                            namesString += studentInfo[i].children[j].children[k].children[l].name + ' ';
                                        }

                                    }
                                }

                            }
                        }

                    }
                }


                return namesString;
            };

            $names.text(names);

        }


        if (filters[0] === '성별(ALL)' &&
            filters[1] !== '학번(ALL)' &&
            filters[2] !== '나이(ALL)') {

            const names = function () {
                let namesString = '';

                for (let i = 0; i < studentInfo.length; i++) {
                    if (filters[0] !== studentInfo[i].gender) {

                        for (let j = 0; j < studentInfo[i].children.length; j++) {
                            if (filters[1] ===
                                studentInfo[i].children[j].undergrad) {

                                for (let k = 0; k < studentInfo[i].children[j].children.length; k++) {
                                    if (filters[2] ===
                                        studentInfo[i].children[j].children[k].age) {

                                        for (let l = 0; l < studentInfo[i].children[j].children[k].children.length; l++) {
                                            namesString += studentInfo[i].children[j].children[k].children[l].name + ' ';
                                        }

                                    }
                                }

                            }
                        }

                    }
                }


                return namesString;
            };

            $names.text(names);

        }


        if (filters[0] !== '성별(ALL)' &&
            filters[1] === '학번(ALL)' &&
            filters[2] !== '나이(ALL)') {

            const names = function () {
                let namesString = '';


                for (let i = 0; i < studentInfo.length; i++) {
                    if (filters[0] === studentInfo[i].gender) {

                        for (let j = 0; j < studentInfo[i].children.length; j++) {
                            if (filters[1] !==
                                studentInfo[i].children[j].undergrad) {

                                for (let k = 0; k < studentInfo[i].children[j].children.length; k++) {
                                    if (filters[2] ===
                                        studentInfo[i].children[j].children[k].age) {

                                        for (let l = 0; l < studentInfo[i].children[j].children[k].children.length; l++) {
                                            namesString += studentInfo[i].children[j].children[k].children[l].name + ' ';
                                        }

                                    }
                                }

                            }
                        }

                    }
                }


                return namesString;
            };

            $names.text(names);

        }

        if (filters[0] !== '성별(ALL)' &&
            filters[1] !== '학번(ALL)' &&
            filters[2] === '나이(ALL)') {

            const names = function () {
                let namesString = '';


                for (let i = 0; i < studentInfo.length; i++) {
                    if (filters[0] === studentInfo[i].gender) {

                        for (let j = 0; j < studentInfo[i].children.length; j++) {
                            if (filters[1] ===
                                studentInfo[i].children[j].undergrad) {

                                for (let k = 0; k < studentInfo[i].children[j].children.length; k++) {
                                    if (filters[2] !==
                                        studentInfo[i].children[j].children[k].age) {

                                        for (let l = 0; l < studentInfo[i].children[j].children[k].children.length; l++) {
                                            namesString += studentInfo[i].children[j].children[k].children[l].name + ' ';
                                        }

                                    }
                                }

                            }
                        }

                    }
                }


                return namesString;
            };

            $names.text(names);

        }


        if (filters[0] === '성별(ALL)' &&
            filters[1] === '학번(ALL)' &&
            filters[2] !== '나이(ALL)') {

            const names = function () {
                let namesString = '';


                for (let i = 0; i < studentInfo.length; i++) {
                    if (filters[0] !== studentInfo[i].gender) {

                        for (let j = 0; j < studentInfo[i].children.length; j++) {
                            if (filters[1] !==
                                studentInfo[i].children[j].undergrad) {

                                for (let k = 0; k < studentInfo[i].children[j].children.length; k++) {
                                    if (filters[2] ===
                                        studentInfo[i].children[j].children[k].age) {

                                        for (let l = 0; l < studentInfo[i].children[j].children[k].children.length; l++) {
                                            namesString += studentInfo[i].children[j].children[k].children[l].name + ' ';
                                        }

                                    }
                                }

                            }
                        }

                    }
                }


                return namesString;
            };

            $names.text(names);

        }


        if (filters[0] === '성별(ALL)' &&
            filters[1] !== '학번(ALL)' &&
            filters[2] === '나이(ALL)') {

            const names = function () {
                let namesString = '';


                for (let i = 0; i < studentInfo.length; i++) {
                    if (filters[0] !== studentInfo[i].gender) {

                        for (let j = 0; j < studentInfo[i].children.length; j++) {
                            if (filters[1] ===
                                studentInfo[i].children[j].undergrad) {

                                for (let k = 0; k < studentInfo[i].children[j].children.length; k++) {
                                    if (filters[2] !==
                                        studentInfo[i].children[j].children[k].age) {

                                        for (let l = 0; l < studentInfo[i].children[j].children[k].children.length; l++) {
                                            namesString += studentInfo[i].children[j].children[k].children[l].name + ' ';
                                        }

                                    }
                                }

                            }
                        }

                    }
                }


                return namesString;
            };

            $names.text(names);

        }


        if (filters[0] !== '성별(ALL)' &&
            filters[1] === '학번(ALL)' &&
            filters[2] === '나이(ALL)') {

            const names = function () {
                let namesString = '';


                for (let i = 0; i < studentInfo.length; i++) {
                    if (filters[0] === studentInfo[i].gender) {

                        for (let j = 0; j < studentInfo[i].children.length; j++) {
                            if (filters[1] !==
                                studentInfo[i].children[j].undergrad) {

                                for (let k = 0; k < studentInfo[i].children[j].children.length; k++) {
                                    if (filters[2] !==
                                        studentInfo[i].children[j].children[k].age) {

                                        for (let l = 0; l < studentInfo[i].children[j].children[k].children.length; l++) {
                                            namesString += studentInfo[i].children[j].children[k].children[l].name + ' ';
                                        }

                                    }
                                }

                            }
                        }

                    }
                }


                return namesString;
            };

            $names.text(names);

        }

        if (filters[0] === '성별(ALL)' &&
            filters[1] === '학번(ALL)' &&
            filters[2] === '나이(ALL)') {

            const names = function () {
                let namesString = '';


                for (let i = 0; i < studentInfo.length; i++) {
                    if (filters[0] !== studentInfo[i].gender) {

                        for (let j = 0; j < studentInfo[i].children.length; j++) {
                            if (filters[1] !==
                                studentInfo[i].children[j].undergrad) {

                                for (let k = 0; k < studentInfo[i].children[j].children.length; k++) {
                                    if (filters[2] !==
                                        studentInfo[i].children[j].children[k].age) {

                                        for (let l = 0; l < studentInfo[i].children[j].children[k].children.length; l++) {
                                            namesString += studentInfo[i].children[j].children[k].children[l].name + ' ';
                                        }

                                    }
                                }

                            }
                        }

                    }
                }


                return namesString;
            };

            $names.text(names);

        }


    });


})();

// console.log($('#gender option:selected').val());


