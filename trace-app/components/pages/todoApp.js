function todoApp() {
    // Create a RenderList to manage our todo items
    // Each todo will be an object with text and completed properties
    let todos = new RenderList([
        { text: new RenderProp('Buy groceries'), completed: new RenderProp(false) },
        { text: new RenderProp('Walk the dog'), completed: new RenderProp(false) },
        { text: new RenderProp('Finish Trace documentation'), completed: new RenderProp(false) }
    ]);

    // Function to add a new todo
    function addTodo() {
        todos.push({
            text: new RenderProp('New todo'),
            completed: new RenderProp(false)
        });
    }

    return div({ class: 'todo-app' }, [
        spacer(),
        displayBox({ class: 'todo-container' }, [
            h3('Todo App With Trace'),
            p('A simple in-memory todo app demonstrating RenderList'),
            
            // Display the todo list
            todos.display((todo, renderItem) => {
               // console.log(renderItem.val.completed)
                return div({ class: 'todo-item' + (todo.completed.val ? ' completed' : '') }, [
                    // Checkbox to mark as complete
                    checkbox(todo.completed),
                    editField(todo.text, { class: 'inline' }),
                    // Action buttons
                    buttonComp('🗑', () => renderItem.delete()),
                    buttonComp('⬆', () => renderItem.moveTo(renderItem.index - 1)),
                    buttonComp('⬇', () => renderItem.moveTo(renderItem.index + 1))
                ]);
            }),
            
            // Add new todo button
            buttonComp('Add Todo', addTodo)
        ]),
        spacer()
    ]);
}