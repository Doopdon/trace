function whatIsTrace(){
    return div({},[
        spacer(),
        displayBox({},
        [p("&lt;div&gt;"),
        p(`&nbsp;&nbsp;&lt;h1 class="this-is-a-class"&gt;Here is some html&lt;/h1&gt;`),
        p(`&nbsp;&nbsp;&lt;p&gt;this is a paragraph&lt;/p&gt;`),
        p(`&nbsp;&nbsp;&lt;button onclick="alert('hey')"&gt;Click&lt;/button&gt;`),
        p(`&lt;/div&gt;`)]),
        spacer(),
        displayBox({},
        [p('div({},['),
        p(`&nbsp;&nbsp;h1({class:'this-is-a-class'},'Here is some Trac³'),`),
        p(`&nbsp;&nbsp;p('this is a paragraph'),`),
        p(`&nbsp;&nbsp;button({onclick:()=>alert('hey')},'Click')`),
        p(`])`)]),
        spacer(),
       
        displayBox({class:'right'},[
        h2('This is the result:'),
        div({class:'text-white'},[
            h1({class:'this-is-a-class'},'Here is some Trac³'),
            p('this is a paragraph'),
            button({onclick:()=>alert('hey')},'Click')
        ])])


    ])
}

//&lt; < &gt; > &nbsp; " "