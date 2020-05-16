function page2(){
    trace(this);
    
    function elemS(elemType,content){
        return `<span><</span>${elemType}<span>></span>${content}<span><</span>/${elemType}<span>></span>`
    }

    return div([
        h5('Page 3:'),
        p(`there were some concessions made. I had to give up the traditional html format "${elemS('h1','hello')}".
 most render engines use a format similar to this "${elemS('h1','{aValue}')}" and then interpret the file in their own way:
 processing the html and inserting the value. I had to forgo the html syntax. But you know what is so great about the syntax?
 you need to close the tags, you need to type things twice. so while I did have to deviate from how html is traditionally displayed,
 I don't think my system is loosing too much`),
        h5('so here it is:'),
        p(`
div({property:'value', class:'red'},[
    h1('this is a child'),
    h2('this is another child'),
    h2('each is an element in an array')
])        
        `),
        p(`this is equivalent to:
<div property="value" class="red">
    <h1>this is a child</h1>
    <h1>this is another child</h1>
    <h1>each is an element in an array</h1>
</div>        
        `),
        p(`see its almost exactly the same length as the html version. the properties are stored in the object which is given
as the first parameter and the children are handed to it as an array. an array of other "trace elements"`)
    ])
}