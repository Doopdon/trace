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
        var items = {
            'Home':homePageComp,
            'Installing':installingTrace,
            'Learning':learnTrace,
            'RenderProps':renderProps,
            'What is it':whatIsTrace,
            'What Can it Do':whatTraceCanDo,
            'Syntax':elementWrappers,
            'Components':componentsDemoComp,
        }

        return div({class:'main-menu-wrapper'},[
            div({class:'main-menu-content'},[
                displayBox({class:'main-menu-box'},[
                    keyVal(items).filter(x=>__router.val.name != x.val.name)
                    .map(x=>buttonComp(x.key,()=>__router.val = x.val))
                ])
            ])
        ])
    }
}

function titleComp(){
    return div({class:'title',onclick:()=>__router.val = homePageComp},[
        'Trac³'
    ])
}