function homePage(){
    return div({class:'home-page page'},[
        moveUpSpacer(),
        displayBox({},
            [h2('Trac³:'),
             h3(['Feather light, but powerful and flexible.']),
             h3('Simple to install, use and expand'),
        ]),
        spacer(),
        spacer(),
        spacer(),
        displayBox([
            div({class:'size-section'},[
                div([
                    h3('Trace fits on this qr code:'),
                    p('Lightweight is an understatement.'),
                ]),
                div([
                    img({class:'qr-code',src:'./content/qr-code.png'},[])
                ])
            ]),
        ]),
        spacer(),
        spacer(),
        // displayBox([
        //     div({class:'simplicity-section',
        //         },[
        //         div([
        //             h3('There are no providers, injectables, node_modules, transpilers or other complications'),
        //             p(['It\'s pure ', b('simple'), ' browser readable javascript.']),
        //         ]),
        //         div({style:{
        //                 'background-image': 'url(./content/simple.jpeg)',
        //                 'background-size': 'cover',
        //                 'background-repeat': 'no-repeat',
        //                 'background-position': 'center',
        //                 opacity: 0.5,
        //             }},[
        //             //img({class:'qr-code',src:'./content/simple.jpeg'},[])
        //         ])
        //     ])
        // ]),
        spacer(),
        spacer(),
        displayBox({},[
             h3('Trac³ has no structure, no best practice, no "right way".'),
             h3('You may find this terrifying or liberating.'),
             h3('But the truth is, there never was a "right way".'),
             h3('Trac³ gives you unmatched flexibility')
            ]
        ),
        spacer(),
        spacer(),
        displayBox({},[
            h3('Trac³ can generate a hundred thousand elements less than a second'),
            h3('This out paces React and Angular by an order of magnitude'),
            h3('It can update thousands of elements at once'),
            h3([b('it\'s powerful')]),
        ]),
        spacer(),
        spacer(),
        spacer(),
        spacer(),
        spacer(),
        spacer(),
        spacer(),
        spacer(),
    ])
}
