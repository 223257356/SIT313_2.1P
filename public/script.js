document.getElementById('subscribeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;

    fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    })
        .then((response) => response.text())
        .then((data) => {
            alert(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});
