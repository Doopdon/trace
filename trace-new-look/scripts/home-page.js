function homePage(){
    return div([
       forGround([
        banner(),
        body(),
       ]),
       background(),
    ]);


    function banner(){
        return div({class:'banner'},[
            h1('TRAC³'),
            div({class:'banner-options'}, bannerMenuComp())
        ]);
    }

    function body(){
        return div([
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            displayBox('This is some text'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
            p('test'),
        ]);
    }

    function forGround(inner){
        return div({class:'for-ground-container'},[
            inner
        ])
    }

    function background(){
        return div({class:'background-container'},[
            div({class:'space-scene'},[
                div({class:'planet'},[])
            ])
        ])
    }
}