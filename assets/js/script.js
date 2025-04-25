document.addEventListener('DOMContentLoaded', function() {
    // Ativar perguntas frequentes
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length === 0) {
        console.warn('Nenhum elemento com a classe .faq-question foi encontrado');
        return;
    }
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            
            if (!faqItem) {
                console.warn('Elemento pai .faq-item não encontrado');
                return;
            }
            
            // Fechar outros itens ativos
            document.querySelectorAll('.faq-item.active').forEach(item => {
                if(item !== faqItem) {
                    item.classList.remove('active');
                    const activeQuestion = item.querySelector('.faq-question');
                    if (activeQuestion) activeQuestion.classList.remove('active');
                }
            });
            
            // Alternar o item atual
            faqItem.classList.toggle('active');
            this.classList.toggle('active');
        });
    });
});

    // Animação de scroll
    const animateElements = document.querySelectorAll('.animate');
    
    function checkVisibility() {
        const triggerPosition = window.innerHeight / 1.2;
        
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < triggerPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Verificar elementos visíveis na carga inicial da página
    checkVisibility();
    
    // Verificar elementos visíveis durante o scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Efeito de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito no cabeçalho durante o scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.classList.remove('scrolled');
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Contador de estatísticas (opcional)
    function animateCounter(el, start, end, duration) {
        let startTime = null;
        
        function animation(currentTime) {
            if(startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            
            el.textContent = value;
            
            if(progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Inicializar contadores se existirem elementos com a classe 'counter'
    const counters = document.querySelectorAll('.counter');
    if(counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    const el = entry.target;
                    const end = parseInt(el.getAttribute('data-count'));
                    animateCounter(el, 0, end, 2000);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Detecção de dispositivo móvel para ajustes de layout
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if(isMobile) {
        document.body.classList.add('mobile-device');
    }
