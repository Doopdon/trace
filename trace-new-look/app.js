traceInit(window);
(()=>{
    div({class:'_app'},[
        div([
            forGround([
            banner(),
            homePage(),
            ]),
            background(),
        ]),
    ]).render('root')

    function banner(){
        return div({class:'banner'},[
            h1('TRAC³'),
            div({class:'banner-options'}, bannerMenuComp())
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
})()