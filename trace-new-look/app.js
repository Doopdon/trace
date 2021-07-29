traceInit(window);
routerInit(window);

let __router = new Trac3Router(homePage,window);

(()=>{
    div({class:'_app'},[
        div([
            forGround([
            banner(),
            __router.display(x=>x())
            ]),
            background(),
        ]),
    ]).render('root')

 

    function forGround(inner){
        return div({class:'for-ground-container'},[inner])
    }

    function background(){
        return div({class:'background-container'},[
            div({class:'inner'},[
                div({class:'space-scene'},[
                    div({class:'planet'},[])
                ])
            ])
        ])
    }
})()