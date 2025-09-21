// QA Handbook JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active navigation highlight
    function updateActiveNav() {
        const sections = document.querySelectorAll('.section, .hero');
        const navLinks = document.querySelectorAll('.nav-link');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Call on load

    // Copy code functionality
    function addCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre code');

        codeBlocks.forEach((block, index) => {
            const pre = block.parentElement;
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-btn';
            copyButton.textContent = 'Copy';
            copyButton.setAttribute('aria-label', 'Copy code to clipboard');

            // Style the copy button
            copyButton.style.cssText = `
                position: absolute;
                top: 10px;
                right: 10px;
                background: #4a5568;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            `;

            // Make pre element relative for absolute positioning
            pre.style.position = 'relative';

            copyButton.addEventListener('click', async function() {
                try {
                    await navigator.clipboard.writeText(block.textContent);
                    copyButton.textContent = 'Copied!';
                    copyButton.style.background = '#27ae60';

                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                        copyButton.style.background = '#4a5568';
                    }, 2000);
                } catch (err) {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = block.textContent;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);

                    copyButton.textContent = 'Copied!';
                    setTimeout(() => {
                        copyButton.textContent = 'Copy';
                    }, 2000);
                }
            });

            copyButton.addEventListener('mouseenter', function() {
                this.style.opacity = '1';
            });

            copyButton.addEventListener('mouseleave', function() {
                this.style.opacity = '0.8';
            });

            pre.appendChild(copyButton);
        });
    }

    // Add copy buttons after a short delay to ensure code highlighting is complete
    setTimeout(addCopyButtons, 500);

    // Search functionality
    function addSearchFeature() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 999;
            background: white;
            padding: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: none;
        `;

        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search handbook...';
        searchInput.className = 'search-input';
        searchInput.style.cssText = `
            width: 250px;
            padding: 8px 12px;
            border: 1px solid #bdc3c7;
            border-radius: 4px;
            font-size: 14px;
        `;

        const searchResults = document.createElement('div');
        searchResults.className = 'search-results';
        searchResults.style.cssText = `
            max-height: 300px;
            overflow-y: auto;
            margin-top: 10px;
        `;

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchResults);
        document.body.appendChild(searchContainer);

        // Toggle search with Ctrl+K or Cmd+K
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
                if (searchContainer.style.display === 'block') {
                    searchInput.focus();
                }
            }

            if (e.key === 'Escape') {
                searchContainer.style.display = 'none';
            }
        });

        // Search functionality
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            searchResults.innerHTML = '';

            if (query.length < 2) return;

            const sections = document.querySelectorAll('.content-card, .ref-card');
            const matches = [];

            sections.forEach(section => {
                const text = section.textContent.toLowerCase();
                const title = section.querySelector('h3, h4');
                const titleText = title ? title.textContent : 'Section';

                if (text.includes(query)) {
                    const sectionElement = section.closest('.section') || section.closest('.hero');
                    const sectionId = sectionElement ? sectionElement.id : '';

                    matches.push({
                        title: titleText,
                        sectionId: sectionId,
                        element: section
                    });
                }
            });

            matches.forEach(match => {
                const resultItem = document.createElement('div');
                resultItem.style.cssText = `
                    padding: 8px 12px;
                    cursor: pointer;
                    border-bottom: 1px solid #ecf0f1;
                    font-size: 14px;
                `;
                resultItem.textContent = match.title;

                resultItem.addEventListener('mouseenter', function() {
                    this.style.background = '#ecf0f1';
                });

                resultItem.addEventListener('mouseleave', function() {
                    this.style.background = 'white';
                });

                resultItem.addEventListener('click', function() {
                    match.element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    searchContainer.style.display = 'none';
                    searchInput.value = '';
                    searchResults.innerHTML = '';
                });

                searchResults.appendChild(resultItem);
            });

            if (matches.length === 0) {
                searchResults.innerHTML = '<div style="padding: 8px 12px; color: #7f8c8d; font-size: 14px;">No results found</div>';
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                searchContainer.style.display = 'none';
            }
        });
    }

    addSearchFeature();

    // Back to top button
    function addBackToTop() {
        const backToTopButton = document.createElement('button');
        backToTopButton.textContent = '↑';
        backToTopButton.className = 'back-to-top';
        backToTopButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #3498db;
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(backToTopButton);

        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        backToTopButton.addEventListener('mouseenter', function() {
            this.style.background = '#2980b9';
        });

        backToTopButton.addEventListener('mouseleave', function() {
            this.style.background = '#3498db';
        });
    }

    addBackToTop();

    // Theme toggle (dark/light mode)
    function addThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.textContent = '🌙';
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        themeToggle.style.cssText = `
            position: fixed;
            top: 80px;
            left: 20px;
            background: white;
            border: 1px solid #bdc3c7;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 16px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(themeToggle);

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('qa-handbook-theme');
        if (savedTheme === 'dark') {
            enableDarkMode();
        }

        themeToggle.addEventListener('click', function() {
            if (document.body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        });

        function enableDarkMode() {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
            localStorage.setItem('qa-handbook-theme', 'dark');

            // Add dark mode styles
            const darkModeCSS = `
                .dark-mode {
                    --primary-color: #e2e8f0;
                    --secondary-color: #60a5fa;
                    --text-color: #e2e8f0;
                    --light-bg: #1a202c;
                    --white: #2d3748;
                    --dark-bg: #4a5568;
                    --border-color: #4a5568;
                }

                .dark-mode .navbar {
                    background: #2d3748;
                }

                .dark-mode .hero {
                    background: linear-gradient(135deg, #1a202c, #2d3748);
                }

                .dark-mode pre {
                    background: #1a202c;
                }
            `;

            if (!document.getElementById('dark-mode-styles')) {
                const styleSheet = document.createElement('style');
                styleSheet.id = 'dark-mode-styles';
                styleSheet.textContent = darkModeCSS;
                document.head.appendChild(styleSheet);
            }
        }

        function disableDarkMode() {
            document.body.classList.remove('dark-mode');
            themeToggle.textContent = '🌙';
            localStorage.setItem('qa-handbook-theme', 'light');
        }
    }

    addThemeToggle();

    // Print functionality
    function addPrintButton() {
        const printButton = document.createElement('button');
        printButton.textContent = '🖨️';
        printButton.className = 'print-btn';
        printButton.setAttribute('aria-label', 'Print handbook');
        printButton.style.cssText = `
            position: fixed;
            top: 130px;
            left: 20px;
            background: white;
            border: 1px solid #bdc3c7;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 16px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(printButton);

        printButton.addEventListener('click', function() {
            window.print();
        });

        printButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        printButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    addPrintButton();

    // Progressive loading for better performance
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading if images exist
    if (document.querySelectorAll('img[data-src]').length > 0) {
        lazyLoadImages();
    }

    // Add keyboard shortcuts info
    function showKeyboardShortcuts() {
        const shortcutsInfo = document.createElement('div');
        shortcutsInfo.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            font-size: 12px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;

        shortcutsInfo.innerHTML = `
            <strong>Keyboard Shortcuts:</strong><br>
            Ctrl/Cmd + K: Search<br>
            Esc: Close modals<br>
            Ctrl/Cmd + P: Print
        `;

        document.body.appendChild(shortcutsInfo);

        // Show shortcuts on Ctrl/Cmd + /
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                shortcutsInfo.style.opacity = '1';
                shortcutsInfo.style.pointerEvents = 'auto';

                setTimeout(() => {
                    shortcutsInfo.style.opacity = '0';
                    shortcutsInfo.style.pointerEvents = 'none';
                }, 3000);
            }
        });
    }

    showKeyboardShortcuts();

    console.log('🚀 QA Handbook loaded successfully!');
    console.log('💡 Press Ctrl/Cmd + K to search');
    console.log('💡 Press Ctrl/Cmd + / to see all shortcuts');
});