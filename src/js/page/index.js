async function Page(page) {
    page.title = 'CEV Autonomy Home';
    await include(page.content, 'home.html');
}
