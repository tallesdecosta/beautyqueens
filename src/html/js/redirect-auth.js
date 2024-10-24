checarRedirect();

async function checarRedirect() {

    const queryString = new URLSearchParams(window.location.search);
    
    body = {
        email: `${queryString.get('email')}`
    }

    response = await fetch('/php/mail/mail.php/check', {

        method: "POST",
        body: JSON.stringify(body)

    }).then((res) => {

        return res.json()

    }).then((data) => {

        if(data.redirect) {

            window.location.href = `../${data.to}.html`;

        }

    });


}