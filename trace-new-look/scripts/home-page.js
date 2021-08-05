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
            div({class:'size-part'},[
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
        displayBox({},
            [
             h3('There are no providers, injectables, node_modules, transpilers or other complications'),
             h3(['It\'s pure ', b('simple'), ' browser readable javascript.'])
            ]
        ),
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
