function banner() {
    return div({ class: 'banner' }, [
        h1({ class: 'banner-option', onclick: () => __router.val = homePage }, 'TRAC³'),
        div({ class: 'banner-options' }, menuItems())
    ]);

    function menuItems() {
        let menuOptions = [
            ['ABOUT', whatIsTrace, [
                ['What is Trace', null],
                ['Why Trace', null],
                ['About Trace', null]
            ]],

            ['HOW TO', null, [
                ['Installing', null],
                ['Syntax', null],
                ['Components', null],
                ['RenderProps', whatIsTrace],
            ]],
            ['DEMO', null]
        ]

        return menuOptions.map(x => {
            let [name, page, subOptions] = x
            console.log(subOptions)
            return div({
                class: 'banner-option',
                onclick: () => page && (__router.val = page)
            }, [name, subOptions &&
                div({ class: 'sub-option-wrapper' },
                    displayBox({ class: 'sub-options' },
                        subOptions?.map(x => {
                            let [name, page] = x;
                            return div({
                                class: 'sub-option',
                                onclick: () => page && (__router.val = page)
                            }, name)
                        })
                    )
                )
            ]);
        })
    }
}