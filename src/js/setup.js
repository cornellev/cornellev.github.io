function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

window.addEventListener('load', function () {
    let body = document.body;

    let container = document.createElement('div');
    container.id = 'container';
    body.appendChild(container);

    let header = document.getElementsByTagName('header')[0] || (() => {
        let header = document.createElement('header');
        container.appendChild(header);
        return header;
    })()

    let content = document.createElement('div');
    content.id = 'content';
    container.appendChild(content);

    let footer = document.getElementsByTagName('footer')[0] || (() => {
        let footer = document.createElement('footer');
        container.appendChild(footer);
        return footer;
    })();

    let currentYear = (new Date()).getFullYear();
    let copyright = document.createElement('p');
    copyright.id = 'copyright';
    copyright.textContent = `Copyright (C) ${currentYear} CEV Autonomy. All rights reserved.`;
    footer.appendChild(copyright);

    let page = {
        content: content
    };
    Page(page);
    document.title = page.title || "cornellev.github.io";

}, false)
