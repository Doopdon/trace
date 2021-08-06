function homePageSimple(){

    let boxStyle = {
        background:'red',
        width:'100%',
        height:'100%',
    }

    let beamStyle = {
        background:'blue',
        width:'100%',
        height:'100%',
    }

    let polStyle = {
        background:'green',
        width:'100%',
        height:'100%',
    }

    let rowStyle = {
        width:'100%',
        height:'100%',
        background:'grey',
        display:'flex',
    }

    let colStyle = {
        width:'100%',
        height:'100%',
        background:'grey',
        display:'flex',
        flexDirection:'column'
    }

    let rowCellStyle = {
        width:'50%',
        height:'100%',
        padding:'5%',
        border:'1px solid black'
    }

    let colCellStyle = {
        width:'100%',
        height:'50%',
        padding:'5%',
        border:'1px solid black'
    }


    let row = (child1,child2) => div({style:rowStyle},[
        div({style:rowCellStyle},[child1]),
        div({style:rowCellStyle},[child2]),
    ])
    let col = (child1,child2) => div({style:colStyle},[
        div({style:colCellStyle},[child1]),
        div({style:colCellStyle},[child2]),
    ])

    let box = ()=>div({style:boxStyle},[])
    let beam = ()=>div({style:beamStyle},[])
    let pol = ()=>div({style:polStyle},[])

    return displayBox({},[
        div({style:{width:'300px',height:'150px'}},[boxes()])
    ])

    function boxes(){
        return row(
            box(),
            col(
                row(
                    box(),
                    row(
                        pol(),
                        col(box(),box())
                    ), 
                ),
                beam()
            )
        )
    }
}