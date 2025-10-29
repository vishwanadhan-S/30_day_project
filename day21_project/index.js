 document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.prev-btn');
            const nextBtn = document.querySelector('.next-btn');
            const indicators = document.querySelectorAll('.indicator');
            const progressBar = document.querySelector('.progress-bar');
            const slideInfo = document.querySelector('.slide-info');
            
            let currentSlide = 0;
            const slideCount = slides.length;
            let autoSlideInterval;
            let progressInterval;
            
          
            updateSlider();
            startAutoSlide();
            
            
            prevBtn.addEventListener('click', goToPrevSlide);
            nextBtn.addEventListener('click', goToNextSlide);
            
           
            indicators.forEach(indicator => {
                indicator.addEventListener('click', function() {
                    const slideIndex = parseInt(this.getAttribute('data-index'));
                    goToSlide(slideIndex);
                });
            });
            
          
            document.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowLeft') {
                    goToPrevSlide();
                } else if (e.key === 'ArrowRight') {
                    goToNextSlide();
                }
            });
            
            
            slider.parentElement.addEventListener('mouseenter', pauseAutoSlide);
            slider.parentElement.addEventListener('mouseleave', startAutoSlide);
            
            function goToPrevSlide() {
                currentSlide = (currentSlide - 1 + slideCount) % slideCount;
                updateSlider();
                resetAutoSlide();
            }
            
            function goToNextSlide() {
                currentSlide = (currentSlide + 1) % slideCount;
                updateSlider();
                resetAutoSlide();
            }
            
            function goToSlide(slideIndex) {
                currentSlide = slideIndex;
                updateSlider();
                resetAutoSlide();
            }
            
            function updateSlider() {
               
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
                
               
                indicators.forEach((indicator, index) => {
                    if (index === currentSlide) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
                
                
                slideInfo.textContent = `Slide ${currentSlide + 1} of ${slideCount}`;
                
                
                resetProgressBar();
            }
            
            function startAutoSlide() {
                autoSlideInterval = setInterval(goToNextSlide, 5000);
                startProgressBar();
            }
            
            function pauseAutoSlide() {
                clearInterval(autoSlideInterval);
                clearInterval(progressInterval);
            }
            
            function resetAutoSlide() {
                pauseAutoSlide();
                startAutoSlide();
            }
            
            function startProgressBar() {
                progressBar.style.width = '0%';
                let width = 0;
                progressInterval = setInterval(() => {
                    if (width >= 100) {
                        clearInterval(progressInterval);
                    } else {
                        width += 0.5;
                        progressBar.style.width = width + '%';
                    }
                }, 25);
            }
            
            function resetProgressBar() {
                clearInterval(progressInterval);
                startProgressBar();
            }
        });