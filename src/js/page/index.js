function Page(page) {
    page.title = 'CEV Autonomy';
    let content = page.content;
    let h1 = document.createElement('h1');
    h1.textContent = 'CEV Autonomy';
    let ps = [
        'I am bored',
        'Sorry about it'
    ].map(par => {
        let p = document.createElement('p');
        p.textContent = par;
        return p;
    });
    content.appendChild(h1);
    for (const p of ps) {
        content.appendChild(p);
    }
}