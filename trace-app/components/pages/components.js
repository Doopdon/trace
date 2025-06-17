function componentsDemoComp(){
    let t = new RenderProp(false)

    return div({},[
        div({},[
            button({onclick:()=>{alert('hey')}},'hey'),
            checkbox(t),
            t.display(x=>h1(x))
        ]),
        div({},[
            h1('h1'),
            h2('h2'),
            h3('h3'),
        ]),
        table({},[
            tr([
                td('thing'),
                td('stuff'),
                td([testComponent()])
            ]),
            tr([
                td('thing'),
                td('stuff'),
                td([testComponent()])
            ])
        ]),
        div({},[
           img({src:'../view.avif'},[])
        ])

    ])

    function testComponent(){
        return div('test comp')
    }
}