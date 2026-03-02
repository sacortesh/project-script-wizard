# Script Wizard

A cyberpunk-themed personal blog built with Astro, Tailwind CSS, and Decap CMS.

## Netlify Identity Setup

The site uses [Netlify Identity](https://docs.netlify.com/security/secure-access-to-sites/identity/) to authenticate editors for the Decap CMS admin panel.

### Enable Identity on your Netlify site

1. Deploy the site to Netlify.
2. In the Netlify dashboard, go to **Site settings > Identity** and click **Enable Identity**.
3. Under **Registration**, choose **Invite only** to restrict access.
4. Under **Services > Git Gateway**, click **Enable Git Gateway** so the CMS can commit to your repo.

### Invite editors

1. Go to **Site settings > Identity > Invite users**.
2. Enter the email addresses of people who should have CMS access.
3. Invited users will receive an email with a link to set their password.

### Access the CMS

Navigate to `https://your-site.netlify.app/admin/` and log in with your Netlify Identity credentials.
