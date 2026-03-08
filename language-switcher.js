// Language Switcher for HTML pages
(function() {
    'use strict';

    // Get language from localStorage or default to 'en'
    let currentLanguage = localStorage.getItem('language') || 'en';

    // Function to get translation
    function t(key) {
        const keys = key.split('.');
        let value = translations[currentLanguage];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to English
                value = translations.en;
                for (const fallbackKey of keys) {
                    if (value && typeof value === 'object' && fallbackKey in value) {
                        value = value[fallbackKey];
                    } else {
                        return key; // Return key if translation not found
                    }
                }
                break;
            }
        }
        
        return value || key;
    }

    // Function to update all translatable elements
    function updateTranslations() {
        // Update navigation links
        const navLinks = document.querySelectorAll('[data-translate]');
        navLinks.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (key) {
                const translation = t(key);
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });

        // Update HTML lang attribute
        document.documentElement.lang = currentLanguage;

        // Update language button text
        const langButton = document.getElementById('language-switcher');
        if (langButton) {
            const langText = langButton.querySelector('.lang-text');
            if (langText) {
                langText.textContent = currentLanguage.toUpperCase();
            }
        }
    }

    // Function to toggle language
    function toggleLanguage() {
        currentLanguage = currentLanguage === 'en' ? 'fr' : 'en';
        localStorage.setItem('language', currentLanguage);
        updateTranslations();
    }

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Create language switcher button if it doesn't exist
        const navContainer = document.querySelector('.nav-container');
        if (navContainer && !document.getElementById('language-switcher')) {
            const langButton = document.createElement('button');
            langButton.id = 'language-switcher';
            langButton.className = 'language-switcher';
            langButton.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span class="lang-text">${currentLanguage.toUpperCase()}</span>
            `;
            langButton.setAttribute('aria-label', currentLanguage === 'en' ? 'Switch to French' : 'Passer en anglais');
            langButton.addEventListener('click', toggleLanguage);
            
            // Check if nav-right container exists, if not create it
            let navRight = navContainer.querySelector('.nav-right');
            const navLinks = navContainer.querySelector('.nav-links');
            const hamburger = navContainer.querySelector('.hamburger');
            
            if (!navRight) {
                navRight = document.createElement('div');
                navRight.className = 'nav-right';
                
                // Move nav-links into nav-right
                if (navLinks) {
                    navLinks.parentNode.removeChild(navLinks);
                    navRight.appendChild(navLinks);
                }
                
                // Insert nav-right before hamburger (or at end if no hamburger)
                if (hamburger) {
                    navContainer.insertBefore(navRight, hamburger);
                } else {
                    navContainer.appendChild(navRight);
                }
            }
            
            // Add language switcher to nav-right
            navRight.appendChild(langButton);
        }

        // Apply translations
        updateTranslations();
    });

    // Export for use in other scripts if needed
    window.LanguageSwitcher = {
        toggle: toggleLanguage,
        getLanguage: () => currentLanguage,
        t: t
    };
})();
