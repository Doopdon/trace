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

    return div({onclick:()=>open.val = !open.val},[
        open.display(x=>x?openState():closedState())
    ])

    function openState(){
        return div([
            div({class:'x-menu', },[
                div({class:'x-part x-1 bar'},[]),
                div({class:'x-part x-2 bar'},[]),
            ]),
            menu()
        ])
    }

    function closedState(){
        return div({class:'burger-menu', },[
            div({class:'bar'},[]),
            div({class:'bar'},[]),
            div({class:'bar'},[]),
        ]);
    }

    function menu(){
        var items = [{
            name:'Home',
            funct:homePageComp
        },
        {
            name:'Installing',
            funct:installingTrace
        },
        {
            name:'Learning',
            funct:learnTrace
        },
        {
            name:'RenderProps',
            funct:renderProps
        },
        {
            name:'What is it',
            funct:whatIsTrace
        },
        {
            name:'What Can it Do',
            funct:whatTraceCanDo
        }]

        return div({class:'main-menu-wrapper'},[
            div({class:'main-menu-content'},[
                displayBox({class:'main-menu-box'},[
                    items.map(x=>buttonComp(x.name,()=>__router.pageController.val = x.funct))
                ])
            ])
        ])
    }
}

function titleComp(){
    return div({class:'title',onclick:()=>__router.pageController.val = homePageComp},[
        'Trac³'
    ])
}