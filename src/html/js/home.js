document.addEventListener('DOMContentLoaded', () => {
    // Your code here
   
    const sideMenuButton = document.querySelector('.side_bar');
    sideMenuButton.addEventListener('click', openMenu);

    const closeMenuButton = document.querySelector('.close_menu');
    closeMenuButton.addEventListener('click', closeMenu);
});

function openMenu() {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.add("active");
}

function closeMenu() {
    const sideMenu = document.getElementById("sideMenu");
    sideMenu.classList.remove("active");
}

function openSearch() {
    const searchMenu = document.getElementById("searchMenu");
    searchMenu.classList.add("active");
}

function closeSearch() {
    const searchMenu = document.getElementById("searchMenu");
    searchMenu.classList.remove("active");

}


async function logout() {
    
    try {

        const response = await fetch('../php/auth/auth.php/logout', {

            method: 'GET',
            credentials: "include"

        })

        if (response.status === 204) {

            window.location.href = 'login.html'

        }

    } catch (error) {

        console.error('Erro de logout: ', error);

    }

}


