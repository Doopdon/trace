function buttonComp(text, clickEvent, colorClass) {
    return div({ onclick: clickEvent, class: 'tron-button ' + colorClass }, text)
}

function editField(renderProp, attributes) {
    attributes = attributes || { class: 'block' };
    let editMode = new RenderProp(false);
    return editMode.display(x => {
        if (!x) {
            return div(attributes, [
                renderProp.display(x => h2({ style: "display:inline;" }, x)),
                buttonComp('Edit', () => editMode.val = true)
            ])
        }
        else {
            let area;
            return div(attributes, [
                renderProp.display(x => area = input({ value: x }, [])),
                buttonComp('Save', () => {
                    renderProp.val = area.$element.value;
                    editMode.val = false;
                })
            ])
        }
    })
}

function checkbox(renderProp, attributes) {
    attributes = attributes || { class: 'block' };
    return renderProp.display(x => input({
        type: 'checkbox',
        checked: renderProp.atr(),
        class: 'tron-checkbox',
        onclick: () => renderProp.val = !renderProp.val
    }, []))
}

function displayBox(attributes, body) {
    if (!body) {
        body = attributes;
        attributes = {};
    }
    attributes.class = 'info-box ' + attributes.class;
    return div(attributes, [body]);
}

function spacer() {
    return div({ class: 'spacer' }, [])
}

function smallSpacer() {
    return div({ class: 'spacer-small' }, [])
}

function hidShow(title, renderFunct) {
    var show = new RenderProp(false)
    return div([
        show.display(x => !x ?
            buttonComp(title, () => show.val = true) :
            renderFunct(() => show.val = false)
        )
    ])

}

function innerLinkComp(functionName, text) {
    functionName = functionName.name || functionName;
    return a({ href: `${window.location.href.split('?')[0]}?${functionName}` }, text);
}