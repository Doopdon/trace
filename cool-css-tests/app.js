traceInit(window);

div({id:'main-div'},[
    div({id:'top-bar',class:'vaporwave-box'},[
        'top'
    ]),
    div({id:'side-bar',class:'vaporwave-box'},[
        'side'
    ]),
    div({id:'main-content'},[
        div({class:'info-box blue-tron'},[
            'test test'
        ]),
        // div({class:'info-box yellow-scheme 2'},[
        //     'test test'
        // ])
    ])
]).render('root')