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
        return div('BODY');
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