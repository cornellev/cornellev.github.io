async function Page(page) {
    page.title = 'The Secret Page!';
    await include(page.content, 'secret.html');
}
