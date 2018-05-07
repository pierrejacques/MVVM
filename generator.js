const VNode = require('./VNode.class');

function genNode (el) {
    if (el.type === 1) {
        return genElement(el);
    } else {
        return genText(el);
    }
}

function genChildren (el) {
    const children = el.children;

    if (children && children.length > 0) {
        return `${children.map(genNode).join(',')}`;
    }
}

function genElement (el) {
    if (el.if && !el.ifProcessed) {
        return genIf(el);
    } else if (el.for && !el.forProcessed) {
        return genFor(el);
    } else {
        const children = genChildren(el);
        let code;
        code = `_c('${el.tag},'{
            staticClass: ${el.attrsMap && el.attrsMap[':class']},
            class: ${el.attrsMap && el.attrsMap['class']},
        }${
            children ? `,${children}` : ''
        })`
        return code;
    }
}

function genIf (el) {
    el.ifProcessed = true;
    if (!el.ifConditions.length) {
        return `_e()`;
    }
    return `(${el.ifConditions[0].exp} ? ${genElement(el.ifConditions[0].block)} : _e()`
}

function genFor (el) {
    el.forProcessed = true;

    const exp = el.for;
    const alias = el.alias;
    const iterator1 = el.iterator1 ? `,${el.iterator1}` : '';
    const iterator2 = el.iterator2 ? `,${el.iterator2}` : '';

    return `_l(
        (${exp}), 
        function( ${alias}${iterator1}${iterator2} ) {
            return ${genElement(el)}
        }
    )`;
}

function genText (el) {
    return `_v(${el.expression})`;
}


function generate (rootAst) {
    const code = rootAst ? genElement(rootAst) : '_c("div")'
    return {
        render: `with(this){return ${code}}`,
    }
}