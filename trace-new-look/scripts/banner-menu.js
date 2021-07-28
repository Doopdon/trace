function banner(){
    return div({class:'banner'},[
        h1({class:'banner-option',onclick:()=>__router.val = homePage},'TRAC³'),
        div({class:'banner-options'}, menuItems())
    ]);

    function menuItems() {
        let menuOptions = [
            ['ABOUT', null],
            
            ['HOW TO', [
                ['Installing', null],
                ['Syntax', null],
                ['Components', null],
                ['RenderProps', null],
            ]],
            ['DEMO', null]
        ]

        return menuOptions.map(x=>{
            return div({class:'banner-option'},x[0]);
        })
    }
}