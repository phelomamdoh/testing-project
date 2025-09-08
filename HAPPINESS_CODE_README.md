# The Happiness Code Landing Page

A modern, responsive landing page for Sherife AbdelMessih's "The Happiness Code" masterclass series.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all device sizes
- **Performance**: Optimized with Next.js 15 and Tailwind CSS v4
- **Animations**: Smooth GSAP animations and transitions
- **SEO Optimized**: Meta tags and open graph data included
- **Type Safe**: Built with TypeScript
- **Centralized Content**: All text content in a single file for easy updates

## 🎨 Design System

### Colors

- **Primary**: Blue theme (`primary-50` to `primary-950`)
- **Secondary**: Purple theme (`secondary-50` to `secondary-950`)
- **Accent**: Gold theme (`accent-50` to `accent-950`)
- **Neutral**: Gray theme for text and backgrounds

### Typography

- **Primary Font**: Inter (modern sans-serif)
- **Secondary Font**: Playfair Display (elegant serif for headings)

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and Tailwind config
├── components/
│   ├── HeroSection.tsx     # Hero section with main title
│   ├── AboutSection.tsx    # About Sherife section
│   ├── MediaSection.tsx    # Featured media logos
│   ├── BooksSection.tsx    # Published books with Amazon links
│   ├── CourseContentSection.tsx # Course modules
│   ├── MITTestimonialSection.tsx # MIT dean testimonial
│   ├── TestimonialsSection.tsx # Client testimonials
│   ├── RegistrationSection.tsx # Registration form
│   └── Footer.tsx          # Footer component
└── content/
    └── index.js            # Centralized content file
```

## 🛠 Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS v4**: Utility-first CSS framework
- **GSAP**: Professional animations library
- **React**: UI library

## 📝 Content Management

All text content is centralized in `src/content/index.js`. To update any text on the page:

1. Open `src/content/index.js`
2. Find the relevant section (hero, about, testimonials, etc.)
3. Update the text
4. Changes will automatically reflect on the page

## 🎯 Sections Included

1. **Hero Section**: Main title, subtitle, and call-to-action
2. **About Section**: Sherife's biography and achievements
3. **Media Section**: Featured media logos (placeholders included)
4. **Books Section**: Published works with Amazon links
5. **Course Content**: What's covered in the masterclass
6. **MIT Testimonial**: Endorsement from MIT Dean of Admissions
7. **Client Testimonials**: Real client feedback
8. **Registration Form**: Contact form with payment instructions
9. **Footer**: Contact information and social links

## 🖼 Image Placeholders

The following images need to be added to the `public/` directory:

- Sherife's professional photo (hero section)
- Sherife's photo for about section
- Book covers for both published works
- Media logos (Bloomberg, Financial Times, Harvard Business School, World Bank)
- Photos with world leaders (referenced in original brief)

## 🔧 Development

To run the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

To start production server:

```bash
npm start
```

## 📱 Responsive Breakpoints

The design is optimized for:

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px and above

## ⚡ Performance Features

- Optimized images with Next.js Image component
- CSS-in-JS with Tailwind for minimal bundle size
- Lazy loading for off-screen content
- Smooth scrolling and hardware-accelerated animations
- Static generation for fast loading

## 🎨 Customization

### Changing Colors

1. Update CSS variables in `src/app/globals.css`
2. Colors automatically propagate through the design system

### Updating Animations

1. GSAP animations are defined in individual components
2. Global animation utilities are in the CSS file

### Adding New Sections

1. Create a new component in `src/components/`
2. Add content to `src/content/index.js`
3. Import and add to `src/app/page.tsx`

## 🚀 Deployment

The project is ready to deploy to:

- Vercel (recommended for Next.js)
- Netlify
- Any hosting service that supports Node.js

Simply connect your repository and the deployment will be automatic.

---

**Note**: This is the first version. Images, final content adjustments, and additional features can be added based on feedback.
