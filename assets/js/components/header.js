export async function loadHeader() {
    try {
        const res = await fetch('../../components/header.html');
        const data = await res.text();
        
        const header = document.querySelector('.header');

        if (header) {
            header.innerHTML = data;
        } 

    } catch (error) {
        console.error('error:', error);
    }
}