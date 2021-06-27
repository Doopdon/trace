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
        "Copy right: nothing. Take It! It's free!"
    ])
}

function menuComp(){
    return div({class:'burger-menu'},[
        div({class:'bar'},[]),
        div({class:'bar'},[]),
        div({class:'bar'},[]),
    ])
}

function titleComp(){
    return div({class:'title',onclick:()=>__router.pageController.val = homePageComp},[
        'Trac³'
    ])
}