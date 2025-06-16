function componentsDemoComp(){
    return div({},[
        div({},[
            button({onclick:()=>{alert('hey')}},'hey')
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