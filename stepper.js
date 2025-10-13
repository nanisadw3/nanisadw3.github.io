document.addEventListener('DOMContentLoaded', () => {
    const stepperContainer = document.querySelector('.stepper-container');
    if (!stepperContainer) return;

    const backButton = document.getElementById('stepper-back');
    const nextButton = document.getElementById('stepper-next');
    const indicators = document.querySelectorAll('.step-indicator');
    const steps = document.querySelectorAll('.step-content-item');

    let currentStep = 1;
    const totalSteps = steps.length;

    const updateStepper = () => {
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === currentStep) {
                step.classList.add('active');
            }
        });

        indicators.forEach(indicator => {
            indicator.classList.remove('active');
            if (parseInt(indicator.dataset.step) === currentStep) {
                indicator.classList.add('active');
            }
        });

        if (currentStep === 1) {
            backButton.disabled = true;
        } else {
            backButton.disabled = false;
        }

        if (currentStep === totalSteps) {
            nextButton.style.display = 'none';
        } else {
            nextButton.style.display = 'block';
        }
    };

    nextButton.addEventListener('click', () => {
        if (currentStep < totalSteps) {
            currentStep++;
            updateStepper();
        }
    });

    backButton.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateStepper();
        }
    });

    updateStepper();
});