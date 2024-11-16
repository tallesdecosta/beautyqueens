document.addEventListener('DOMContentLoaded', () => {
   
    const sideMenuButton = document.querySelector('.side_bar');
    sideMenuButton.addEventListener('click', openMenu);

    const closeMenuButton = document.querySelector('.close_menu');
    closeMenuButton.addEventListener('click', closeMenu);

    fetchTip();
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

async function fetchTip() {
    try {
        const response = await fetch('../php/tip/mock.php');
        const data = await response.json();
        const tipElement = document.querySelector('.tip-content p:nth-child(2)');
        tipElement.textContent = data.tip || 'Sem dicas disponiveis.';
    } catch (error) {
        console.error('Error fetching tip:', error);
        const tipElement = document.querySelector('.tip-content p:nth-child(2)');
        tipElement.textContent = 'Erro ao buscar dicas.';
    }
 
}



