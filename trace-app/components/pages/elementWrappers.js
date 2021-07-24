function elementWrappers(){
    return div([
        spacer(),
        wrapperBox(),
        spacer(),
        listWrapperBox(),
    ])

    function wrapperBox(){
        return displayBox({},[
            p('This is how the wrapper/elements are structured:'),
            p('each wrapper has a reference to an element and other wrappers'),
            wrapperExplanation(),
            p('This exactly mirrors what the elements do on the DOM'),
            elementExplanation()
        ])
    }

    function listWrapperBox(){
        return displayBox({},[
            p('There is one exception:'),
            p(['When it comes to lists of element wrappers defined in a "RenderList".',
            ' A wrapper is created only holds other wrappers.',
            ' A RenderList may have 0 to many values in it, and therefore 0 to many wrappers',
            'In order for the RenderList to properly insert elements in a list it needs to know where that list goes on the DOM.',
            'With 0 elements referenced there is no way to know where insert them.',
            'Unless we use a ElementWrapperList which exists independently of the number of elements inside'
            ]),
            listWrapperExplanation(),
        ])
    }

    function wrapperExplanation(){
        return div({class:'wrapper-exp'},[
            wrapperExp([
                wrapperExp([],'blue-wrapper'),
                wrapperExp([],'blue-wrapper'),
                wrapperExp([
                    wrapperExp([],'green-wrapper'),
                ],'blue-wrapper'),
                wrapperExp([],'blue-wrapper'),
            ],'red-wrapper')
        ]);
    }

    function listWrapperExplanation(){
        return div({class:'wrapper-exp'},[
            wrapperExp([
                wrapperExp([],'red-wrapper'),
                listWrapperExp([
                    wrapperExp([],'blue-wrapper'),
                    wrapperExp([],'blue-wrapper'),
                    wrapperExp([],'blue-wrapper'),
                    wrapperExp([],'blue-wrapper'),
                ],'green-wrapper'),
                wrapperExp([],'red-wrapper'),
            ],'blue-wrapper')
        ]);
    }

    function elementExplanation(){
        return div({class:'wrapper-exp'},[
            elementExp([
                elementExp([],'blue-wrapper'),
                elementExp([],'blue-wrapper'),
                elementExp([
                    elementExp([],'green-wrapper'),
                ],'blue-wrapper'),
                elementExp([],'blue-wrapper'),
            ],'red-wrapper')
        ]);
    }

    function elementExp(inner,className){
        return [ 
            div({class:className+' wrapper'},[
                div({class:'element'},'Element'),
                inner,   
            ]),
        ];
    }

    function wrapperExp(inner,className){
        return [ 
            div({class:className+' wrapper'},[
                'Wrapper',
                div({class:'element'},'Element'),
                inner,   
            ]),
        ];
    }

    function listWrapperExp(inner,className){
        return [ 
            div({class:className+' wrapper'},[
                'List-Wrapper',
                inner,   
            ]),
        ];
    }
}



