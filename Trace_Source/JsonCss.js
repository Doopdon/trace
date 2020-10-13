class CssBlock{
    constructor(selector,content){
        this.selector = selector;
        this.content = content;
    }
    toElementWrapper(){
        return style(this.toString());
    }
    toString(){
        if(!this.selector) return '';
        var css = `${this.selector}{\r\n`
        Object.keys(this.content).forEach(key=>{
            css += (`${key}:${this.content[key]};\r\n`)
        })
        css +='}\r\n';
        return css;
    }
}

class CssSheet{
    constructor(blocks){
        this.blocks = blocks
    }
    toElementWrapper(){
        return style(this.toString());
    }
    toString(){
        let css ='';
        this.blocks.forEach(block=>{
            css+=block.toString();
        })
        return css;
    }
}