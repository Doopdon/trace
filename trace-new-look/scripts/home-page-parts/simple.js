function homePageSimple(){

    let row = (child1,child2) => div({class:'split split-row'},[
        div({class:'cell row-cell'},[child1]),
        div({class:'cell row-cell'},[child2]),
    ])

    let col = (child1,child2) => div({class:'split split-col'},[
        div({class:'cell col-cell'},[child1]),
        div({class:'cell col-cell'},[child2]),
    ])

    let box = ()=>div({class: 'content box'},[])
    let beam = ()=>div({class: 'content beam'},[])
    let pol = ()=>div({class: 'content pol'},[])

    return displayBox({},[
        div({style:{width:'300px',height:'150px'}, class:'simple'},[boxes()])
    ])

    function boxes(){
        return row(
            box(),
            col(
                row(
                    box(),
                    row(
                        pol(),
                        col(box(),box())
                    ), 
                ),
                beam()
            )
        )
    }
}