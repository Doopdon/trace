function homePageSimple(){
    return displayBox({},[
        boxes(),
    ])

    function boxes(){
        return div({class:'container-side'},[
            //div({class:'side'},[]),
            div({class:'box'},[]),
            div({class:'box'},[]),
            //div({class:'bottom'},[])
        ])
    }
}