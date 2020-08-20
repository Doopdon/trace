const tripleColumnComp = (left,center,right,params)=>{
    return layoutBase(params,
        div({class:'tripleColumn-layout'},[
            div({class:'parent white'},[
                div({class:'box green'},left),
                div({class:'box green'},center),
                div({class:'box green'},right),
            ])
        ])
    )
}