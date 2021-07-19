function whatIsTrace(){
    return div({},[
        style('.this-is-a-red-class{color:red}'),
        smallSpacer(),
        h2({class:'accent-alt-color'},'Trace is just javascript, that looks like html'),
        spacer(),
        
        smallSpacer(),
        displayBox([
            h3({class:'accent-color'},'Here we have some good old fashioned html:'),
            smallSpacer(),
            htmlExample(),
            smallSpacer(),
            p('It is simply has a div with some elements inside. The div has an <h1> with a class "this-is-a-red-class", a <p> and a <button> that when clicked simply alerts "hey"'),
        ]),
        spacer(),
        
        smallSpacer(),
        displayBox({},[
            h3({class:'accent-color'},'Here we have some Trac³:'),
            smallSpacer(),
            traceExample(),
            smallSpacer(),
            p('Trace is just javascript, through and through what you are looking at is div() function with an array as a parameter.'),
            p('The array has a h1() function with the first parameter being an object with a key of "class" and a value of "this-is-a-red-class".'),
            p('It then has a p() function with no additional parameters just text.'),
            p('It then has a button function with an object with a key of "onclick" and a value of a function that alerts "hey", it also has the text "Click"'),
        ]),
        spacer(),
        displayBox({class:'right'},[
            h3({class:'accent-color'},'This is the result from running the trace code:'),
            smallSpacer(),
            result(),
            smallSpacer(),
            p('The h1() returns an "sudo element", along with the p() and the button().'),
            p('These elements are stored in the array, that is passed to the div() function.'),
            p('The div function creates its own element and uses the array of elements as its children.'),
            p('this is then added to the element function above it and so on until it reaches the root element')
        ]),
        spacer(),
        h3(['If you want to learn more you can look into ', 
            a({href:window.location.href.split('?')[0]+'?learnTrace'},
            'learning trace'),' Have fun!'
        ])
        
    ])

    function result(){
        return displayBox({class:'right'},[
            div({class:'text-white'},[
                h1({class:'this-is-a-red-class'},'Here is some Trac³'),
                p('this is a paragraph'),
                button({onclick:()=>alert('hey')},'Click')
            ])
        ]);
    }

    function traceExample(){
        return displayBox({class:'right accent-alt-color'},
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