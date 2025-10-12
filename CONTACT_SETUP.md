# Contact Form Setup Instructions

This contact form is configured to send emails to `cavusogluvolkan61@gmail.com` when users submit the form.

## Current Implementation

The contact form uses a fallback system:
1. **Primary**: Formspree service (recommended for production)
2. **Fallback**: Mailto link (opens user's email client)

## Setup Options

### Option 1: Formspree (Recommended)

1. Go to [Formspree.io](https://formspree.io)
2. Create a free account
3. Create a new form
4. Copy your form ID
5. Update `src/services/formspreeService.ts`:
   ```typescript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
   ```

### Option 2: Backend API (Advanced)

1. Set up environment variables in Vercel:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password

2. Uncomment the API call in `src/services/contactService.ts`

3. Deploy the API endpoint (`api/contact.ts`)

### Option 3: EmailJS (Alternative)

1. Go to [EmailJS.com](https://emailjs.com)
2. Create a free account
3. Set up email service and template
4. Update `src/services/contactService.ts` with your credentials

## Form Features

- ✅ **Field Validation**: All fields are required
- ✅ **Email Validation**: Proper email format checking
- ✅ **Loading States**: Shows spinner while sending
- ✅ **Error Handling**: Displays user-friendly error messages
- ✅ **Success Confirmation**: "Thank you, your message has been sent successfully!"
- ✅ **Form Reset**: Clears form after successful submission

## Email Format

When a user submits the form, the email will be sent with:
- **Subject**: `[Contact Form] {User Subject}`
- **Body**:
  ```
  Name: {User Name}
  Email: {User Email}
  Subject: {User Subject}
  Message: {User Message}
  ```

## Testing

The form currently works with the mailto fallback. To test:
1. Fill out all required fields
2. Click "Send Message"
3. Your default email client will open with a pre-filled email
4. Send the email manually

For production, configure one of the primary options above.
