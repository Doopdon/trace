function bannerMenuComp() {
    let menuOptions = [
        ['HOME', null],
        ['ABOUT TRAC³', null],
        
        ['LEARNING', [
            ['Installing', null],
            ['Syntax', null],
            ['Components', null],
            ['RenderProps', null],
        ]],
        ['PERFORMANCE DEMO', null]
    ]

    return menuOptions.map(x=>{
        return div({class:'banner-option'},x[0]);
    })
}