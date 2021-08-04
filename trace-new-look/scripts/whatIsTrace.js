function whatIsTrace(){
    return div({class:'page'},[
        moveUpSpacer(),
        displayBox({},[
            'test test'
        ])
        
    ])

    function result(){
        return displayBox({class:'code-example'},[
            div({class:'text-white'},[
                h1({class:'this-is-a-red-class'},'Here is some Trac³'),
                p('this is a paragraph'),
                button({onclick:()=>alert('hey')},'Click')
            ])
        ]);
    }

    function traceExample(){
        return displayBox({class:'accent-alt-color code-example'},
            [p('div({},['),
            p(`\u00a0h1({class:'this-is-a-blue-class'},'Here is some Trac³'),`),
            p(`\u00a0p('this is a paragraph'),`),
            p(`\u00a0button({onclick:()=>alert('hey')},'Click')`),
            p(`])`)
        ]);
    }

    function htmlExample(){
        return displayBox({class:'right accent-alt-color'},
            [p('<div>'),
            p(`\u00a0<h1 class="this-is-a-blue-class">Here is some html</h1>`),
            p(`\u00a0<p>this is a paragraph</p>`),
            p(`\u00a0<button onclick="alert('hey')">Click</button>;`),
            p(`</div>`)
        ]);
    }
}