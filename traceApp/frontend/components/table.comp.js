import rowComp from './row.comp.js'

function tableComp(listToRender){//here is a table comp, it takes a render list. it can take whatever the hell you want
    return table([
        tr([
            th('name'),
            th('quantity'),
            th('num-updates'),
            th(),
            th(),
        ]),
        listToRender.display((x,u)=>rowComp(x,u))
    ])
}

export default tableComp;