class VNode {
    constructor (tag, data, children, text, element) {
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
        this.element = element;
    }
}

VNode.createEmptyVNode = () => {
    const node = new VNode();
    node.text = '';
    return node;
};

VNode.createTextVNode = (val) => new VNode(undefined, undefined, undefined, String(val));

VNode.cloneVNode = (node) => new VNode(
    node.tag,
    node.data,
    node.children,
    node.text,
    node.element,
);

modules.exports = VNode;
