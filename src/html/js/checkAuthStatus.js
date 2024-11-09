async function checkAuthStatus() {

    try {

        const response = await fetch('../php/auth/auth.php/check-auth', {

            method: 'GET',
            credentials: 'include'

        });

        if (response.status === 401) {

            window.location.href = 'login.html';

        } else {

            const data = await response.json(); 
            console.log('Usuário logado: ', data);

        }

    } catch(error) {

        console.error('Erro de autenticação: ', error);
        

    }

}

checkAuthStatus();