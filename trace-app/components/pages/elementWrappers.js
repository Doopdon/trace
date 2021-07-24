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
            wrapperExp(['[Parent]',
                wrapperExp(['[Child]'],'blue-wrapper'),
                wrapperExp(['[Child]'],'blue-wrapper'),
                wrapperExp(['[Child]',
                    wrapperExp(['[Child\'s-Child]'],'green-wrapper'),
                ],'blue-wrapper'),
                wrapperExp(['[Child]'],'blue-wrapper'),
            ],'red-wrapper')
        ]);
    }
    
    function elementExplanation(){
        return div({class:'wrapper-exp'},[
            elementExp(['[Parent]',
                elementExp(['[Child]'],'blue-wrapper'),
                elementExp(['[Child]'],'blue-wrapper'),
                elementExp(['[Child]',
                    elementExp(['[Child\'s-Child]'],'green-wrapper'),
                ],'blue-wrapper'),
                elementExp(['[Child]'],'blue-wrapper'),
            ],'red-wrapper')
        ]);
    }
    
    function listWrapperExplanation(){
        return div({class:'wrapper-exp'},[
            wrapperExp(['[Parent]',
                wrapperExp(['[Child]'],'red-wrapper'),
                listWrapperExp(['Has 3 Children but no Element',
                    wrapperExp(['[Child]'],'blue-wrapper'),
                    wrapperExp(['[Child]'],'blue-wrapper'),
                    wrapperExp(['[Child]'],'blue-wrapper'),
                ],'green-wrapper'),
                listWrapperExp(['Has 0 children'],'green-wrapper'),
                wrapperExp([],'red-wrapper'),
            ],'blue-wrapper')
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



