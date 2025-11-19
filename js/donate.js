// Initialize AOS
AOS.init({
    duration: 1000,
    once: true
});

// Scroll to Top Button
const scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Donation buttons functionality
document.querySelectorAll('.donate-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const amount = this.getAttribute('data-amount');
        document.getElementById('donateAmount').value = amount;
        document.querySelectorAll('.donate-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Handle custom amount input
document.getElementById('customAmount').addEventListener('input', function() {
    document.getElementById('donateAmount').value = this.value;
    document.querySelectorAll('.donate-btn').forEach(b => b.classList.remove('active'));
});

// Form submission
document.getElementById('donateForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('ขอบคุณสำหรับการบริจาคของคุณ! \nทีมงานจะส่งข้อมูลการชำระเงินไปยังอีเมลของคุณ');
    bootstrap.Modal.getInstance(document.getElementById('donateModal')).hide();
    this.reset();
});
