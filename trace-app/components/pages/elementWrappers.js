function elementWrappers(){
    return div([
        spacer(),
        intro(),
        spacer(),
        wrapperBox(),
        spacer(),
        listWrapperBox(),
    ])

    function intro(){
        return [
            subIntro(),
        ]

        function subIntro(){
            return displayBox({},[
                h3('The basic building block of a Trace App: The "ElementWrapper"'),
                p(['Trace has 123 functions that return an ElementWrapper,',
                ' they all have the same name as the 123 HTML element types... div(), h1(), p() etc.']),
                p(['Each one of these "element functions" takes up to 2 parameters.',
                ' These are an object "{}" and what is usually an array "[]".',
                ' To call a element function can simply pass in an empty object and an empty array like so...']),
                p('div({},[])'),
                p('The {} param is the attributes, and the [] param is the content'),
                p('You may also call the function with just the content param: div([])'),
                p('But you cannot call the function with just attributes: div({})//ERROR!'),
                p(['This is because if there is 1 param it is assumed to be the content.',
                ' if there are two, the first is assumed to be the attributes and the second the content.',
                ' This may seem odd when making and img tag for example, which traditionally does not have any content...',]),
                p([' img({src:\'some url\'}, [])//seemingly unnecessary second parameter.']),
                p(['But since the first parameter is the attributes, and element functions only use attributes if there are 2 parameters.',
                'you will need two parameters.']),
                p('This does not come up often though.')
            ])
        }

        function attributes(){
            return displayBox([
                p(['The object parameter represents the',b('attributes'),' of the element like "class",',
                ' "id", or even events like "onclick". These attributes will be applied to the element that is created']),
                p(['The array parameter is more flexible it represents the ',b('content'),' of the element.',
                'This could be a simple string like "h1(\'This is an H1\')".',
                ' Notice how there is no array, or object, it is simply an element function with 1 string parameter.']),
                p(['The content parameter could also be another element function returning an ElementWrapper.',
                ' Ex: "div(h1(\'This is an H1 inside a div\'))".']),
                p(['Lastly the content parameter could be an array. This (normally) represents multiple children. Ex:']),
                p('div([//start of the array'),
                p(`\u00a0h1('child'),//first child, followed by a comma since it is the first item in an array`),
                p(`\u00a0h2('another child')`),
                p(`])//end of the array`),
            ])
        }

        function content(){
            return displayBox([])
        }
    }

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



