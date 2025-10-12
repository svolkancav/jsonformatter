export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Formspree configuration
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; // Replace with your Formspree form ID

export const sendContactEmailFormspree = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Validate all fields are filled
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      throw new Error('All fields are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Prepare form data for Formspree
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('subject', formData.subject);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('_replyto', formData.email);
    formDataToSend.append('_subject', `[Contact Form] ${formData.subject}`);

    // Send to Formspree
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      body: formDataToSend,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return true;
  } catch (error) {
    console.error('Error sending email via Formspree:', error);
    throw error;
  }
};

// Alternative: Send email using a simple mailto link (fallback)
export const sendContactEmailMailto = (formData: ContactFormData): void => {
  const subject = encodeURIComponent(`[Contact Form] ${formData.subject}`);
  const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
  `);
  
  const mailtoLink = `mailto:cavusogluvolkan61@gmail.com?subject=${subject}&body=${body}`;
  window.open(mailtoLink);
};
