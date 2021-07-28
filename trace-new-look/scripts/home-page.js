function homePage(){
    return div({class:'home-page'},[
        moveUpSpacer(),
        displayBox({},
            [h2('Trac³:'),
             h3(['Feather light, but powerful and flexible.']),
             h3('Simple to install, use and expand'),
        ]),
        spacer(),
        spacer(),
        spacer(),
        displayBox({},
            [h2('Simple:'),
             h3('There is no worse tool than the one you don\'t know how to use'),
             h3(['Trace³ gives you just what you need, and nothing more']),
             h3(['You can install it and work with it in less than 5 minutes.']),
             h3(['You can fully understand it in an afternoon']),
            ]
        ),
        spacer(),
        spacer(),
        displayBox({},[
             h3('Trac³ has no structure, no best practice, no "right way".'),
             h3('You may find this terrifying or liberating.'),
             h3('But the truth is, there never was a "right way".')
            ]
        ),
        spacer(),
        spacer(),
        displayBox({},[
            h3('Trac³ can generate a hundred thousand elements less than a second'),
            h3('You can change and update thousands of them at once with minimal performance drops'),
            h3('What it lacks in complexity it makes up for in efficiency'),
        ]),
        spacer(),
        spacer(),
        displayBox({},
            [h2('Light Weight:'),
             h3('This entire site is unminified, it contains the unminified Trac³ source code.'),
             h3('It\'s less than 100kb.')
            ]
        ),
        spacer(),
        spacer(),
    ])
}
