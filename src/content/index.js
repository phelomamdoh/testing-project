// Centralized content for The Happiness Code landing page
export const content = {
  // Home Page Hero Section
  homeHero: {
    authorName: "Sherife AbdelMessih",
    authorImage: "/sherif.png",
    authorTitle: "2x Bestselling Author",
    ctaText: "The Happiness Code",
    ctaLink: "/happinesscode",
  },

  // Happiness Code Page Hero Section (Original)
  hero: {
    title: "The Happiness Code",
    subtitle: "By Bestselling author Sherife AbdelMessih",
    description: "New live masterclass series",
    sessionDetails: "8 hours of online live sessions with Sherife",
    catchphrase: "Happiness is the world's most sought after drug",
    catchphraseSubtitle:
      "Everybody is either looking for it or wants more of it",
  },

  // About Section
  about: {
    title: "Meet Sherife AbdelMessih",
    bio: [
      "Regular speaker throughout his career at industry events hosted by Bloomberg, Financial Times, World Bank, and Harvard Business School.",
      "Honored by several heads of state, including two American presidents.",
    ],
    achievements: [
      {
        title: "Bestselling Author",
        description:
          "2 personal growth books that reached bestseller status in the US, Canada, UK, France and Australia",
        icon: "book",
        highlight: true,
      },
      {
        title: "MIT Scientist",
        description:
          "Leads many brain science research initiatives focused on emotions and the science of happiness",
        icon: "brain",
        highlight: true,
      },
      {
        title: "Global Speaker",
        description:
          "Keynote speaker at industry events hosted by Bloomberg, Financial Times, World Bank, and Harvard Business School",
        icon: "microphone",
        highlight: true,
      },
      {
        title: "Presidential Recognition",
        description:
          "Honored by several heads of state, including two American presidents",
        icon: "award",
        highlight: true,
      },
      {
        title: "Trusted Advisor",
        description:
          "Advises public figures including world champions, billionaires, and celebrities",
        icon: "advisor",
        highlight: true,
      },
    ],
  },

  // Media Section
  media: {
    title: "Featured on",
    logos: [
      { name: "Media Partner 1", src: "/logo-01.png", alt: "Media Partner 1" },
      { name: "Media Partner 2", src: "/logo-02.png", alt: "Media Partner 2" },
      { name: "Media Partner 3", src: "/logo-04.png", alt: "Media Partner 3" },
      { name: "Media Partner 4", src: "/logo-05.png", alt: "Media Partner 4" },
      { name: "Media Partner 5", src: "/logo-06.png", alt: "Media Partner 5" },
      { name: "Media Partner 6", src: "/logo-07.png", alt: "Media Partner 6" },
    ],
  },

  // Leaders Section
  leaders: {
    title: "Honored by World Leaders",
    items: [
      {
        name: "President Bill Clinton",
        image: "/leader-01.jpg",
      },
      {
        name: "Business Tycoon Naguib Sawiris",
        image: "/leader-02.jpg",
      },
      {
        name: "French Prime Minister Manuel Valls",
        image: "/leader-03.jpg",
      },
    ],
  },

  // Books Section
  books: {
    title: "Published Books",
    items: [
      {
        title: "Rewrite Your Destiny",
        subtitle: "The Power within Us to Change Everything",
        link: "https://www.amazon.com/Rewrite-Your-Destiny-Everything-Transformation/dp/B0D5VHGG5V/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr=&tag=wellbeing062-20",
        image: "/book1.jpg",
      },
      {
        title: "Super Vision",
        subtitle: "An Eye-Opening Approach to Getting Unstuck",
        link: "https://www.amazon.com/Super-Vision-Eye-Opening-Approach-Getting/dp/B0BZB7XFJ7/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr=&tag=wellbeing062-20",
        image: "/book2.jpg",
      },
    ],
  },

  // Course Content
  courseContent: {
    title: "Unlocking the happiness Code:",
    modules: [
      "Understanding the Science of Emotions and how are emotions made",
      "How can we be happy during our hardest times?",
      "Universal, thieves of joy that we let into our lives every day",
      "Understanding Energy and how it affects us",
      "How to nourish our mind and our body",
      "How to eliminate anxiety",
      "Unlocking past traumas",
    ],
  },

  // MIT Testimonial
  mitTestimonial: {
    title: "Endorsement from MIT",
    subtitle:
      "The Dean of Admissions at the world's #1 ranked university, wrote the following testimonial. It appears inside Sherife's first book, Super Vision:",
    quote:
      "I have known Sherife for many years and have witnessed his special gift for teaching and developing others. In this book, Sherife articulates an honest approach to seeing the world and our place in it. He shares a practical vision for living that can help us navigate the ups and downs of life and unlock our full potential, allowing us to thrive. This book provides a vital blueprint for anyone who wants to get unstuck and take their life to new heights.",
    author: "Stu Schmill",
    position: "MIT Dean of Admissions",
  },

  // Client Testimonials
  testimonials: {
    title: "Testimonials",
    items: [
      {
        quote:
          "I did one on one online sessions with Sherife and his frameworks work like magic. He keeps telling me its science, not magic. I will always be grateful to him.",
        author: "Nada E.",
      },
      {
        quote:
          "Over the last 10 years I saw 3 different psychiatrists, 2 psychologists and 1 life coach. I gave up that I could be happy with my life since nothing worked. That was until I started doing private calls with Sherife and learning his principles. It was the first time I could experience sustained happiness in 10 years.",
        author: "Eman H.",
      },
      {
        quote:
          "Sherife's psychology expertise is extremely impressive, not only does he understand the science but his ability to explain it in a way that is very easy to understand and implement is unmatched.",
        author: "Amin M.",
      },
      {
        quote:
          "The skills and frameworks that I have learned from Sherife have been extremely essential to my wellbeing. His methodology has been crucial in getting me through the storms I experience at work and my personal life.",
        author: "Phillip E.",
      },
    ],
  },

  // Pricing Section
  pricing: {
    title: "Special Launch Offer",
    subtitle: "Transform your life with exclusive access to The Happiness Code",
    originalPrice: "20,000",
    discountedPrice: "5,000",
    currency: "EGP",
    period: "per month",
    paymentNote: "paid for three months",
    features: [
      "8 hours of live online sessions with Sherife",
      "Exclusive access to science-based happiness frameworks",
      "Direct interaction and Q&A sessions",
      "Lifetime access to session recordings",
      "Private community access with fellow participants",
    ],
    ctaText: "Secure Your Spot Now",
    discount: "75% OFF",
  },

  // Registration Form
  registration: {
    title: "Register Now",
    fields: {
      name: {
        label: "Name",
        placeholder: "Enter your full name",
        type: "text",
        required: true,
      },
      mobile: {
        label: "Mobile",
        placeholder: "Enter your mobile number",
        type: "tel",
        required: true,
      },
      email: {
        label: "Email",
        placeholder: "Enter your email address",
        type: "email",
        required: true,
      },
    },
    submitButton: "Register Now",
    successMessage: {
      title: "Thank you for registering!",
      content: "Please transfer the program fees to Loay over Instapay.",
      instapay: "01550455588",
      paymentDetails:
        "Only 5,000 EGP per month for 3 months. The first monthly payment is due now.",
    },
  },

  // Footer
  footer: {
    copyright: "Sherife AbdelMessih. All rights reserved.",
    website: "sherifeabdelmessih.com",
    contact: "s@sherifeabdelmessih.com",
    socialLinks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sherife-abdelmessih",
        icon: "linkedin",
      },
      {
        name: "Facebook",
        url: "https://mobile.facebook.com/shico8/",
        icon: "facebook",
      },
      {
        name: "Instagram",
        url: "https://www.instagram.com/mr.wellbeingmindset?igsh=dno2cnFoYmgwdm5m",
        icon: "instagram",
      },
      {
        name: "Twitter",
        url: "https://x.com/sherife8",
        icon: "twitter",
      },
    ],
  },

  // SEO Meta
  meta: {
    title:
      "The Happiness Code - Live Masterclass Series by Sherife AbdelMessih",
    description:
      "Join bestselling author Sherife AbdelMessih for an 8-hour live masterclass series on unlocking the science of happiness and transforming your life.",
    keywords:
      "happiness, personal development, psychology, Sherife AbdelMessih, masterclass, life transformation, emotional intelligence",
  },
};
