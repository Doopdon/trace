function headerComponent(){
    return div({class:'header-wrapper'},[
        // link({rel:'icon',type:'image/png',href:'./content/favicon.ico'},[]),
        div({class:'menu-item left'},[
            titleComp()
        ]),
        div({class:'menu-item right'},[
            menuComp()
        ]),
    ])
}

function footerComp(){
    return div({class:'footer'},[
        "Copyright: nothing. Take It! It's free!"
    ])
}

function menuComp(){
    let open = new RenderProp(false);

    return div({class:'menu-root',onclick:()=>open.val = !open.val},[
        open.display(x=>x?openState():closedState())
    ])

    function openState(){
        return div([
            div({class:'x-menu menu-btn', },[
                div({class:'x-part x-1 bar'},[]),
                div({class:'x-part x-2 bar'},[]),
            ]),
            menu()
        ])
    }

    function closedState(){
        return div({class:'burger-menu menu-btn', },[
            div({class:'bar'},[]),
            div({class:'bar'},[]),
            div({class:'bar'},[]),
        ]);
    }

    function menu(){
        var items = [
            ['Home',homePage],
            ['What is Trace',whatIsTrace],
            ['Installing',installingTrace],
            ['Learning',learnTrace],
            ['Syntax',elementWrappers],
            ['Components',componentsDemoComp],
            ['RenderProps',renderProps],
            ['THE POWER',whatTraceCanDo],
        ]

        return div({class:'main-menu-wrapper'},[
            div({class:'main-menu-content'},[
                displayBox({class:'main-menu-box'},[
                    items.filter(x=>__router.val.name != x[1].name)
                    .map(x=>buttonComp(x[0],()=>__router.val = x[1]))
                ])
            ])
        ])
    }
}

function titleComp(){
    return div({class:'title',onclick:()=>__router.val = homePage},[
        'Trac³'
    ])
}