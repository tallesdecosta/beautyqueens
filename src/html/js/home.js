document.addEventListener('DOMContentLoaded', () => {
    // Your code here
    fetch('/api/user')
        .then(response => response.json())
        .then(data => {
            const profileImage = document.getElementById('profileImage');
            const profileText = document.getElementById('profileText');

            profileImage.src = data.profileImage;
            profileText.textContent = `Hello, ${data.username}`;

            profileImage.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });

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

