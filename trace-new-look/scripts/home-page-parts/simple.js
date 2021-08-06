function homePageSimple(){

    let boxStyle = {
        background:'red',
        width:'90%',
        height:'90%',
        margin:'5%'
    }

    let beamStyle = {
        background:'blue',
        width:'95%',
        height:'90%',
        margin:'2.5%'
    }

    let polStyle = {
        background:'green',
        width:'90%',
        height:'95%',
        margin:'2.5%'
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
        border:'1px solid purple'
    }

    let colCellStyle = {
        width:'100%',
        height:'50%',
        border:'1px solid purple'
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