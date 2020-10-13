const tripleColumnComp = (left,center,right) =>
        div({class:'tripleColumn-layout'},[
            div({class:'parent'},[
                div({class:'box green'},left),
                div({class:'box green'},center),
                div({class:'box green'},right),
            ]),
            new CssSheet([
                new CssBlock('.tripleColumn-layout',{
                    
                }),
                new CssBlock('.parent',{
                    'display': 'flex',
                    'flex-wrap': 'wrap',
                    'justify-content': 'center',
                    'width': '90%',
                    'height': '90%',
                }),
                new CssBlock('',{}),
            ]).toElementWrapper()

        ])