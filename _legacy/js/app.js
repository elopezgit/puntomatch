document.addEventListener('DOMContentLoaded', () => {
    // --- 1. NAVBAR SCROLL EFFECT ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. GSAP ANIMATIONS ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    const tlHero = gsap.timeline();
    
    tlHero.from(".hero-title .line", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.2
    })
    .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .from(".hero-actions", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6");

    // Scroll Animations for elements
    const revealElements = document.querySelectorAll('.gs-reveal');
    revealElements.forEach((elem) => {
        gsap.fromTo(elem, 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: elem,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Parallax effect for Hero BG
    gsap.to(".hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // --- 3. BOOKING LOGIC ---
    
    // Generate mock data for calendar
    const daysContainer = document.getElementById('days-container');
    const slotsContainer = document.getElementById('slots-container');
    const btnNextStep = document.getElementById('btn-next-step');
    const btnBackStep = document.getElementById('btn-back-step');
    
    const steps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3')
    ];

    let selectedDay = null;
    let selectedTime = null;

    // Helper to format date
    const getNextDays = (count) => {
        const days = [];
        const today = new Date();
        const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        for (let i = 0; i < count; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            days.push({
                dateObj: d,
                name: i === 0 ? 'Hoy' : i === 1 ? 'Mañana' : dayNames[d.getDay()],
                dateStr: `${d.getDate()} ${monthNames[d.getMonth()]}`
            });
        }
        return days;
    };

    const renderDays = () => {
        const days = getNextDays(14); // Next 14 days
        days.forEach((day, index) => {
            const el = document.createElement('div');
            el.className = 'day-card';
            el.innerHTML = `
                <span class="day-name">${day.name}</span>
                <span class="day-date">${day.dateStr}</span>
            `;
            
            el.addEventListener('click', () => {
                document.querySelectorAll('.day-card').forEach(c => c.classList.remove('selected'));
                el.classList.add('selected');
                selectedDay = day;
                renderSlots();
                checkStep1();
            });

            // Select first day by default
            if (index === 0) {
                el.click();
            }

            daysContainer.appendChild(el);
        });
    };

    const renderSlots = () => {
        slotsContainer.innerHTML = '';
        selectedTime = null;
        checkStep1();

        // Generate time slots from 14:00 to 23:00 (every 1.5 hours)
        const times = ['14:00', '15:30', '17:00', '18:30', '20:00', '21:30', '23:00'];
        
        times.forEach(time => {
            const isBooked = Math.random() > 0.7; // Randomly book some slots
            
            const el = document.createElement('div');
            el.className = `time-slot ${isBooked ? 'booked' : ''}`;
            el.textContent = time;

            if (!isBooked) {
                el.addEventListener('click', () => {
                    document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
                    el.classList.add('selected');
                    selectedTime = time;
                    checkStep1();
                });
            }

            slotsContainer.appendChild(el);
        });
    };

    const checkStep1 = () => {
        if (selectedDay && selectedTime) {
            btnNextStep.disabled = false;
        } else {
            btnNextStep.disabled = true;
        }
    };

    // Navigation Steps
    const goToStep = (index) => {
        steps.forEach(s => s.classList.remove('active'));
        steps[index].classList.add('active');

        // If going to step 2, update summary
        if (index === 1) {
            document.getElementById('summary-date').textContent = `${selectedDay.name}, ${selectedDay.dateStr}`;
            document.getElementById('summary-time').textContent = `${selectedTime} hs`;
        }
    };

    btnNextStep.addEventListener('click', () => goToStep(1));
    btnBackStep.addEventListener('click', () => goToStep(0));

    // Initialize calendar
    renderDays();

    // --- 4. DRAG AND DROP FILE UPLOAD ---
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('receipt-upload');
    const fileNameDisplay = document.getElementById('file-name');

    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // Drag and Drop events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, () => uploadArea.classList.remove('dragover'), false);
    });

    uploadArea.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
        fileInput.files = files; // Update input files
    });

    function handleFiles(files) {
        if (files.length > 0) {
            fileNameDisplay.textContent = files[0].name;
            fileNameDisplay.style.color = 'var(--accent-primary)';
            uploadArea.style.borderColor = 'var(--accent-primary)';
        }
    }

    // --- 5. FORM SUBMISSION ---
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple validation
        if (!fileInput.files.length) {
            alert('Por favor, adjunta el comprobante de transferencia.');
            return;
        }

        // Show loading state on button (optional but good UX)
        const btnSubmit = bookingForm.querySelector('button[type="submit"]');
        const originalText = btnSubmit.textContent;
        btnSubmit.textContent = 'Procesando...';
        btnSubmit.disabled = true;

        // Simulate API call
        setTimeout(() => {
            goToStep(2); // Success step
        }, 1500);
    });

    // --- 6. COPY TO CLIPBOARD ---
    const copyElements = document.querySelectorAll('.copy-text');
    copyElements.forEach(el => {
        el.addEventListener('click', () => {
            const textToCopy = el.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const icon = el.nextElementSibling;
                const originalClass = icon.className;
                icon.className = 'ri-check-line accent';
                setTimeout(() => {
                    icon.className = originalClass;
                }, 2000);
            });
        });
    });
});
