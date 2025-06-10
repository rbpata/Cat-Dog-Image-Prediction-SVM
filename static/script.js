document.getElementById('imageInput').addEventListener('change', function () {
    const reader = new FileReader();
    reader.onload = function (e) {
        const preview = document.getElementById('preview');
        preview.src = e.target.result;
        preview.style.display = 'block';
    };
    reader.readAsDataURL(this.files[0]);
});

document.getElementById('upload-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText =
            `Prediction: ${data.label} `;
    })
    .catch(error => {
        console.error(error);
        document.getElementById('result').innerText = 'Error during prediction';
    });
});
