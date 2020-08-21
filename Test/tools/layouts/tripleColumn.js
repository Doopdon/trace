const tripleColumnComp = (left,center,right) =>
        div({class:'tripleColumn-layout'},[
            div({class:'parent'},[
                div({class:'box green'},left),
                div({class:'box green'},center),
                div({class:'box green'},right),
            ]),
            new CssBlock('.parent',{'background-color':'transparent'}).toElementWrapper(),
            new CssBlock('.tripleColumn-layout',{'background-color':'transparent',}).toElementWrapper(),
        ])