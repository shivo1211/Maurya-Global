// ==========================================
// PRODUCTS PAGE JAVASCRIPT
// Filtering & Inquiry Modal Functionality
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // === PRODUCT FILTERING ===
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.category;

            productItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'flex';
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // === INQUIRY MODAL ===
    const modal = document.getElementById('inquiry-modal');
    const closeModal = document.getElementById('close-modal');
    const enquiryButtons = document.querySelectorAll('.enquiry-btn');
    const modalProductName = document.getElementById('modal-product-name');
    const displayProductName = document.getElementById('display-product-name');
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const inquiryForm = document.getElementById('inquiry-form');
    const formMessage = document.getElementById('form-message');

    let currentProductName = '';

    // Open modal when clicking enquiry button
    enquiryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-item');
            const productTitle = productCard.querySelector('.product-title');
            currentProductName = productTitle ? productTitle.textContent : 'Product';

            modalProductName.value = currentProductName;
            displayProductName.textContent = currentProductName;

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);

            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal function
    function closeModalHandler() {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            formMessage.className = 'form-message';
            formMessage.textContent = '';
            inquiryForm.reset();
        }, 300);
    }

    // Close modal on X button click
    if (closeModal) {
        closeModal.addEventListener('click', closeModalHandler);
    }

    // Close modal on overlay click
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalHandler();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalHandler();
        }
    });

    // WhatsApp button handler
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', () => {
            const name = document.getElementById('user-name').value || '';
            const phone = document.getElementById('user-phone').value || '';
            const message = document.getElementById('user-message').value || '';

            const whatsappMessage = encodeURIComponent(
                `Hello Maurya Global!\n\n` +
                `I'm interested in: ${currentProductName}\n\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Message: ${message}\n\n` +
                `Please provide more details about this product.`
            );

            const whatsappNumber = '919967195231';
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        });
    }

    // Form submission handler
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = inquiryForm.querySelector('.btn-submit-email');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>⏳</span> Sending...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(inquiryForm);
                const response = await fetch(inquiryForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formMessage.className = 'form-message success';
                    formMessage.textContent = '✓ Thank you! Your inquiry has been sent successfully. We will contact you soon.';
                    inquiryForm.reset();
                    displayProductName.textContent = currentProductName;
                    modalProductName.value = currentProductName;

                    setTimeout(() => {
                        closeModalHandler();
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                formMessage.className = 'form-message error';
                formMessage.textContent = '✗ Something went wrong. Please try again or contact us via WhatsApp.';
            }

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }

    // ==========================================
    // BULK QUOTE MODAL
    // ==========================================

    const bulkModal = document.getElementById('bulk-quote-modal');
    const bulkQuoteBtn = document.getElementById('bulk-quote-btn');
    const closeBulkModal = document.getElementById('close-bulk-modal');
    const bulkForm = document.getElementById('bulk-quote-form');
    const bulkFormMessage = document.getElementById('bulk-form-message');
    const selectAllCheckbox = document.getElementById('select-all-products');
    const productCheckboxes = document.querySelectorAll('input[name="products[]"]');
    const selectedSummary = document.getElementById('selected-summary');
    const selectedCount = document.getElementById('selected-count');
    const bulkWhatsappBtn = document.getElementById('bulk-whatsapp-btn');

    // Open bulk modal
    if (bulkQuoteBtn) {
        bulkQuoteBtn.addEventListener('click', () => {
            bulkModal.style.display = 'flex';
            setTimeout(() => {
                bulkModal.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        });
    }

    // Close bulk modal function
    function closeBulkModalHandler() {
        bulkModal.classList.remove('active');
        setTimeout(() => {
            bulkModal.style.display = 'none';
            document.body.style.overflow = '';
            bulkFormMessage.className = 'form-message';
            bulkFormMessage.textContent = '';
            bulkForm.reset();
            updateSelectedCount();
        }, 300);
    }

    // Close bulk modal handlers
    if (closeBulkModal) {
        closeBulkModal.addEventListener('click', closeBulkModalHandler);
    }

    if (bulkModal) {
        bulkModal.addEventListener('click', (e) => {
            if (e.target === bulkModal) {
                closeBulkModalHandler();
            }
        });
    }

    // Escape key for bulk modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bulkModal && bulkModal.classList.contains('active')) {
            closeBulkModalHandler();
        }
    });

    // Select All functionality
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', () => {
            productCheckboxes.forEach(cb => {
                cb.checked = selectAllCheckbox.checked;
            });
            updateSelectedCount();
        });
    }

    // Update select all based on individual checkboxes
    productCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const allChecked = Array.from(productCheckboxes).every(c => c.checked);
            const someChecked = Array.from(productCheckboxes).some(c => c.checked);

            if (selectAllCheckbox) {
                selectAllCheckbox.checked = allChecked;
                selectAllCheckbox.indeterminate = someChecked && !allChecked;
            }
            updateSelectedCount();
        });
    });

    // Update selected count
    function updateSelectedCount() {
        const count = Array.from(productCheckboxes).filter(cb => cb.checked).length;
        if (selectedCount) {
            selectedCount.textContent = count;
        }
        if (selectedSummary) {
            selectedSummary.style.display = count > 0 ? 'block' : 'none';
        }
    }

    // Get selected products list
    function getSelectedProducts() {
        return Array.from(productCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
    }

    // Bulk WhatsApp handler
    if (bulkWhatsappBtn) {
        bulkWhatsappBtn.addEventListener('click', () => {
            const selectedProducts = getSelectedProducts();

            if (selectedProducts.length === 0) {
                bulkFormMessage.className = 'form-message error';
                bulkFormMessage.textContent = 'Please select at least one product.';
                return;
            }

            const name = document.getElementById('bulk-name').value || '';
            const phone = document.getElementById('bulk-phone').value || '';
            const email = document.getElementById('bulk-email').value || '';
            const message = document.getElementById('bulk-message').value || '';
            const whatsappPreference = document.getElementById('whatsapp-preference').checked;

            const productsList = selectedProducts.map((p, i) => `${i + 1}. ${p}`).join('\n');

            const whatsappMessage = encodeURIComponent(
                `Hello Maurya Global!\n\n` +
                `I'd like a BULK QUOTE for the following products:\n\n` +
                `${productsList}\n\n` +
                `---\n` +
                `Name: ${name}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone}\n` +
                `WhatsApp Contact Preferred: ${whatsappPreference ? 'Yes' : 'No'}\n` +
                `Additional Requirements: ${message}\n\n` +
                `Please provide quotation for these products.`
            );

            const whatsappNumber = '919967195231';
            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
        });
    }

    // Bulk form submission
    if (bulkForm) {
        bulkForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const selectedProducts = getSelectedProducts();

            if (selectedProducts.length === 0) {
                bulkFormMessage.className = 'form-message error';
                bulkFormMessage.textContent = 'Please select at least one product.';
                return;
            }

            const submitBtn = bulkForm.querySelector('.btn-submit-email');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>⏳</span> Sending...';
            submitBtn.disabled = true;

            try {
                const formData = new FormData(bulkForm);
                // Add products as a formatted string
                formData.set('selected_products', selectedProducts.join(', '));
                formData.set('product_count', selectedProducts.length.toString());

                const response = await fetch(bulkForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    bulkFormMessage.className = 'form-message success';
                    bulkFormMessage.textContent = `✓ Thank you! Your bulk quote request for ${selectedProducts.length} products has been sent. We will contact you soon.`;

                    setTimeout(() => {
                        closeBulkModalHandler();
                    }, 3000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                bulkFormMessage.className = 'form-message error';
                bulkFormMessage.textContent = '✗ Something went wrong. Please try again or use WhatsApp.';
            }

            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
});
