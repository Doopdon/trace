function backgroundImage(imgUrl,content,options){
    options = options ||{};
    return div({class:'background-img'},[     
        div({class:'img-container'},[]),
        p({class:'content-container'},content),      
        new CssSheet([
            new CssBlock('.background-img',{
                width:'100vw',
                height:'100vh',
                position:'relative',
            }),
            new CssBlock('.background-img .img-container',{
                position: 'absolute',
                left: 0,
                top: 0,
                filter: `blur(${options.blur || '0px'})`,
                'background-image': `url('${imgUrl}')`,
                'background-repeat':'no-repeat',
                'background-size':'cover',
                width:'100%',
                 height:'100%',
                 'z-index':-1
            }),
            new CssBlock('.background-img .content',{
                position: 'absolute',
                left: 0,
                top: 0,     
            }),
        ]).toElementWrapper()
    ])
}