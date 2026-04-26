// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Toggle Details Rows smoothly
    const toggleBtns = document.querySelectorAll('.toggle-details');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tr = this.closest('.main-row');
            const detailsTr = tr.nextElementSibling;
            
            // Toggle visibility class
            detailsTr.classList.toggle('show');
            
            // Update button text and style based on state
            if (detailsTr.classList.contains('show')) {
                this.innerHTML = 'إخفاء التفاصيل ⬆️';
                this.style.background = 'var(--primary)';
                this.style.color = 'white';
            } else {
                this.innerHTML = 'عرض التفاصيل 🔍';
                this.style.background = 'transparent';
                this.style.color = 'var(--primary)';
            }
        });
    });

    // 2. Handle "Continue" Button logic
    const btnContinue = document.getElementById('btn-continue');
    const orderSection = document.getElementById('order-section');
    const selectedMealsList = document.getElementById('selected-meals-list');

    if (btnContinue) {
        btnContinue.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.meal-check:checked');
            
            if (checkboxes.length === 0) {
                // Requirement: alert if nothing selected
                alert("الرجاء اختيار وجبة واحدة على الأقل لتتمكن من المتابعة 🍽️");
                return;
            }

            // Populate the summary list
            selectedMealsList.innerHTML = ''; // clear old
            checkboxes.forEach(box => {
                const li = document.createElement('li');
                li.textContent = box.value;
                selectedMealsList.appendChild(li);
            });

            // Reveal form section and scroll
            orderSection.classList.remove('hidden');
            setTimeout(() => {
                orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        });
    }

    // 3. Form Validation logic
    const form = document.getElementById('order-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard submission

            // Get values
            const name = document.getElementById('fullName').value.trim();
            const natId = document.getElementById('nationalId').value.trim();
            const dob = document.getElementById('dob').value;
            const mobile = document.getElementById('mobile').value.trim();
            const email = document.getElementById('email').value.trim();

            // Validation Patterns
            const arabicPattern = /^[\u0600-\u06FF\s]+$/;
            const idPattern = /^\d{11}$/;
            const mobilePattern = /^09\d{8}$/;

            // Validate Name
            if (!arabicPattern.test(name)) {
                alert("❌ خطأ: يرجى إدخال الاسم الثلاثي بأحرف عربية فقط.");
                return;
            }

            // Validate National ID
            if (!idPattern.test(natId)) {
                alert("❌ خطأ: الرقم الوطني يجب أن يتكون من 11 رقم حصراً.");
                return;
            }

            // Validate DOB (Must be past)
            const birthDate = new Date(dob);
            const today = new Date();
            today.setHours(0,0,0,0);
            if (birthDate >= today) {
                alert("❌ خطأ: تاريخ الميلاد يجب أن يكون في الماضي.");
                return;
            }

            // Validate Mobile
            if (!mobilePattern.test(mobile)) {
                alert("❌ خطأ: رقم الموبايل يجب أن يبدأ بـ 09 ويتكون من 10 أرقام (مثال: 0999999999).");
                return;
            }

            // Validate Email (Basic empty check, HTML5 handles structure)
            if (email === "") {
                alert("❌ خطأ: حقل البريد الإلكتروني مطلوب.");
                return;
            }

            // If all passed
            alert("✅ تم إرسال طلبك الملكي بنجاح! شكراً لاختيارك قصر النكهات.");
            
            // Reset and hide
            form.reset();
            orderSection.classList.add('hidden');
            document.querySelectorAll('.meal-check:checked').forEach(cb => cb.checked = false);
            
            // Scroll to top elegantly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Header background effect on scroll
    const header = document.querySelector('.glass-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.7)';
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.05)';
            }
        });
    }
});