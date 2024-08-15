document.addEventListener('DOMContentLoaded', () => {
    // Inisialiasasi elemen
    const btnSubmit = document.getElementById('submit');
    const btnReset = document.getElementById('reset');
    const inputFields = document.querySelectorAll('#bmi-form .input-box input');
    const bmiResult = document.querySelector('.bmi-result');
    const bmiArticle = document.querySelector('.bmi-article');
    const radioButtons = document.querySelectorAll('input[name="gender"]');

    // Memeriksa apakah semua input terisi dan jenis kelamin telah dipilih. Jika semua kondisi terpenuhi, tombol submit diaktifkan. Jika tidak, tombol submit dinonaktifkan.
    const updateSubmitButtonStatus = () => {
        const allFilled = Array.from(inputFields).every(input => input.checkValidity());
        const genderSelected = Array.from(radioButtons).some(radio => radio.checked);
        btnSubmit.ariaDisabled = !(allFilled && genderSelected);
    };

    // Ketika tombol reset diklik, semua input dihapus, tombol submit dinonaktifkan, hasil BMI disembunyikan, dan artikel BMI ditampilkan kembali. Pilihan radio button juga dihapus.
    btnReset.addEventListener('click', () => {
        inputFields.forEach(input => {
            input.value = '';
            input.setCustomValidity(''); // Reset custom validity
        });
        bmiResult.style.display = 'none'; // Sembunyikan hasil BMI
        bmiArticle.style.display = 'block'; // Tampilkan artikel BMI
        radioButtons.forEach(radio => radio.checked = false); // Hapus pilihan radio button
        updateSubmitButtonStatus(); // Perbarui status tombol submit setelah reset
    });

    // Untuk setiap elemen input, event listener ditambahkan untuk memeriksa perubahan nilai (input) dan mencegah input non-numerik (keypress).
    inputFields.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (!/[\d]/.test(e.key)) {
                e.preventDefault();
            }
        });
    });

    // Menambahkan event listener pada setiap radio button untuk memeriksa perubahan pilihan dan memperbarui status tombol submit.
    radioButtons.forEach(radio => {
        radio.addEventListener('change', updateSubmitButtonStatus);
    });

    // Inisialisasi Elemen untuk Menampilkan Hasil
    const bmiResultText = document.querySelector('.result');
    const bmiResultCategory = document.querySelector('.category');

    // Event listener untuk tombol submit
    btnSubmit.addEventListener('click', (event) => {
        event.preventDefault();

        // Validasi form
        if (document.querySelector('#bmi-form').checkValidity()) {
            const weight = parseFloat(document.querySelector('input[name="weight"]').value); // Berat badan dalam kg
            const heightCm = parseFloat(document.querySelector('input[name="height"]').value); // Tinggi badan dalam cm

            // Konversi tinggi badan dari cm ke meter
            const heightMeter = heightCm / 100;

            // Hitung hasil BMI
            const bmi = weight / (heightMeter * heightMeter);

            // Menentukan kategori BMI sesuai rumus
            let bmiCategory = '';
            if (bmi < 18.5) {
                bmiCategory = 'Kamu kekurangan berat badan';
                document.querySelector(".category-desc").innerHTML = 'Hasil BMI kamu dibawah 18.5';
                document.querySelector(".bmi-desc").innerHTML = 'Hasil BMI Kamu menunjukkan bahwa berat badan kamu berada di bawah kisaran yang dianggap sehat untuk tinggi badanmu. Ini bisa mengindikasikan kekurangan nutrisi atau adanya kondisi kesehatan yang mendasari.';
                document.querySelector(".bmi-suggest").innerHTML = 'Penting untuk meningkatkan asupan kalori dan memastikan pola makan yang seimbang untuk menambah berat badan. Konsultasikan dengan dokter atau ahli gizi untuk mendapatkan rencana peningkatan berat badan yang aman.';
                document.querySelector(".bmi-risk").innerHTML = 'Kekurangan berat badan dapat meningkatkan risiko osteoporosis, anemia, dan masalah kekebalan tubuh. Pada wanita, hal ini juga dapat menyebabkan masalah menstruasi dan kesuburan.';

            } else if (bmi >= 18.5 && bmi < 25) {
                bmiCategory = 'Kamu memiliki berat badan yg ideal';
                document.querySelector(".category-desc").innerHTML = 'Hasil BMI kamu diantara 18.5 - 25';
                document.querySelector(".bmi-desc").innerHTML = 'Hasil BMI Kamu menunjukkan bahwa berat badanmu berada dalam kisaran yang sehat dan seimbang untuk tinggi badanmu. Ini adalah kategori yang diinginkan untuk kebanyakan orang.';
                document.querySelector(".bmi-suggest").innerHTML = 'Teruskan gaya hidup sehat dengan pola makan seimbang dan aktivitas fisik yang cukup untuk menjaga berat badan ideal ini.';
                document.querySelector(".bmi-risk").innerHTML = 'Pada rentang ini, risiko penyakit yang berkaitan dengan berat badan, seperti penyakit jantung, diabetes tipe 2, dan tekanan darah tinggi, relatif rendah.';

            } else if (bmi >= 25 && bmi < 30) {
                bmiCategory = 'Kamu kelebihan berat badan';
                document.querySelector(".category-desc").innerHTML = 'Hasil BMI kamu diantara 25 - 30';
                document.querySelector(".bmi-desc").innerHTML = 'Hasil BMI Kamu menunjukkan bahwa berat badanmu berada di atas kisaran yang sehat untuk tinggi badanmu. Ini bisa menjadi tanda peringatan untuk mulai menjaga pola makan dan aktivitas fisik.';
                document.querySelector(".bmi-suggest").innerHTML = 'Pertimbangkan untuk mengadopsi pola makan yang lebih sehat dan meningkatkan aktivitas fisik untuk mengurangi berat badan ke dalam kisaran yang lebih sehat.';
                document.querySelector(".bmi-risk").innerHTML = 'Kelebihan berat badan dapat meningkatkan risiko penyakit jantung, diabetes tipe 2, tekanan darah tinggi, dan kolesterol tinggi.';

            } else {
                bmiCategory = 'Kamu kegemukan (Obesitas)';
                document.querySelector(".category-desc").innerHTML = 'Hasil BMI kamu melebihi 30';
                document.querySelector(".bmi-desc").innerHTML = 'Hasil BMI Kamu menunjukkan bahwa berat badanmu jauh di atas kisaran yang sehat untuk tinggi badanmu. Ini adalah kondisi serius yang memerlukan perhatian medis.';
                document.querySelector(".bmi-suggest").innerHTML = 'Segera konsultasikan dengan profesional kesehatan untuk mendapatkan rencana penurunan berat badan yang sesuai. Perubahan gaya hidup yang signifikan mungkin diperlukan untuk mencapai berat badan yang lebih sehat.';
                document.querySelector(".bmi-risk").innerHTML = 'Obesitas sangat meningkatkan risiko berbagai kondisi kesehatan serius, termasuk penyakit jantung, stroke, diabetes tipe 2, tekanan darah tinggi, apnea tidur, dan beberapa jenis kanker.';
            }

            // Tampilkan hasil BMI
            bmiResultText.textContent = `> ${bmi.toFixed(2)} <`;
            bmiResultCategory.textContent = `${bmiCategory}`;

            // Mengubah display ketika submit diaktifkan
            bmiResult.style.display = 'block';
            bmiArticle.style.display = 'none';
        } else {
            // Jika form tidak valid, beri tahu pengguna dengan validasi HTML5
            document.querySelector('#bmi-form').reportValidity();
        }
    });
});
