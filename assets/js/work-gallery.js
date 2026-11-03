(() => {
      'use strict';

      const messages = {
        en: {
          footerNavigation: 'Footer navigation', footerAbout: 'About', footerContact: 'Contact me', footerRights: 'All rights reserved.', footerEmailLabel: 'Compose in Gmail (opens in a new tab)', footerEmailSubject: 'Portfolio contact',
          pageTitle: 'Luis Peche — Work gallery', primaryNavigation: 'Primary navigation', brandHome: 'Luis Peche home', sections: 'Sections',
          navHome: 'Home', navProjects: 'Projects', navSkills: 'Skills', navAbout: 'About Me', menu: 'Menu', menuLabel: 'Toggle navigation menu',
          socialProfiles: 'Social profiles', chooseLanguage: 'Choose language', themeToggle: 'Theme', themeToggleLabel: 'Toggle color theme', githubLabel: 'GitHub profile (opens in a new tab)',
          linkedinLabel: 'LinkedIn profile (opens in a new tab)', languageSpanish: 'Change language to Spanish', languageEnglish: 'Change language to English',
          heroName: 'Luis Peche', heroRole: 'Backend & Generative AI Developer', heroRoleBadge: 'JAVA & AI BACKEND SPECIALIST',
          heroSummary: 'I develop microservices and integrations with Java, Spring Boot, and SQL Server, as well as generative AI agents with Python. I have over 2 years of experience in the banking sector, also working with AWS services and Salesforce Marketing Cloud',
          stackTitle: 'Tech Stack', techStack: 'Tech Stack', techJava: 'Java', techPython: 'Python', techSpringBoot: 'Spring Boot', techAws: 'AWS', techGenerativeAi: 'Generative AI', techMarketingCloud: 'Marketing Cloud', techDocker: 'Docker', techSqlServer: 'SQL Server',
          bankExperienceTitle: '2+ years in the banking sector', bankExperienceSummary: 'Developing backend solutions, microservices, and integrations for banking processes', certificationsTitle: 'Certifications', certificationListLabel: 'AWS certification examples', certificationViewLabel: 'View credential', certificationNewTabLabel: 'opens in a new tab', certificationPendingLabel: 'Credly URL pending', confirmedProfileDetails: 'Confirmed profile details',
          knowMe: 'Know Me', downloadCV: 'Download CV', portraitAlt: 'Portrait of Luis Peche', photoBadgesLabel: 'Confirmed photo details', photoCardTitle: 'Backend & Cloud', photoCardSummary: 'Microservices · AWS · Generative AI',
          aboutEyebrow: 'PROFESSIONAL & ACADEMIC JOURNEY', aboutTitle: 'Professional Milestones', aboutSubtitle: 'My professional experience and education in software development, technology, and banking solutions', projectsEyebrow: 'PROJECTS', skillsEyebrow: 'TECHNICAL STACK & TOOLING', aboutFiltersLabel: 'Filter milestones', aboutTimelineLabel: 'Professional and academic milestones', aboutFilterAll: 'All milestones', aboutFilterExperience: 'Experience', aboutFilterEducation: 'Education', aboutCategoryExperience: 'Experience', aboutCategoryEducation: 'Education', aboutCategoryCertification: 'Certification', aboutCertificateAction: 'View certificate', aboutDocumentAction: 'View document', aboutStatusAll: '{count} milestones shown', aboutStatusExperience: '{count} experience records shown', aboutStatusEducation: '{count} education and certification records shown', aboutDateNoCountry: 'Nov. 2023 — Present', aboutDateDataAnalytics: 'Sep. 2023 — Nov. 2023', aboutDateZephyr: 'Aug. 2023 — Present', aboutDateAlura: 'May. 2023 — Sep. 2023', aboutDateIbague: 'Apr. 2023 — Jun. 2023', aboutDateJavaDeveloper: 'Feb. 2022 — Mar. 2022', aboutDateJavaProgrammer: 'Oct. 2021 — Nov. 2021', aboutDateAws: 'Mar. 2021', aboutDateHospital: 'May. 2019 — Nov. 2019', aboutDateSystemsEngineering: 'Dec. 2016 — Apr. 2022', aboutTitleNoCountry: 'Backend Developer', aboutTitleZephyr: 'Freelance Programmer', aboutTitleHospital: 'IT Unit', aboutTitleDataAnalytics: 'Bootcamp Data Analytics', aboutTitleAlura: 'Java and Spring boot specialization - Alura', aboutTitleIbague: 'Java and Spring boot - Advanced', aboutTitleJavaDeveloper: 'Java Developer', aboutTitleJavaProgrammer: 'Java Programmer', aboutTitleSystemsEngineering: 'Systems Engineering', aboutDescriptionNoCountry: 'Backend work on the “Cashier” digital wallet using a layered REST architecture, design patterns, and good practices.', aboutDescriptionZephyr: 'A chatbot service that initially manages the fast-food sales process and could be adapted to other commercial processes.', aboutDescriptionHospital: 'Managed MSSQL Server queries for medical appointments, Power BI reports, and the GALENHOS system; also developed a Java desktop app to meet staff needs.', aboutDescriptionDataAnalytics: 'Hands-on training in data analytics with Python, Microsoft SQL Server, and Power BI.', aboutDescriptionAlura: 'REST API development using a layered approach and the Richardson maturity model, with work on MySQL databases.', aboutDescriptionIbague: 'REST API development with layered organization, Richardson maturity principles, PostgreSQL administration, Spring Data, Spring Security, OpenAPI, Postman, Lombok, and Spring Boot.', aboutDescriptionJavaDeveloper: 'The course covered Java libraries, frameworks, good practices, and design patterns for web applications.', aboutDescriptionJavaProgrammer: 'Java SE and Jakarta EE component development, plus preparation for the Oracle Java 11 Developer exam (1Z0-819).', aboutDescriptionAws: 'Introductory AWS course covering cloud fundamentals, best practices, and console navigation.', aboutDescriptionSystemsEngineering: 'The CV states I am a Bachiller in Systems Engineering.', aboutTagLayeredArchitecture: 'Layered architecture', aboutTagDesignPatterns: 'Design patterns', aboutTagGoodPractices: 'Good practices', aboutTagRichardson: 'Richardson maturity model', aboutTagOracleExam: 'Oracle Java 11 Developer exam preparation', navContact: 'Contact',
          contactTitle: 'Contact Me', contactIntro: 'Tell me what you’re building, or reach out through a direct channel.',
          contactAsideLabel: 'Direct channels and engineering domains', contactChannelsTitle: 'Direct Channels', contactChannelsIntro: 'Email me or visit my professional profiles.', contactChannelsLabel: 'Contact channels',
          contactEmailLabel: 'Email', contactEmailValue: 'Compose in Gmail', contactLinkedInLabel: 'LinkedIn', contactLinkedInValue: 'Open profile', contactGitHubLabel: 'GitHub', contactGitHubValue: 'Open profile', contactExternalNotice: 'opens in a new tab',
          contactFocusTitle: 'Target Engineering Domains', contactFocusListLabel: 'Target engineering domains',
          contactFormTitle: 'Send a message', contactFormIntro: 'All fields are required.', contactName: 'Name', contactNameHelp: 'How should I address you?', contactEmail: 'Email', contactEmailHelp: 'I’ll use this address to reply.', contactMessage: 'Message', contactMessageHelp: 'Briefly tell me what you’re working on.', contactMessageLimit: 'Maximum 1500 characters.', contactSend: 'Send message', contactSending: 'Sending…', contactNameRequired: 'Enter your name.', contactEmailRequired: 'Enter your email address.', contactEmailInvalid: 'Enter a valid email address.', contactMessageRequired: 'Enter a message.', contactSuccess: 'Your message was sent successfully.', contactFailure: 'Your message could not be sent. Please try again or email me directly.', contactUnavailable: 'Automatic sending is unavailable. You can still reach me directly by email.',
          projectsTitle: 'What I Build', projectsIntro: 'Selected work from my portfolio', skillsTitle: 'Tools Behind the Work', skillsIntro: 'Technologies documented across my projects and profile', skillsFilterAll: 'All', skillsCarouselLabel: 'Technology carousel', skillsFiltersLabel: 'Filter technologies by category', skillsTrackLabel: 'Technology cards', skillsHelp: 'Use the arrow controls, keyboard, or swipe to browse.', skillsCategoryLanguages: 'Languages', skillsCategoryFrameworks: 'Frameworks & APIs', skillsCategoryData: 'Data', skillsCategorySecurity: 'Security', skillsCategoryCloud: 'Cloud & tooling', skillsPrevious: 'Previous technologies', skillsNext: 'Next technologies', skillsPause: 'Pause automatic scrolling', skillsResume: 'Resume automatic scrolling', skillsRestart: 'Restart automatic scrolling', skillsPauseLabel: 'Pause', skillsResumeLabel: 'Resume', skillsRestartLabel: 'Restart', skillsStatusRunning: 'Auto-scroll on', skillsStatusPaused: 'Auto-scroll paused', skillsStatusReduced: 'Paused for reduced motion', skillsStatusEnd: 'End of the list', skillsSlideRole: 'slide', skillsSlideLabel: '{name}, {position} of {total}', technologies: 'Technologies', projectDetailsAction: 'Details', projectDetailsLabel: 'View details for', projectFooterDetails: 'Details', projectFooterDetailsLabel: 'Open details for', projectDemoAction: 'Demo', projectDemoLabel: 'Open live demo for', projectExternalNewTab: 'opens in a new tab',
          cordLabel: 'Pull the cord to switch the color theme.', cordHintLine1: 'Pull the', cordHintLine2: 'cord!',
          cordHelp: 'Pull down or press Enter or Space to switch the color theme.',
          cordActivated: 'Theme changed.'
        },
        es: {
          footerNavigation: 'Navegación del pie de página', footerAbout: 'Sobre mí', footerContact: 'Contacto', footerRights: 'Todos los derechos reservados.', footerEmailLabel: 'Redactar en Gmail (se abre en una pestaña nueva)', footerEmailSubject: 'Contacto desde el portafolio',
          pageTitle: 'Luis Peche — Proyectos', primaryNavigation: 'Navegación principal', brandHome: 'Inicio de Luis Peche', sections: 'Secciones',
          navHome: 'Inicio', navProjects: 'Proyectos', navSkills: 'Habilidades', navAbout: 'Sobre mí', menu: 'Menú', menuLabel: 'Alternar menú de navegación',
          socialProfiles: 'Perfiles sociales', chooseLanguage: 'Elegir idioma', themeToggle: 'Tema', themeToggleLabel: 'Alternar tema de color', githubLabel: 'Perfil de GitHub (se abre en una pestaña nueva)',
          linkedinLabel: 'Perfil de LinkedIn (se abre en una pestaña nueva)', languageSpanish: 'Cambiar el idioma a español', languageEnglish: 'Cambiar el idioma a inglés',
          heroName: 'Luis Peche', heroRole: 'Desarrollador Backend & IA Generativa', heroRoleBadge: 'ESPECIALISTA BACKEND JAVA E IA',
          heroSummary: 'Desarrollo microservicios e integraciones con Java, Spring Boot y SQL Server, y agentes de IA generativa con Python. Cuento con más de 2 años de experiencia en el sector bancario, trabajando también con servicios de AWS y Salesforce Marketing Cloud',
          stackTitle: 'Stack tecnológico', techStack: 'Stack tecnológico', techJava: 'Java', techPython: 'Python', techSpringBoot: 'Spring Boot', techAws: 'AWS', techGenerativeAi: 'IA generativa', techMarketingCloud: 'Marketing Cloud', techDocker: 'Docker', techSqlServer: 'SQL Server',
          bankExperienceTitle: 'Más de 2 años en el sector bancario', bankExperienceSummary: 'Desarrollo de soluciones backend, microservicios e integraciones para procesos bancarios', certificationsTitle: 'Certificaciones', certificationListLabel: 'Ejemplos de certificaciones AWS', certificationViewLabel: 'Ver credencial', certificationNewTabLabel: 'se abre en una pestaña nueva', certificationPendingLabel: 'Falta la URL de Credly', confirmedProfileDetails: 'Datos confirmados del perfil',
          knowMe: 'Conóceme', downloadCV: 'Descargar CV', portraitAlt: 'Retrato de Luis Peche', photoBadgesLabel: 'Datos confirmados de la foto', photoCardTitle: 'Backend & Cloud', photoCardSummary: 'Microservicios · AWS · IA generativa',
          aboutEyebrow: 'TRAYECTORIA PROFESIONAL Y ACADÉMICA', aboutTitle: 'Mi trayectoria', aboutSubtitle: 'Mi experiencia profesional y formación en desarrollo de software, tecnología y soluciones para el sector bancario', projectsEyebrow: 'PROYECTOS', skillsEyebrow: 'STACK TECNOLÓGICO Y HERRAMIENTAS', aboutFiltersLabel: 'Filtrar trayectoria', aboutTimelineLabel: 'Trayectoria profesional y académica', aboutFilterAll: 'Toda la trayectoria', aboutFilterExperience: 'Experiencia', aboutFilterEducation: 'Formación', aboutCategoryExperience: 'Experiencia', aboutCategoryEducation: 'Educación', aboutCategoryCertification: 'Certificación', aboutCertificateAction: 'Ver certificado', aboutDocumentAction: 'Ver documento', aboutStatusAll: 'Se muestran {count} registros de trayectoria', aboutStatusExperience: 'Se muestran {count} registros de experiencia', aboutStatusEducation: 'Se muestran {count} registros de formación', aboutDateNoCountry: 'nov. 2023 — actualidad', aboutDateDataAnalytics: 'sep. 2023 — nov. 2023', aboutDateZephyr: 'ago. 2023 — actualidad', aboutDateAlura: 'may. 2023 — sep. 2023', aboutDateIbague: 'abr. 2023 — jun. 2023', aboutDateJavaDeveloper: 'feb. 2022 — mar. 2022', aboutDateJavaProgrammer: 'oct. 2021 — nov. 2021', aboutDateAws: 'mar. 2021', aboutDateHospital: 'may. 2019 — nov. 2019', aboutDateSystemsEngineering: 'dic. 2016 — abr. 2022', aboutTitleNoCountry: 'Backend Developer', aboutTitleZephyr: 'Freelance Programmer', aboutTitleHospital: 'Unidad de Informática', aboutTitleDataAnalytics: 'Bootcamp Data Analytics', aboutTitleAlura: 'Especialización Java y Spring Boot - Alura', aboutTitleIbague: 'Java y Spring Boot - Avanzado', aboutTitleJavaDeveloper: 'Java Developer', aboutTitleJavaProgrammer: 'Java Programmer', aboutTitleSystemsEngineering: 'Ingeniería de Sistemas', aboutDescriptionNoCountry: 'Participación en el desarrollo backend de la billetera digital “Cashier” con arquitectura REST en capas, patrones de diseño y buenas prácticas.', aboutDescriptionZephyr: 'Servicio de chatbot que gestiona inicialmente el proceso de venta de comida rápida y podría adaptarse a otros procesos comerciales.', aboutDescriptionHospital: 'Gestión de consultas MSSQL Server para citas médicas, reportes de Power BI y el sistema GALENHOS; además, desarrollo de una aplicación Java de escritorio según las necesidades del personal.', aboutDescriptionDataAnalytics: 'Formación práctica en análisis de datos con Python, Microsoft SQL Server y Power BI.', aboutDescriptionAlura: 'Desarrollo de APIs REST con arquitectura en capas según el modelo de madurez de Richardson y trabajo con bases de datos MySQL.', aboutDescriptionIbague: 'Desarrollo de APIs REST por capas, principios de madurez de Richardson, administración de PostgreSQL y uso de Spring Data, Spring Security, OpenAPI, Postman, Lombok y Spring Boot.', aboutDescriptionJavaDeveloper: 'El curso abordó librerías Java, frameworks, buenas prácticas y patrones de diseño para aplicaciones web.', aboutDescriptionJavaProgrammer: 'Desarrollo de componentes con Java SE y Jakarta EE, y preparación para el examen Oracle Java 11 Developer (1Z0-819).', aboutDescriptionAws: 'Curso introductorio de AWS sobre fundamentos de nube, buenas prácticas y navegación por la consola.', aboutDescriptionSystemsEngineering: 'Actualmente soy bachiller en Ingeniería de Sistemas.', aboutTagLayeredArchitecture: 'Arquitectura en capas', aboutTagDesignPatterns: 'Patrones de diseño', aboutTagGoodPractices: 'Buenas prácticas', aboutTagRichardson: 'Modelo de madurez de Richardson', aboutTagOracleExam: 'Preparación para el examen Oracle Java 11 Developer', navContact: 'Contacto',
          contactTitle: 'Contáctame', contactIntro: 'Contame qué estás desarrollando o escribime por uno de los canales directos.',
          contactAsideLabel: 'Canales directos y áreas de especialización', contactChannelsTitle: 'Canales directos', contactChannelsIntro: 'Escribime por email o visitá mis perfiles profesionales.', contactChannelsLabel: 'Canales de contacto',
          contactEmailLabel: 'Email', contactEmailValue: 'Redactar en Gmail', contactLinkedInLabel: 'LinkedIn', contactLinkedInValue: 'Ver perfil', contactGitHubLabel: 'GitHub', contactGitHubValue: 'Ver perfil', contactExternalNotice: 'se abre en una pestaña nueva',
          contactFocusTitle: 'Áreas de especialización', contactFocusListLabel: 'Áreas de especialización',
          contactFormTitle: 'Enviar un mensaje', contactFormIntro: 'Todos los campos son obligatorios.', contactName: 'Nombre', contactNameHelp: '¿Cómo querés que te llame?', contactEmail: 'Correo electrónico', contactEmailHelp: 'Voy a usar este correo para responderte.', contactMessage: 'Mensaje', contactMessageHelp: 'Contame brevemente en qué estás trabajando.', contactMessageLimit: 'Máximo 1500 caracteres.', contactSend: 'Enviar mensaje', contactSending: 'Enviando…', contactNameRequired: 'Escribí tu nombre.', contactEmailRequired: 'Escribí tu correo electrónico.', contactEmailInvalid: 'Ingresá un correo electrónico válido.', contactMessageRequired: 'Escribí tu mensaje.', contactSuccess: 'Tu mensaje se envió correctamente.', contactFailure: 'No se pudo enviar tu mensaje. Probá de nuevo o escribime por email.', contactUnavailable: 'El envío automático no está disponible. Podés escribirme directamente por email.',
          projectsTitle: 'Lo que construyo', projectsIntro: 'Proyectos seleccionados de mi portafolio', skillsTitle: 'Herramientas detrás del trabajo', skillsIntro: 'Tecnologías documentadas en mis proyectos y perfil', skillsFilterAll: 'Todas', skillsCarouselLabel: 'Carrusel de tecnologías', skillsFiltersLabel: 'Filtrar tecnologías por categoría', skillsTrackLabel: 'Tarjetas de tecnologías', skillsHelp: 'Usá los controles de flecha, el teclado o deslizá para recorrer.', skillsCategoryLanguages: 'Lenguajes', skillsCategoryFrameworks: 'Frameworks y APIs', skillsCategoryData: 'Datos', skillsCategorySecurity: 'Seguridad', skillsCategoryCloud: 'Nube y herramientas', skillsPrevious: 'Tecnologías anteriores', skillsNext: 'Tecnologías siguientes', skillsPause: 'Pausar desplazamiento automático', skillsResume: 'Reanudar desplazamiento automático', skillsRestart: 'Reiniciar desplazamiento automático', skillsPauseLabel: 'Pausar', skillsResumeLabel: 'Reanudar', skillsRestartLabel: 'Reiniciar', skillsStatusRunning: 'Desplazamiento automático activo', skillsStatusPaused: 'Desplazamiento automático pausado', skillsStatusReduced: 'Pausado por movimiento reducido', skillsStatusEnd: 'Fin de la lista', skillsSlideRole: 'diapositiva', skillsSlideLabel: '{name}, {position} de {total}', technologies: 'Tecnologías', projectDetailsAction: 'Detalles', projectDetailsLabel: 'Ver detalles de', projectFooterDetails: 'Detalles', projectFooterDetailsLabel: 'Ver detalles de', projectDemoAction: 'Demo', projectDemoLabel: 'Abrir demo de', projectExternalNewTab: 'se abre en una pestaña nueva',
          cordLabel: 'Tira del cordón para cambiar el tema de color.', cordHintLine1: '¡Tira del', cordHintLine2: 'cordón!',
          cordHelp: 'Tira hacia abajo o pulsa Enter o Espacio para cambiar el tema de color.',
          cordActivated: 'Tema cambiado.'
        }
      };
      const portfolioConfig = {
        photoBadges: {
          availability: null,
          location: null,
          specialty: { confirmed: true, kind: 'specialty', position: 'bottom-right', label: { en: 'Backend developer', es: 'Desarrollador backend' } }
        },
        certifications: [
          { id: 'aws-cloud-practitioner', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', level: 'Foundational', badgePath: 'assets/icon/cloud-practitioner.png', validationUrl: null },
          { id: 'aws-ai-practitioner', name: 'AWS Certified AI Practitioner', issuer: 'Amazon Web Services', level: 'Foundational', badgePath: 'assets/icon/ai-practitioner.png', validationUrl: 'https://www.credly.com/badges/139dafc0-fbbb-4bd1-a3ee-2d9e89107414/public_url' }
        ],
        projects: [
          { id: 'ai-assistant', title: 'AI Assistant', image: 'assets/img/tech/spring-ai.jpg', href: 'project-page-5.html', demoUrl: null, description: { en: 'Specialist in creating AI agents with Spring AI, implementing RAG architectures for intelligent responses, and deploying MCP (Model Context Protocol) servers for standard integration with LLMs.', es: 'Especialista en creación de agentes de IA con Spring AI, implementación de arquitecturas RAG para respuestas inteligentes y despliegue de servidores MCP (Model Context Protocol) para integración estándar con LLMs.' }, technologies: ['Java 17', 'Spring Boot'] },
          { id: 'zephyr-cygnus', title: 'Zephyr Cygnus', image: 'assets/img/tech/zephyr.png', href: 'project-page.html', demoUrl: 'https://youtube.com/shorts/Y6HE0hWtwjQ?feature=share', description: { en: 'We want to offer you not just an ordering tool, but a digital companion that understands your preferences and makes every meal an easy and delicious experience.', es: 'Queremos ofrecerle no solo una herramienta para realizar pedidos, sino un compañero digital que comprenda sus preferencias y haga de cada comida una experiencia fácil y deliciosa.' }, technologies: ['Java 17', 'Spring Boot', 'PostgreSQL', 'Node.js 18', 'Baileys', 'WhatsApp Business'] },
          { id: 'trucking', title: 'Trucking', image: 'assets/img/tech/trucking.png', href: 'project-page-3.html', demoUrl: 'https://youtu.be/UziTMfvcI_I?si=1UnvCDU5zI0jnLUk', description: { en: 'A powerful web application that was developed for the efficient management of vehicle fleets. It has Chatbot for better control and decision making', es: 'Una potente aplicación web que se desarrollo para la gestión eficiente de flotas de vehículos. Cuenta con Chatbot para un mejor control y toma de decisión' }, technologies: ['Java 17', 'Spring Boot', 'MySQL', 'React', 'Baileys', 'Docker'] },
          { id: 'maipevi-bot', title: 'Maipevi Bot', image: 'assets/img/tech/maipevi.png', href: 'project-page-4.html', demoUrl: 'https://youtube.com/shorts/dmyQ0JASXjg?feature=share', description: { en: 'Chatbot for managing vehicle fleets, has a control panel for managing vehicles and drivers. All this within WhatsApp Mobile.', es: 'Chatbot para la gestión de flotas de vehiculos, cuenta con un panel de control para la gestión de los vehiculos y conductores. Todo esto dentro de WhatsApp Móvil.' }, technologies: ['Java 17', 'Spring Boot', 'MySQL', 'Node.js', 'Baileys', 'WhatsApp Business'] },
          { id: 'cashier', title: 'Digital Wallet "Cashier"', image: 'assets/img/nature/Banner.png', href: 'project-page-2.html', demoUrl: 'https://youtu.be/HhMpTuKcwdA?si=xswrr048GnvEkTyE', description: { en: 'Cashier is a digital wallet designed to be your Passport to the Modern Financial World. What are you waiting for to be part of this initiative.', es: 'Cashier es una billetera digital diseñada para ser su pasaporte al mundo financiero moderno. Que esperas para ser parte de esta iniciativa.' }, technologies: ['Java 17', 'Spring Boot', 'PostgreSQL', 'Angular', 'JWT', 'Docker'] },
          { id: 'devbot-supermarket', title: 'DevBot Supermarket', image: 'assets/img/tech/devbot.png', href: 'project-page-1.html', demoUrl: null, description: { en: 'The main objective of this initiative is to provide users with a tool that allows them to quickly compare prices of different products. This makes it easier for them to make informed decisions when making their purchases.', es: 'El principal objetivo de esta iniciativa es proporcionar a los usuarios una herramienta que les permita comparar rápidamente precios de diferentes productos. Esto les facilita tomar decisiones informadas al realizar sus compras.' }, technologies: ['Python', 'Selenium Grid', 'Node.js', 'Google Cloud Platform', 'Dialogflow', 'MongoDB'] }
        ]
      };
      const root = document.documentElement;
      const all = (selector) => Array.from(document.querySelectorAll(selector));
      const certificationList = document.getElementById('certification-list');
      const certificationIssuer = document.getElementById('certification-issuer');
      const projectList = document.getElementById('project-list');
      const skillsSection = document.getElementById('skills');
      const aboutSection = document.getElementById('about');
      const aboutFilters = aboutSection?.querySelector('[data-about-filters]');
      const aboutTimeline = aboutSection?.querySelector('[data-about-timeline]');
      const aboutRecords = aboutTimeline ? Array.from(aboutTimeline.querySelectorAll('[data-about-record]')) : [];
      const aboutFilterButtons = aboutFilters ? Array.from(aboutFilters.querySelectorAll('[data-about-filter]')) : [];
      const aboutFilterStatus = aboutSection?.querySelector('[data-about-filter-status]');
      const skillsFilters = skillsSection?.querySelector('[data-skills-filters]');
      const skillsTrack = skillsSection?.querySelector('[data-skills-track]');
      const skillsSlides = skillsTrack ? Array.from(skillsTrack.querySelectorAll('[data-skill-id]')) : [];
      const skillsStatus = skillsSection?.querySelector('[data-skills-status]');
      const skillsStatusText = skillsSection?.querySelector('[data-skills-status-text]');
      const skillsPrevious = skillsSection?.querySelector('[data-skills-previous]');
      const skillsNext = skillsSection?.querySelector('[data-skills-next]');
      const skillsAutoplay = skillsSection?.querySelector('[data-skills-autoplay]');
      const skillsAutoplayLabel = skillsSection?.querySelector('[data-skills-toggle-label]');
      const skillsPauseIcon = skillsSection?.querySelector('[data-skills-pause-icon]');
      const skillsPlayIcon = skillsSection?.querySelector('[data-skills-play-icon]');
      const skillsReducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      const skillCategoryDefinitions = [
        { id: 'languages', labelKey: 'skillsCategoryLanguages' },
        { id: 'frameworks', labelKey: 'skillsCategoryFrameworks' },
        { id: 'data', labelKey: 'skillsCategoryData' },
        { id: 'security', labelKey: 'skillsCategorySecurity' },
        { id: 'cloud', labelKey: 'skillsCategoryCloud' }
      ];
      let currentSkillFilter = 'all';
      let currentAboutFilter = 'all';
      let skillsVisible = false;
      let skillsHovered = false;
      let skillsFocused = false;
      let skillsResumeWhileFocused = false;
      let skillsInteractionActive = false;
      let skillsInteractionTimer = 0;
      let skillsReducedMotionOptIn = false;
      let skillsAutoplayEnabled = !(skillsReducedMotionQuery?.matches ?? false);
      let skillsAutoFrame = 0;
      let skillsLastFrameTime = 0;
      let skillsAutoPosition = 0;
      let skillsDragState = null;
      const requestSkillsFrame = window.requestAnimationFrame?.bind(window) ?? ((callback) => window.setTimeout(() => callback(window.performance?.now?.() ?? Date.now()), 16));
      const cancelSkillsFrame = window.cancelAnimationFrame?.bind(window) ?? window.clearTimeout.bind(window);
      let certificationsRendered = false;
      function renderCertifications(language) {
        if (!certificationList || certificationsRendered) return;
        const rows = portfolioConfig.certifications.map((item) => {
          const row = document.createElement('li');
          const card = document.createElement('article');
          card.className = 'certification-card';
          card.dataset.ui = 'certification-example';
          card.dataset.reveal = '';
          const copy = document.createElement('div');
          copy.className = 'certification-copy';
          const title = document.createElement('h3');
          title.id = `certification-title-${item.id}`;
          title.textContent = item.name;
          const meta = document.createElement('div');
          meta.className = 'certification-meta';
          const level = document.createElement('span');
          level.className = 'certification-level';
          level.textContent = item.level;
          meta.appendChild(level);
          copy.append(title, meta);
          if (item.validationUrl) {
            const link = document.createElement('a');
            link.className = 'certification-link';
            link.href = item.validationUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            const labelId = `certification-link-label-${item.id}`;
            const newTabId = `certification-link-new-tab-${item.id}`;
            link.setAttribute('aria-labelledby', `${title.id} ${labelId} ${newTabId}`);
            const linkLabel = document.createElement('span');
            linkLabel.id = labelId;
            linkLabel.dataset.i18n = 'certificationViewLabel';
            linkLabel.textContent = messages[language].certificationViewLabel;
            const arrow = document.createElement('span');
            arrow.className = 'certification-link-arrow';
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '↗';
            const newTabLabel = document.createElement('span');
            newTabLabel.id = newTabId;
            newTabLabel.className = 'sr-only';
            newTabLabel.dataset.i18n = 'certificationNewTabLabel';
            newTabLabel.textContent = messages[language].certificationNewTabLabel;
            link.append(linkLabel, arrow, newTabLabel);
            copy.appendChild(link);
          } else {
            const pending = document.createElement('p');
            pending.className = 'certification-pending';
            pending.dataset.i18n = 'certificationPendingLabel';
            pending.textContent = messages[language].certificationPendingLabel;
            copy.appendChild(pending);
          }
          const badge = document.createElement('img');
          badge.className = 'certification-badge';
          badge.width = 56;
          badge.height = 56;
          badge.alt = '';
          badge.loading = 'lazy';
          badge.decoding = 'async';
          badge.src = item.badgePath;
          card.append(copy, badge);
          row.appendChild(card);
          return row;
        });
        certificationList.replaceChildren(...rows);
        if (certificationIssuer) {
          certificationIssuer.textContent = Array.from(new Set(portfolioConfig.certifications.map((item) => item.issuer))).join(' · ');
        }
        certificationsRendered = true;
      }
      function renderProjects(language) {
        if (!projectList) return;
        projectList.replaceChildren(...portfolioConfig.projects.map((project) => {
          const card = document.createElement('article');
          card.className = 'project-card';
          card.dataset.projectId = project.id;
          const media = document.createElement('a');
          media.className = 'project-media';
          media.href = project.href;
          media.setAttribute('aria-label', `${messages[language].projectDetailsLabel} ${project.title}`);
          const image = document.createElement('img');
          image.src = project.image;
          image.alt = '';
          image.loading = 'lazy';
          image.decoding = 'async';
          const overlay = document.createElement('span');
          overlay.className = 'project-media-overlay';
          overlay.setAttribute('aria-hidden', 'true');
          const action = document.createElement('span');
          action.className = 'project-view-action';
          const eyeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          eyeIcon.setAttribute('class', 'project-eye-icon');
          eyeIcon.setAttribute('viewBox', '0 0 24 24');
          eyeIcon.setAttribute('fill', 'none');
          eyeIcon.setAttribute('stroke', 'currentColor');
          eyeIcon.setAttribute('stroke-width', '2');
          eyeIcon.setAttribute('stroke-linecap', 'round');
          eyeIcon.setAttribute('stroke-linejoin', 'round');
          eyeIcon.setAttribute('aria-hidden', 'true');
          eyeIcon.setAttribute('focusable', 'false');
          // Eye geometry reuses the existing local assets/icon/eye.svg.
          const eyePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          eyePath.setAttribute('d', 'M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0');
          const eyeIris = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          eyeIris.setAttribute('cx', '12');
          eyeIris.setAttribute('cy', '12');
          eyeIris.setAttribute('r', '3');
          eyeIcon.append(eyePath, eyeIris);
          const actionText = document.createElement('span');
          actionText.textContent = messages[language].projectDetailsAction;
          action.append(eyeIcon, actionText);
          overlay.appendChild(action);
          const copy = document.createElement('div');
          copy.className = 'project-copy';
          const title = document.createElement('h3');
          title.id = `project-title-${project.id}`;
          const titleLink = document.createElement('a');
          titleLink.href = project.href;
          titleLink.textContent = project.title;
          title.appendChild(titleLink);
          const description = document.createElement('p');
          description.textContent = project.description[language];
          const technologies = document.createElement('ul');
          technologies.className = 'tech-list';
          technologies.setAttribute('aria-label', messages[language].technologies);
          project.technologies.forEach((technology) => {
            const tag = document.createElement('li');
            tag.textContent = technology;
            technologies.appendChild(tag);
          });
          copy.append(title, description, technologies);
          const footer = document.createElement('div');
          footer.className = 'project-card-footer';
          const detailsLink = document.createElement('a');
          detailsLink.className = 'project-details-link';
          detailsLink.href = project.href;
          detailsLink.dataset.projectAction = 'details';
          detailsLink.setAttribute('aria-label', `${messages[language].projectFooterDetailsLabel} ${project.title}`);
          const detailsText = document.createElement('span');
          detailsText.textContent = messages[language].projectFooterDetails;
          const detailsArrow = document.createElement('span');
          detailsArrow.setAttribute('aria-hidden', 'true');
          detailsArrow.textContent = ' ↗';
          detailsLink.append(detailsText, detailsArrow);
          footer.appendChild(detailsLink);
          if (project.demoUrl) {
            const externalActions = document.createElement('div');
            externalActions.className = 'project-card-external-actions';
            const demoLink = document.createElement('a');
            demoLink.className = 'project-demo-link';
            demoLink.href = project.demoUrl;
            demoLink.target = '_blank';
            demoLink.rel = 'noopener noreferrer';
            demoLink.dataset.projectAction = 'demo';
            demoLink.setAttribute('aria-label', `${messages[language].projectDemoLabel} ${project.title} (${messages[language].projectExternalNewTab})`);
            demoLink.textContent = messages[language].projectDemoAction;
            externalActions.appendChild(demoLink);
            footer.appendChild(externalActions);
          }
          copy.appendChild(footer);
          media.append(image, overlay);
          card.append(media, copy);
          card.setAttribute('aria-labelledby', title.id);
          return card;
        }));
      }
      function renderProofBadges(language) {
        const list = document.getElementById('proof-badges');
        if (!list) return;
        const confirmed = Object.values(portfolioConfig.photoBadges).filter((item) => item?.confirmed && item.label?.[language]);
        list.replaceChildren(...confirmed.map((item) => {
          const badge = document.createElement('li');
          badge.className = 'profile-badge';
          badge.dataset.kind = item.kind;
          badge.dataset.position = item.position;
          badge.textContent = item.label[language];
          return badge;
        }));
        list.hidden = confirmed.length === 0;
      }
      let currentLanguage = 'en';
      try {
        const savedLanguage = window.localStorage.getItem('language');
        if (Object.prototype.hasOwnProperty.call(messages, savedLanguage)) currentLanguage = savedLanguage;
      } catch {}

      function applyLanguage(language, persist = true) {
        const dictionary = messages[language];
        if (!dictionary) return false;
        currentLanguage = language;
        root.lang = language;
        renderCertifications(language);
        renderProjects(language);
        all('[data-i18n]').forEach((element) => {
          const value = dictionary[element.dataset.i18n];
          if (typeof value === 'string') element.textContent = value;
        });
        all('[data-i18n-aria-label]').forEach((element) => {
          const value = dictionary[element.dataset.i18nAriaLabel];
          if (typeof value === 'string') element.setAttribute('aria-label', value);
        });
        all('[data-i18n-alt]').forEach((element) => {
          const value = dictionary[element.dataset.i18nAlt];
          if (typeof value === 'string') element.setAttribute('alt', value);
        });
        all('[data-language]').forEach((button) => {
          button.setAttribute('aria-pressed', String(button.dataset.language === language));
        });
        const footerYear = document.querySelector('[data-footer-year]');
        if (footerYear) footerYear.textContent = String(new Date().getFullYear());
        const footerMail = document.querySelector('[data-footer-mail]');
        if (footerMail) {
          const composeUrl = new URL(footerMail.href);
          composeUrl.searchParams.set('su', dictionary.footerEmailSubject);
          footerMail.href = composeUrl.href;
        }
        renderProofBadges(language);
        applySkillsLanguage(language);
        if (persist) {
          try { window.localStorage.setItem('language', language); } catch {}
        }
        return true;
      }
      function renderSkillsFilters(language) {
        if (!skillsFilters) return;
        const dictionary = messages[language];
        const categories = skillCategoryDefinitions.filter(({ id }) => skillsSlides.some((slide) => slide.dataset.skillCategory === id));
        const options = [
          { id: 'all', labelKey: 'skillsFilterAll', count: skillsSlides.length },
          ...categories.map(({ id, labelKey }) => ({
            id,
            labelKey,
            count: skillsSlides.filter((slide) => slide.dataset.skillCategory === id).length
          }))
        ];
        skillsFilters.replaceChildren(...options.map((option) => {
          const button = document.createElement('button');
          button.className = 'skills-filter';
          button.type = 'button';
          button.dataset.filterValue = option.id;
          button.setAttribute('aria-controls', 'skills-track');
          button.setAttribute('aria-pressed', String(option.id === currentSkillFilter));
          const label = document.createElement('span');
          label.textContent = dictionary[option.labelKey];
          const count = document.createElement('span');
          count.className = 'skills-filter-count';
          count.textContent = `(${option.count})`;
          button.append(label, count);
          button.addEventListener('click', () => applySkillsFilter(option.id));
          return button;
        }));
      }
      function updateSkillsSlideLabels(language) {
        const dictionary = messages[language];
        const visibleSlides = skillsSlides.filter((slide) => !slide.hidden);
        skillsSlides.forEach((slide) => {
          const name = slide.querySelector('[data-skill-copy]')?.textContent.trim() ?? slide.dataset.skillId;
          slide.setAttribute('aria-roledescription', dictionary.skillsSlideRole);
          if (slide.hidden) return;
          const label = dictionary.skillsSlideLabel
            .replace('{name}', name)
            .replace('{position}', String(visibleSlides.indexOf(slide) + 1))
            .replace('{total}', String(visibleSlides.length));
          if (slide.getAttribute('aria-label') !== label) slide.setAttribute('aria-label', label);
        });
      }
      function applySkillsFilter(filterId, resetTrack = true) {
        const exists = filterId === 'all' || skillsSlides.some((slide) => slide.dataset.skillCategory === filterId);
        currentSkillFilter = exists ? filterId : 'all';
        skillsSlides.forEach((slide) => {
          slide.hidden = currentSkillFilter !== 'all' && slide.dataset.skillCategory !== currentSkillFilter;
        });
        skillsFilters?.querySelectorAll('[data-filter-value]').forEach((button) => {
          button.setAttribute('aria-pressed', String(button.dataset.filterValue === currentSkillFilter));
        });
        updateSkillsSlideLabels(currentLanguage);
        if (resetTrack && skillsTrack) {
          skillsTrack.scrollTo({ left: 0, behavior: 'auto' });
          skillsAutoPosition = 0;
        }
        syncSkillsAutoplay();
      }
      function applySkillsLanguage(language) {
        if (!skillsSlides.length) return;
        skillsSlides.forEach((slide) => {
          slide.querySelectorAll('[data-skill-copy]').forEach((field) => {
            const value = field.dataset[language];
            if (typeof value === 'string') field.textContent = value;
          });
          const category = slide.querySelector('.skills-category');
          const definition = skillCategoryDefinitions.find(({ id }) => id === slide.dataset.skillCategory);
          if (category && definition) category.textContent = messages[language][definition.labelKey];
        });
        renderSkillsFilters(language);
        updateSkillsSlideLabels(language);
        updateSkillsCarouselControls();
      }
      function getSkillsMaxScroll() {
        return skillsTrack ? Math.max(0, skillsTrack.scrollWidth - skillsTrack.clientWidth) : 0;
      }
      function hasSkillsOverflow() {
        return getSkillsMaxScroll() > 1;
      }
      function isSkillsAtEnd() {
        const maxScroll = getSkillsMaxScroll();
        return maxScroll > 1 && skillsTrack.scrollLeft >= maxScroll - 1;
      }
      function canAutoScrollSkills() {
        return Boolean(
          skillsTrack && skillsAutoplayEnabled && hasSkillsOverflow() && skillsVisible && !document.hidden &&
          !skillsHovered && !skillsInteractionActive && (!skillsFocused || skillsResumeWhileFocused) &&
          (!(skillsReducedMotionQuery?.matches ?? false) || skillsReducedMotionOptIn) && !isSkillsAtEnd()
        );
      }
      function updateSkillsCarouselControls() {
        if (!skillsTrack) return;
        const dictionary = messages[currentLanguage];
        const maxScroll = getSkillsMaxScroll();
        const overflow = maxScroll > 1;
        const atEnd = overflow && skillsTrack.scrollLeft >= maxScroll - 1;
        const running = canAutoScrollSkills();
        if (skillsPrevious) skillsPrevious.disabled = !overflow || skillsTrack.scrollLeft <= 1;
        if (skillsNext) skillsNext.disabled = !overflow || atEnd;
        if (skillsAutoplay) {
          skillsAutoplay.disabled = !overflow;
          const labelKey = atEnd && !skillsAutoplayEnabled ? 'skillsRestart' : skillsAutoplayEnabled ? 'skillsPause' : 'skillsResume';
          const textKey = atEnd && !skillsAutoplayEnabled ? 'skillsRestartLabel' : skillsAutoplayEnabled ? 'skillsPauseLabel' : 'skillsResumeLabel';
          const label = dictionary[labelKey];
          const text = dictionary[textKey];
          if (skillsAutoplay.getAttribute('aria-label') !== label) skillsAutoplay.setAttribute('aria-label', label);
          if (skillsAutoplayLabel && skillsAutoplayLabel.textContent !== text) skillsAutoplayLabel.textContent = text;
          if (skillsPauseIcon) skillsPauseIcon.toggleAttribute('hidden', labelKey !== 'skillsPause');
          if (skillsPlayIcon) skillsPlayIcon.toggleAttribute('hidden', labelKey === 'skillsPause');
        }
        if (skillsStatus && skillsStatusText) {
          let statusKey = running ? 'skillsStatusRunning' : 'skillsStatusPaused';
          if (skillsReducedMotionQuery?.matches && !skillsReducedMotionOptIn) statusKey = 'skillsStatusReduced';
          else if (atEnd && !skillsAutoplayEnabled) statusKey = 'skillsStatusEnd';
          skillsStatus.dataset.state = running ? 'running' : 'paused';
          const status = dictionary[statusKey];
          if (skillsStatusText.textContent !== status) skillsStatusText.textContent = status;
        }
      }
      function runSkillsAutoFrame(timestamp) {
        skillsAutoFrame = 0;
        if (!canAutoScrollSkills()) {
          skillsLastFrameTime = 0;
          updateSkillsCarouselControls();
          return;
        }
        if (!skillsLastFrameTime) {
          skillsLastFrameTime = timestamp;
          skillsAutoPosition = skillsTrack.scrollLeft;
        }
        const elapsed = Math.min(48, Math.max(0, timestamp - skillsLastFrameTime));
        skillsLastFrameTime = timestamp;
        const maxScroll = getSkillsMaxScroll();
        const nextScroll = skillsAutoPosition + elapsed * 22 / 1000;
        if (nextScroll >= maxScroll - 1) {
          skillsAutoPosition = maxScroll;
          skillsTrack.scrollLeft = maxScroll;
          skillsAutoplayEnabled = false;
          skillsLastFrameTime = 0;
          updateSkillsCarouselControls();
          return;
        }
        skillsAutoPosition = nextScroll;
        skillsTrack.scrollLeft = skillsAutoPosition;
        updateSkillsCarouselControls();
        skillsAutoFrame = requestSkillsFrame(runSkillsAutoFrame);
      }
      function syncSkillsAutoplay() {
        const shouldRun = canAutoScrollSkills();
        if (shouldRun && !skillsAutoFrame) {
          skillsLastFrameTime = 0;
          skillsAutoPosition = skillsTrack.scrollLeft;
          skillsAutoFrame = requestSkillsFrame(runSkillsAutoFrame);
        } else if (!shouldRun && skillsAutoFrame) {
          cancelSkillsFrame(skillsAutoFrame);
          skillsAutoFrame = 0;
          skillsLastFrameTime = 0;
          skillsAutoPosition = skillsTrack.scrollLeft;
        }
        updateSkillsCarouselControls();
      }
      function scrollSkillsBy(direction) {
        if (!skillsTrack) return;
        const firstVisible = skillsSlides.find((slide) => !slide.hidden);
        const cardWidth = firstVisible?.getBoundingClientRect().width ?? skillsTrack.clientWidth;
        const gap = Number.parseFloat(window.getComputedStyle(skillsTrack).columnGap) || 0;
        skillsTrack.scrollBy({ left: direction * Math.max(1, cardWidth + gap), behavior: skillsReducedMotionQuery?.matches ? 'auto' : 'smooth' });
      }
      function beginSkillsInteraction() {
        if (!skillsInteractionActive) skillsInteractionActive = true;
        if (skillsInteractionTimer) window.clearTimeout(skillsInteractionTimer);
        syncSkillsAutoplay();
      }
      function finishSkillsInteraction() {
        if (!skillsInteractionActive) return;
        if (skillsInteractionTimer) window.clearTimeout(skillsInteractionTimer);
        skillsInteractionTimer = window.setTimeout(() => {
          skillsInteractionTimer = 0;
          skillsInteractionActive = false;
          syncSkillsAutoplay();
        }, 450);
      }
      function applyAboutFilter(filterId, keepFocus = false) {
        const allowed = new Set(['all', 'experience', 'education']);
        currentAboutFilter = allowed.has(filterId) ? filterId : 'all';
        aboutRecords.forEach((record) => {
          record.hidden = currentAboutFilter !== 'all' && record.dataset.aboutGroup !== currentAboutFilter;
        });
        const selectedButton = aboutFilterButtons.find((button) => button.dataset.aboutFilter === currentAboutFilter);
        aboutFilterButtons.forEach((button) => {
          button.setAttribute('aria-pressed', String(button === selectedButton));
        });
        const visibleCount = aboutRecords.filter((record) => !record.hidden).length;
        const statusKey = currentAboutFilter === 'experience' ? 'aboutStatusExperience' : currentAboutFilter === 'education' ? 'aboutStatusEducation' : 'aboutStatusAll';
        if (aboutFilterStatus) aboutFilterStatus.textContent = messages[currentLanguage][statusKey].replace('{count}', String(visibleCount));
        if (keepFocus) selectedButton?.focus({ preventScroll: true });
      }
      function initializeAboutTimeline() {
        if (!aboutSection || !aboutTimeline || !aboutRecords.length || !aboutFilters) return;
        const counts = {
          all: aboutRecords.length,
          experience: aboutRecords.filter((record) => record.dataset.aboutGroup === 'experience').length,
          education: aboutRecords.filter((record) => record.dataset.aboutGroup === 'education').length
        };
        aboutFilterButtons.forEach((button) => {
          const count = button.querySelector('[data-about-count]');
          if (count) count.textContent = String(counts[button.dataset.aboutFilter] ?? 0);
          button.addEventListener('click', () => applyAboutFilter(button.dataset.aboutFilter, true));
        });
        aboutFilters.hidden = false;
        applyAboutFilter('all');
        if (!prefersReducedMotion() && typeof window.IntersectionObserver === 'function') {
          const timelineObserver = new window.IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add('is-entered');
              observer.unobserve(entry.target);
            });
          }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
          aboutRecords.forEach((record) => timelineObserver.observe(record));
        }
      }
      function initializeSkillsCarousel() {
        if (!skillsSection || !skillsTrack || !skillsSlides.length) return;
        renderSkillsFilters(currentLanguage);
        if (skillsFilters) skillsFilters.hidden = false;
        const controls = skillsSection.querySelector('[data-skills-controls]');
        if (controls) controls.hidden = false;
        if (skillsStatus) skillsStatus.hidden = false;
        const bounds = skillsSection.getBoundingClientRect();
        skillsVisible = bounds.bottom > 0 && bounds.top < window.innerHeight;
        skillsHovered = Boolean(window.matchMedia?.('(hover: hover) and (pointer: fine)').matches && skillsSection.matches(':hover'));
        skillsFocused = skillsSection.contains(document.activeElement);
        skillsPrevious?.addEventListener('click', () => scrollSkillsBy(-1));
        skillsNext?.addEventListener('click', () => scrollSkillsBy(1));
        skillsAutoplay?.addEventListener('click', () => {
          const atEnd = isSkillsAtEnd();
          if (skillsAutoplayEnabled) {
            skillsAutoplayEnabled = false;
            skillsResumeWhileFocused = false;
          } else {
            if (atEnd) {
              skillsTrack.scrollTo({ left: 0, behavior: skillsReducedMotionQuery?.matches ? 'auto' : 'smooth' });
              skillsAutoPosition = 0;
            }
            skillsAutoplayEnabled = true;
            if (skillsReducedMotionQuery?.matches) skillsReducedMotionOptIn = true;
            skillsResumeWhileFocused = skillsFocused;
          }
          syncSkillsAutoplay();
        });
        skillsTrack.addEventListener('scroll', () => {
          if (!skillsAutoFrame) skillsAutoPosition = skillsTrack.scrollLeft;
          if (isSkillsAtEnd() && skillsAutoplayEnabled) {
            skillsAutoplayEnabled = false;
            skillsLastFrameTime = 0;
          }
          syncSkillsAutoplay();
        }, { passive: true });
        skillsTrack.addEventListener('keydown', (event) => {
          if (event.target !== skillsTrack || event.altKey || event.ctrlKey || event.metaKey) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            scrollSkillsBy(event.key === 'ArrowRight' ? 1 : -1);
          } else if (event.key === 'Home' || event.key === 'End') {
            event.preventDefault();
            skillsTrack.scrollTo({ left: event.key === 'Home' ? 0 : getSkillsMaxScroll(), behavior: skillsReducedMotionQuery?.matches ? 'auto' : 'smooth' });
          }
        });
        skillsTrack.addEventListener('pointerdown', (event) => {
          if (event.pointerType !== 'mouse' || event.button !== 0) return;
          skillsDragState = { pointerId: event.pointerId, startX: event.clientX, startScrollLeft: skillsTrack.scrollLeft, moved: false };
          try { skillsTrack.setPointerCapture(event.pointerId); } catch {}
        });
        skillsTrack.addEventListener('pointermove', (event) => {
          if (!skillsDragState || event.pointerId !== skillsDragState.pointerId) return;
          const delta = event.clientX - skillsDragState.startX;
          if (Math.abs(delta) > 4) {
            skillsDragState.moved = true;
            skillsTrack.classList.add('is-dragging');
            event.preventDefault();
          }
          if (skillsDragState.moved) skillsTrack.scrollLeft = skillsDragState.startScrollLeft - delta;
        });
        const endSkillsDrag = (event) => {
          if (!skillsDragState || event.pointerId !== skillsDragState.pointerId) return;
          skillsTrack.classList.remove('is-dragging');
          try { if (skillsTrack.hasPointerCapture(event.pointerId)) skillsTrack.releasePointerCapture(event.pointerId); } catch {}
          skillsDragState = null;
        };
        skillsTrack.addEventListener('pointerup', endSkillsDrag);
        skillsTrack.addEventListener('pointercancel', endSkillsDrag);
        skillsTrack.addEventListener('wheel', (event) => {
          if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
          beginSkillsInteraction();
          finishSkillsInteraction();
        }, { passive: true });
        skillsSection.addEventListener('pointerenter', (event) => {
          if (event.pointerType !== 'mouse') return;
          skillsHovered = true;
          syncSkillsAutoplay();
        });
        skillsSection.addEventListener('pointerleave', (event) => {
          if (event.pointerType !== 'mouse') return;
          skillsHovered = false;
          syncSkillsAutoplay();
        });
        skillsSection.addEventListener('pointerdown', beginSkillsInteraction);
        window.addEventListener('pointerup', finishSkillsInteraction);
        window.addEventListener('pointercancel', finishSkillsInteraction);
        skillsSection.addEventListener('focusin', () => {
          skillsFocused = true;
          skillsResumeWhileFocused = false;
          syncSkillsAutoplay();
        });
        skillsSection.addEventListener('focusout', (event) => {
          if (skillsSection.contains(event.relatedTarget)) return;
          skillsFocused = false;
          skillsResumeWhileFocused = false;
          syncSkillsAutoplay();
        });
        document.addEventListener('visibilitychange', () => syncSkillsAutoplay());
        if (typeof window.IntersectionObserver === 'function') {
          const skillsVisibilityObserver = new window.IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.target !== skillsSection) return;
              skillsVisible = entry.isIntersecting;
              syncSkillsAutoplay();
            });
          }, { threshold: 0.08 });
          skillsVisibilityObserver.observe(skillsSection);
        } else {
          skillsVisible = true;
        }
        const handleReducedMotionChange = (event) => {
          if (event.matches) {
            skillsAutoplayEnabled = false;
            skillsReducedMotionOptIn = false;
            skillsResumeWhileFocused = false;
          }
          syncSkillsAutoplay();
        };
        if (skillsReducedMotionQuery?.addEventListener) skillsReducedMotionQuery.addEventListener('change', handleReducedMotionChange);
        else skillsReducedMotionQuery?.addListener?.(handleReducedMotionChange);
        window.addEventListener('resize', () => syncSkillsAutoplay(), { passive: true });
        if (typeof window.ResizeObserver === 'function') {
          const skillsResizeObserver = new window.ResizeObserver(() => syncSkillsAutoplay());
          skillsResizeObserver.observe(skillsTrack);
        }
        updateSkillsSlideLabels(currentLanguage);
        syncSkillsAutoplay();
      }
      all('[data-language]').forEach((button) => {
        button.addEventListener('click', () => applyLanguage(button.dataset.language));
      });
      applyLanguage(currentLanguage, false);

      function initializeContactForm() {
        const form = document.querySelector('[data-contact-form]');
        if (!form) return;
        const fields = Array.from(form.querySelectorAll('[data-contact-field]'));
        const messageField = form.querySelector('#contact-message');
        const messageCounter = form.querySelector('[data-contact-counter]');
        const submitButton = form.querySelector('[data-contact-submit]');
        const submitLabel = form.querySelector('[data-contact-submit-label]');
        const status = form.querySelector('[data-contact-status]');
        const errorStatus = form.querySelector('[data-contact-error-status]');
        const unavailableStatus = form.querySelector('[data-contact-unavailable]');
        const dictionary = () => messages[currentLanguage];

        function fieldErrorKey(field) {
          const value = field.value.trim();
          if (!value) {
            if (field.name === 'name') return 'contactNameRequired';
            if (field.name === 'email') return 'contactEmailRequired';
            return 'contactMessageRequired';
          }
          if (field.type === 'email' && !field.validity.valid) return 'contactEmailInvalid';
          return '';
        }
        function setFieldError(field, key) {
          const error = document.getElementById(`${field.id}-error`);
          if (!error) return;
          if (key) {
            error.dataset.i18n = key;
            error.textContent = dictionary()[key];
            error.hidden = false;
            field.setAttribute('aria-invalid', 'true');
          } else {
            error.removeAttribute('data-i18n');
            error.textContent = '';
            error.hidden = true;
            field.removeAttribute('aria-invalid');
          }
        }
        function clearFieldErrors() {
          fields.forEach((field) => setFieldError(field, ''));
        }
        function updateMessageCounter() {
          if (!messageField || !messageCounter) return;
          messageCounter.textContent = `${messageField.value.length}/${messageField.maxLength}`;
        }
        function setStatusMessage(key) {
          if (!status) return;
          status.dataset.i18n = key;
          status.textContent = dictionary()[key];
          status.hidden = false;
        }
        function clearStatusMessage() {
          if (!status) return;
          status.hidden = true;
          status.textContent = '';
          status.removeAttribute('data-i18n');
        }
        function validateFields() {
          let firstInvalid = null;
          fields.forEach((field) => {
            const errorKey = fieldErrorKey(field);
            setFieldError(field, errorKey);
            if (errorKey && !firstInvalid) firstInvalid = field;
          });
          return firstInvalid;
        }
        function trimFieldValues() {
          fields.forEach((field) => { field.value = field.value.trim(); });
        }

        form.noValidate = true;
        form.addEventListener('submit', (event) => {
          clearStatusMessage();
          if (errorStatus) errorStatus.hidden = true;
          const firstInvalid = validateFields();
          if (firstInvalid) {
            event.preventDefault();
            event.stopImmediatePropagation();
            firstInvalid.focus();
            return;
          }
          trimFieldValues();
        }, true);
        form.addEventListener('input', (event) => {
          updateMessageCounter();
          const field = event.target;
          if (!fields.includes(field) || field.getAttribute('aria-invalid') !== 'true') return;
          setFieldError(field, fieldErrorKey(field));
        });
        form.addEventListener('reset', () => window.requestAnimationFrame(updateMessageCounter));
        updateMessageCounter();

        if (!window.Pageclip) {
          if (unavailableStatus) unavailableStatus.hidden = false;
          return;
        }
        try {
          window.Pageclip.form(form, {
            onSubmit() {
              if (errorStatus) errorStatus.hidden = true;
              if (unavailableStatus) unavailableStatus.hidden = true;
              if (submitButton) {
                submitButton.disabled = true;
                submitButton.setAttribute('aria-busy', 'true');
              }
              if (submitLabel) {
                submitLabel.dataset.i18n = 'contactSending';
                submitLabel.textContent = dictionary().contactSending;
              }
              setStatusMessage('contactSending');
            },
            onResponse(error) {
              if (submitButton) {
                submitButton.disabled = false;
                submitButton.removeAttribute('aria-busy');
              }
              if (submitLabel) {
                submitLabel.dataset.i18n = 'contactSend';
                submitLabel.textContent = dictionary().contactSend;
              }
              if (error) {
                clearStatusMessage();
                if (errorStatus) errorStatus.hidden = false;
                return false;
              }
              form.reset();
              updateMessageCounter();
              clearFieldErrors();
              if (errorStatus) errorStatus.hidden = true;
              setStatusMessage('contactSuccess');
              return true;
            }
          });
        } catch {
          if (unavailableStatus) unavailableStatus.hidden = false;
        }
      }

      initializeSkillsCarousel();
      initializeAboutTimeline();
      initializeContactForm();

      const revealTargets = all('[data-reveal]');
      if (revealTargets.length && typeof window.IntersectionObserver === 'function' && !prefersReducedMotion()) {
        const revealObserver = new window.IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const index = Number(entry.target.dataset.revealIndex || 0);
            entry.target.style.setProperty('--reveal-delay', `${index * 80}ms`);
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        revealTargets.forEach((element, index) => {
          element.dataset.revealIndex = String(index);
          revealObserver.observe(element);
        });
      }

      const themeToggle = document.querySelector('[data-theme-toggle]');
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      function syncThemeToggle() {
        const isDark = root.dataset.theme === 'dark';
        themeToggle?.setAttribute('aria-pressed', String(isDark));
        const paper = window.getComputedStyle(root).getPropertyValue('--paper').trim();
        if (paper) themeColorMeta?.setAttribute('content', paper);
      }
      function toggleTheme() {
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        try { window.localStorage.setItem('portfolio-theme', root.dataset.theme); } catch {}
        syncThemeToggle();
        return true;
      }
      themeToggle?.addEventListener('click', toggleTheme);
      syncThemeToggle();

      const menu = document.querySelector('.mobile-menu');
      const menuSummary = menu?.querySelector('summary');
      const syncMenuState = () => menuSummary?.setAttribute('aria-expanded', String(Boolean(menu?.open)));
      if (menu) {
        menu.addEventListener('toggle', syncMenuState);
        menu.addEventListener('click', (event) => {
          if (!event.target.closest?.('.mobile-links a')) return;
          menu.open = false;
          syncMenuState();
          menuSummary?.focus({ preventScroll: true });
        });
        document.addEventListener('keydown', (event) => {
          if (event.key !== 'Escape' || !menu.open) return;
          menu.open = false;
          syncMenuState();
          menuSummary?.focus({ preventScroll: true });
        });
        syncMenuState();
      }

      const navLinks = all('.nav-link[data-nav]');
      const sectionTargets = ['home', 'projects', 'skills', 'about', 'contact']
        .map((id) => ({ id, element: document.getElementById(id) }))
        .filter((target) => target.element);
      const sectionById = new Map(sectionTargets.map((target) => [target.id, target]));
      const desktopNav = document.querySelector('.desktop-nav');
      const mobileLinks = document.querySelector('.mobile-links');
      const siteHeader = document.querySelector('.site-header');
      const scrollRoot = document.scrollingElement ?? document.documentElement;
      const requestNavFrame = window.requestAnimationFrame?.bind(window) ?? ((callback) => window.setTimeout(callback, 16));
      const cancelNavFrame = window.cancelAnimationFrame?.bind(window) ?? window.clearTimeout.bind(window);
      const hasNativeScrollEnd = 'onscrollend' in document;
      const scrollKeys = new Set(['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' ', 'Tab']);
      let activeSectionId = null;
      let activeNavGroup = null;
      let pendingNavigationId = null;
      let activeFramePending = false;
      let scrollSettleFrame = 0;

      function getVisibleNavGroup() {
        return desktopNav?.getClientRects().length ? desktopNav : mobileLinks;
      }
      function setActiveSection(id) {
        if (!sectionById.has(id)) id = sectionTargets[0]?.id ?? 'home';
        const navGroup = getVisibleNavGroup();
        if (activeSectionId === id && activeNavGroup === navGroup) return;
        activeSectionId = id;
        activeNavGroup = navGroup;
        navLinks.forEach((link) => {
          const isActive = link.dataset.nav === id && navGroup?.contains(link);
          link.classList.toggle('is-active', Boolean(isActive));
          if (isActive) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
      function getActivationLine() {
        return Math.max(0, siteHeader?.getBoundingClientRect().bottom ?? 0) + 16;
      }
      function isAtDocumentEnd() {
        const maxScrollTop = Math.max(0, scrollRoot.scrollHeight - scrollRoot.clientHeight);
        return scrollRoot.scrollTop > 1 && scrollRoot.scrollTop >= maxScrollTop - 1;
      }
      function getSectionAtReferenceLine() {
        if (scrollRoot.scrollTop <= 1) return sectionTargets[0]?.id ?? 'home';
        if (isAtDocumentEnd()) return sectionTargets.at(-1)?.id ?? sectionTargets[0]?.id ?? 'home';
        const activationLine = getActivationLine();
        let activeId = sectionTargets[0]?.id ?? 'home';
        for (const target of sectionTargets) {
          if (target.element.getBoundingClientRect().top <= activationLine + 1) activeId = target.id;
          else break;
        }
        return activeId;
      }
      function updateActiveSection() {
        if (pendingNavigationId) return;
        setActiveSection(getSectionAtReferenceLine());
      }
      function scheduleActiveSection() {
        if (activeFramePending) return;
        activeFramePending = true;
        requestNavFrame(() => {
          activeFramePending = false;
          if (pendingNavigationId) {
            monitorScrollEndFallback();
            return;
          }
          updateActiveSection();
        });
      }
      function clearScrollSettleFrame() {
        if (!scrollSettleFrame) return;
        cancelNavFrame(scrollSettleFrame);
        scrollSettleFrame = 0;
      }
      function finishPendingNavigation() {
        if (!pendingNavigationId) {
          scheduleActiveSection();
          return;
        }
        pendingNavigationId = null;
        clearScrollSettleFrame();
        scheduleActiveSection();
      }
      function monitorScrollEndFallback() {
        if (hasNativeScrollEnd || !pendingNavigationId || scrollSettleFrame) return;
        let lastScrollTop = scrollRoot.scrollTop;
        let stableFrames = 0;
        const checkForSettledScroll = () => {
          if (!pendingNavigationId) {
            scrollSettleFrame = 0;
            return;
          }
          const currentScrollTop = scrollRoot.scrollTop;
          if (Math.abs(currentScrollTop - lastScrollTop) < 0.5) stableFrames += 1;
          else {
            lastScrollTop = currentScrollTop;
            stableFrames = 0;
          }
          if (stableFrames >= 4) {
            scrollSettleFrame = 0;
            finishPendingNavigation();
            return;
          }
          scrollSettleFrame = requestNavFrame(checkForSettledScroll);
        };
        scrollSettleFrame = requestNavFrame(checkForSettledScroll);
      }
      function handleNavigationClick(event, link) {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const target = sectionById.get(link.dataset.nav);
        if (!target) return;
        setActiveSection(target.id);
        const maxScrollTop = Math.max(0, scrollRoot.scrollHeight - scrollRoot.clientHeight);
        const targetDocumentTop = target.element.getBoundingClientRect().top + scrollRoot.scrollTop;
        const desiredScrollTop = Math.min(maxScrollTop, Math.max(0, targetDocumentTop - getActivationLine()));
        if (Math.abs(desiredScrollTop - scrollRoot.scrollTop) <= 1) {
          pendingNavigationId = null;
          clearScrollSettleFrame();
          scheduleActiveSection();
          return;
        }
        pendingNavigationId = target.id;
        clearScrollSettleFrame();
        monitorScrollEndFallback();
      }
      function interruptPendingNavigation(event) {
        if (!pendingNavigationId) return;
        if (event?.type === 'keydown') {
          const target = event.target;
          if (!scrollKeys.has(event.key) || event.isComposing || target?.isContentEditable || target?.closest?.('input, textarea, select, [contenteditable="true"]')) return;
        }
        const previousScrollBehavior = scrollRoot.style.scrollBehavior;
        scrollRoot.style.scrollBehavior = 'auto';
        window.scrollTo({ top: scrollRoot.scrollTop, behavior: 'auto' });
        scrollRoot.style.scrollBehavior = previousScrollBehavior;
        pendingNavigationId = null;
        clearScrollSettleFrame();
        scheduleActiveSection();
      }
      function syncHashTargetToViewport() {
        let targetId = location.hash.slice(1);
        try {
          targetId = decodeURIComponent(targetId);
        } catch {
          scheduleActiveSection();
          return;
        }
        const target = sectionById.get(targetId);
        if (!target) {
          scheduleActiveSection();
          return;
        }
        const maxScrollTop = Math.max(0, scrollRoot.scrollHeight - scrollRoot.clientHeight);
        const targetDocumentTop = target.element.getBoundingClientRect().top + scrollRoot.scrollTop;
        const desiredScrollTop = Math.min(maxScrollTop, Math.max(0, targetDocumentTop - getActivationLine()));
        setActiveSection(target.id);
        if (Math.abs(desiredScrollTop - scrollRoot.scrollTop) <= 1) {
          scheduleActiveSection();
          return;
        }
        pendingNavigationId = target.id;
        window.scrollTo({ top: desiredScrollTop, behavior: 'auto' });
        monitorScrollEndFallback();
      }
      function restoreActiveSectionFromHistory() {
        pendingNavigationId = null;
        clearScrollSettleFrame();
        syncHashTargetToViewport();
      }
      function handleHashChange() {
        if (pendingNavigationId) {
          scheduleActiveSection();
          return;
        }
        syncHashTargetToViewport();
      }

      navLinks.forEach((link) => link.addEventListener('click', (event) => handleNavigationClick(event, link)));
      window.addEventListener('scroll', scheduleActiveSection, { passive: true });
      window.addEventListener('resize', scheduleActiveSection, { passive: true });
      window.addEventListener('wheel', interruptPendingNavigation, { passive: true });
      window.addEventListener('touchstart', interruptPendingNavigation, { passive: true });
      window.addEventListener('pointerdown', interruptPendingNavigation, { passive: true });
      window.addEventListener('keydown', interruptPendingNavigation);
      document.addEventListener('scrollend', finishPendingNavigation, { passive: true });
      window.addEventListener('hashchange', handleHashChange);
      window.addEventListener('popstate', restoreActiveSectionFromHistory);
      window.addEventListener('load', scheduleActiveSection, { once: true });
      window.addEventListener('pageshow', scheduleActiveSection);
      if (document.fonts?.ready) document.fonts.ready.then(scheduleActiveSection);
      if (typeof window.ResizeObserver === 'function') {
        const navigationResizeObserver = new window.ResizeObserver(scheduleActiveSection);
        if (siteHeader) navigationResizeObserver.observe(siteHeader);
        const main = document.querySelector('main.container');
        if (main) navigationResizeObserver.observe(main);
      }
      scheduleActiveSection();

      const cord = document.querySelector('.cord-handle');
      const cordLine = document.querySelector('.cord-line');
      const cordAssembly = cord?.closest('.cord-assembly');
      const cordSlot = cord?.closest('.cord-slot');
      const cordHint = cordAssembly?.querySelector('.cord-hint--lateral');
      const cordHintBelow = cordAssembly?.querySelector('.cord-hint--below');
      const cordHintContent = cordAssembly?.querySelector('.cord-hint-content');
      const mainContainer = document.querySelector('main.container');
      const navInner = document.querySelector('.nav-inner');
      const mobilePanel = document.querySelector('.mobile-panel');
      const mobileMenu = document.querySelector('.mobile-menu');
      const cordStatus = document.getElementById('cord-help');
      let pullAudio = null;
      let pullAudioFailed = false;
      function prefersReducedMotion() {
        return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      }
      const profileFrame = document.querySelector('[data-profile-frame]');
      const profileTilt = profileFrame?.querySelector('[data-profile-tilt]');
      const profileDepthCard = profileFrame?.querySelector('[data-profile-depth]');
      const finePointer = window.matchMedia?.('(hover: hover) and (pointer: fine)');
      const reducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
      if (profileFrame && profileTilt && profileDepthCard && finePointer?.matches && !prefersReducedMotion()) {
        const resetProfileTilt = (staticOnly = prefersReducedMotion()) => {
          profileFrame.classList.remove('is-tilting');
          profileTilt.style.transform = staticOnly ? 'none' : 'perspective(900px) rotateX(0deg) rotateY(0deg)';
          profileDepthCard.style.transform = staticOnly ? 'none' : 'translate3d(0,0,20px)';
        };
        profileFrame.addEventListener('pointermove', (event) => {
          if (event.pointerType !== 'mouse' || prefersReducedMotion()) return;
          const bounds = profileFrame.getBoundingClientRect();
          if (!bounds.width || !bounds.height) return;
          const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
          const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
          profileFrame.classList.add('is-tilting');
          profileTilt.style.transform = `perspective(900px) rotateX(${(-y * 1.8).toFixed(2)}deg) rotateY(${(x * 1.8).toFixed(2)}deg)`;
          profileDepthCard.style.transform = `translate3d(${(-x * 3).toFixed(1)}px,${(-y * 2).toFixed(1)}px,20px)`;
        });
        profileFrame.addEventListener('pointerleave', () => resetProfileTilt());
        profileFrame.addEventListener('pointercancel', () => resetProfileTilt());
        reducedMotionQuery?.addEventListener?.('change', (event) => {
          if (event.matches) resetProfileTilt(true);
        });
      }
      if (cordSlot && cordSlot.parentElement !== document.body) document.body.append(cordSlot);
      function initializeAudio() {
        if (pullAudio || pullAudioFailed) return pullAudio;
        try {
          const AudioConstructor = window.Audio;
          if (typeof AudioConstructor !== 'function') {
            pullAudioFailed = true;
            return null;
          }
          pullAudio = new AudioConstructor('assets/sound/handgun-click.mp3');
          pullAudio.preload = 'auto';
          pullAudio.volume = 0.28;
          pullAudio.addEventListener?.('error', () => { pullAudioFailed = true; }, { once: true });
          pullAudio.load?.();
          return pullAudio;
        } catch {
          pullAudioFailed = true;
          return null;
        }
      }
      function prepareAudioForInteraction() {
        const audio = initializeAudio();
        if (!audio || pullAudioFailed) return;
        try {
          if (audio.readyState === 0 && audio.networkState === (window.HTMLMediaElement?.NETWORK_EMPTY ?? 0)) audio.load?.();
        } catch {
          pullAudioFailed = true;
        }
      }
      function playPullSound() {
        const audio = initializeAudio();
        if (!audio || pullAudioFailed) return;
        try {
          audio.pause();
          audio.currentTime = 0;
          const playback = audio.play();
          playback?.catch?.(() => {});
        } catch {}
      }
      initializeAudio();
      function fireActivation(source) {
        const themeChanged = toggleTheme();
        if (cordStatus) cordStatus.textContent = messages[currentLanguage].cordActivated;
        window.dispatchEvent(new CustomEvent('work-gallery:cord-activated', {
          detail: { source, themeChanged }
        }));
        playPullSound();
      }
      function clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
      }
      function readCordMetrics() {
        const style = window.getComputedStyle?.(document.documentElement);
        const readMetric = (property, fallback) => {
          const value = Number.parseFloat(style?.getPropertyValue(property));
          return Number.isFinite(value) && value > 0 ? value : fallback;
        };
        return {
          restY: readMetric('--cord-rest-y', 176),
          travel: readMetric('--cord-travel', 54),
          trackWidth: readMetric('--cord-track-width', 64),
          lineX: readMetric('--cord-line-x', 31.3),
          handleLeft: readMetric('--cord-handle-left', 9),
          hitSize: readMetric('--cord-hit-size', 46),
          hitOffset: readMetric('--cord-hit-offset', 23)
        };
      }
      const initialCordMetrics = readCordMetrics();
      const cordLinePath = cordLine?.querySelector('path') ?? null;
      let restY = initialCordMetrics.restY;
      let maxPull = initialCordMetrics.travel;
      let trackWidth = initialCordMetrics.trackWidth;
      let lineX = initialCordMetrics.lineX;
      let handleCenterX = initialCordMetrics.handleLeft + initialCordMetrics.hitSize / 2;
      let maxSway = Math.min(6, initialCordMetrics.handleLeft, Math.max(0, trackWidth - initialCordMetrics.handleLeft - initialCordMetrics.hitSize));
      let activationThreshold = maxPull * 0.7;
      let currentPull = 0;
      let currentSway = 0;
      let activePointerId = null;
      let startX = 0;
      let startY = 0;
      let dragStartPull = 0;
      let dragStartSway = 0;
      let lastPointerTime = 0;
      let pullVelocity = 0;
      let swayVelocity = 0;
      let firedThisPull = false;
      let keyboardPullInProgress = false;
      let returnFrame = 0;
      let cordLayoutFrame = 0;
      let cordLayoutPending = false;
      let scheduleCordPosition = () => {};
      const requestCordFrame = window.requestAnimationFrame?.bind(window) ?? ((callback) => window.setTimeout(() => callback(Date.now()), 16));
      const cancelCordFrame = window.cancelAnimationFrame?.bind(window) ?? window.clearTimeout?.bind(window);
      function applyCordMetrics(metrics) {
        restY = metrics.restY;
        maxPull = metrics.travel;
        trackWidth = metrics.trackWidth;
        lineX = metrics.lineX;
        handleCenterX = metrics.handleLeft + metrics.hitSize / 2;
        maxSway = metrics.compact ? 0 : Math.min(6, metrics.handleLeft, Math.max(0, trackWidth - metrics.handleLeft - metrics.hitSize));
        activationThreshold = maxPull * 0.7;
        if (cordSlot) {
          cordSlot.style.setProperty('--cord-rest-y', `${metrics.restY}px`);
          cordSlot.style.setProperty('--cord-travel', `${metrics.travel}px`);
          cordSlot.style.setProperty('--cord-track-width', `${metrics.trackWidth}px`);
          cordSlot.style.setProperty('--cord-line-x', `${metrics.lineX}px`);
          cordSlot.style.setProperty('--cord-handle-left', `${metrics.handleLeft}px`);
          cordSlot.style.setProperty('--cord-hit-size', `${metrics.hitSize}px`);
          cordSlot.style.setProperty('--cord-hit-offset', `${metrics.hitOffset}px`);
        }
        if (cordLine) {
          cordLine.setAttribute('viewBox', `0 0 ${trackWidth} ${restY + maxPull}`);
          cordLine.style.height = `${restY + maxPull}px`;
        }
      }
      applyCordMetrics(initialCordMetrics);
      const cordContentGap = 24;
      const compactSlotSize = 48;
      const compactHandleSize = 44;
      function readCordLength(style, property, fallback = 0) {
        const value = Number.parseFloat(style?.getPropertyValue(property));
        return Number.isFinite(value) ? value : fallback;
      }
      function readViewportBounds() {
        const visualViewport = window.visualViewport;
        const left = Number.isFinite(visualViewport?.offsetLeft) ? visualViewport.offsetLeft : 0;
        const width = visualViewport?.width || document.documentElement.clientWidth || window.innerWidth;
        return { left, right: left + width };
      }
      function createCompactMetrics(navHeight) {
        const rest = navHeight / 2;
        const hitOffset = compactHandleSize / 2;
        return {
          restY: rest,
          travel: Math.max(0, navHeight - rest - hitOffset),
          trackWidth: compactSlotSize,
          lineX: compactSlotSize / 2,
          handleLeft: (compactSlotSize - compactHandleSize) / 2,
          hitSize: compactHandleSize,
          hitOffset,
          compact: true
        };
      }
      function selectCordPlacement(sideSpace, fullFootprint, belowFootprint, clearance) {
        if (sideSpace >= clearance + fullFootprint) return { mode: 'full', componentWidth: fullFootprint };
        if (sideSpace >= clearance + belowFootprint) return { mode: 'below', componentWidth: belowFootprint };
        return { mode: 'hidden', componentWidth: null };
      }
      function findCompactNavPosition(viewport, safeLeft, safeRight, safeTop) {
        if (!navInner) return null;
        const navRect = navInner.getBoundingClientRect();
        if (!navRect.width || !navRect.height) return null;
        const top = Math.max(navRect.top + (navRect.height - compactHandleSize) / 2, safeTop);
        if (top + compactHandleSize > navRect.bottom) return null;
        const minimumX = viewport.left + safeLeft + 2;
        const maximumX = viewport.right - safeRight - 2;
        if (maximumX - minimumX < compactSlotSize) return null;
        const controls = Array.from(navInner.children)
          .filter((element) => window.getComputedStyle(element).display !== 'none')
          .map((element) => element.getBoundingClientRect())
          .filter((rect) => rect.width > 0 && rect.height > 0)
          .sort((left, right) => left.left - right.left);
        const intervals = [];
        let cursor = minimumX;
        for (const rect of controls) {
          const gapEnd = Math.min(maximumX, rect.left - 2);
          if (gapEnd - cursor >= compactSlotSize) intervals.push({ start: cursor, end: gapEnd });
          cursor = Math.max(cursor, rect.right + 2);
        }
        if (maximumX - cursor >= compactSlotSize) intervals.push({ start: cursor, end: maximumX });
        const widest = intervals.sort((left, right) => (right.end - right.start) - (left.end - left.start))[0];
        if (!widest) return null;
        return {
          left: widest.start + (widest.end - widest.start - compactSlotSize) / 2,
          top,
          navHeight: navRect.height
        };
      }
      function updateCordPosition() {
        if (!cordSlot) return;
        if (activePointerId !== null || keyboardPullInProgress || returnFrame) {
          cordLayoutPending = true;
          return;
        }
        const baseMetrics = readCordMetrics();
        const slotStyle = window.getComputedStyle(cordSlot);
        const rootStyle = window.getComputedStyle(document.documentElement);
        const viewport = readViewportBounds();
        const safeLeft = readCordLength(slotStyle, '--cord-safe-left');
        const safeRight = readCordLength(slotStyle, '--cord-safe-right');
        const viewportWidth = viewport.right - viewport.left;
        const viewportShift = viewportWidth >= 1600 ? 70 : clamp((viewportWidth - 1280) * 0.375, 0, 60);
        const trackShift = readCordLength(rootStyle, '--cord-track-shift', 20);
        const safeTop = readCordLength(slotStyle, '--cord-safe-top');
        const mainRect = mainContainer?.getBoundingClientRect();
        const mainRight = mainRect && Number.isFinite(mainRect.right) ? mainRect.right : null;
        const swayAllowance = Math.min(6, baseMetrics.handleLeft, Math.max(0, baseMetrics.trackWidth - baseMetrics.handleLeft - baseMetrics.hitSize));
        const trackFootprint = Math.max(baseMetrics.trackWidth, baseMetrics.handleLeft + baseMetrics.hitSize + swayAllowance) + trackShift;
        const hintStyle = cordHint ? window.getComputedStyle(cordHint) : null;
        const hintWidth = readCordLength(hintStyle, 'width', 0);
        const hintRight = readCordLength(hintStyle, 'right', 0);
        const positionFootprint = Math.max(trackFootprint, hintWidth + hintRight);
        const annotationStyle = cordHintContent ? window.getComputedStyle(cordHintContent) : null;
        const annotationWidth = readCordLength(annotationStyle, 'width', hintWidth);
        const annotationGap = readCordLength(rootStyle, '--cord-annotation-gap', 0);
        const handleCenterOffset = positionFootprint - baseMetrics.trackWidth - trackShift + baseMetrics.handleLeft + baseMetrics.hitSize / 2;
        const annotationFootprint = positionFootprint - handleCenterOffset + annotationWidth + annotationGap;
        const fullFootprint = Math.max(trackFootprint, annotationFootprint);
        const belowStyle = cordHintBelow ? window.getComputedStyle(cordHintBelow) : null;
        const belowWidth = readCordLength(belowStyle, 'width', 0);
        const belowHalfWidth = readCordLength(rootStyle, '--cord-below-half-width', belowWidth / 2);
        const belowFootprint = Math.max(trackFootprint, baseMetrics.trackWidth + trackShift - baseMetrics.handleLeft - baseMetrics.hitOffset + belowHalfWidth);
        const rightLimit = viewport.right - safeRight;
        const sideSpace = mainRight === null ? 0 : rightLimit - mainRight - viewportShift;
        const sidePlacement = selectCordPlacement(sideSpace, fullFootprint, belowFootprint, cordContentGap);
        let mode = sidePlacement.mode;
        if (mode === 'hidden') {
          if (cordSlot.parentElement !== document.body) document.body.append(cordSlot);
          cordSlot.classList.remove('is-positioned', 'is-compact', 'is-menu-docked', 'is-hint-hidden', 'is-hint-below');
          cordSlot.classList.add('is-unavailable');
          cordSlot.dataset.positionMode = mode;
          cordSlot.style.position = 'fixed';
          cordSlot.style.left = '';
          cordSlot.style.right = 'auto';
          cordSlot.style.top = '0px';
          cordSlot.style.width = '';
          return;
        }
        cordSlot.classList.remove('is-unavailable');
        let activeMetrics = baseMetrics;
        let componentWidth = mode === 'full'
          ? positionFootprint
          : sidePlacement.componentWidth ?? compactSlotSize;
        let compactPosition = null;
        if (mode === 'compact') {
          const navRect = navInner?.getBoundingClientRect();
          const navHeight = navRect?.height || readCordLength(rootStyle, '--nav-height', 60);
          activeMetrics = createCompactMetrics(navHeight);
          compactPosition = findCompactNavPosition(viewport, safeLeft, safeRight, safeTop);
          mode = compactPosition ? 'compact-nav' : 'compact-menu';
        }
        if (mode === 'compact-menu' && !mobilePanel) {
          cordSlot.classList.remove('is-positioned');
          return;
        }
        const modeChanged = cordSlot.dataset.positionMode !== mode;
        applyCordMetrics(activeMetrics);
        cordSlot.classList.toggle('is-compact', mode === 'compact-nav' || mode === 'compact-menu');
        cordSlot.classList.toggle('is-hint-hidden', mode !== 'full' && mode !== 'below');
        cordSlot.classList.toggle('is-hint-below', mode === 'below');
        cordSlot.dataset.positionMode = mode;
        if (modeChanged) {
          stopCordReturn();
          keyboardPullInProgress = false;
          firedThisPull = false;
          pullVelocity = 0;
          swayVelocity = 0;
          setCordPose(0, 0);
        } else {
          setCordPose(currentPull, currentSway);
        }
        if (mode === 'compact-menu' && mobilePanel) {
          if (cordSlot.parentElement !== mobilePanel) mobilePanel.append(cordSlot);
          cordSlot.classList.add('is-menu-docked');
          cordSlot.style.position = 'relative';
          cordSlot.style.left = '';
          cordSlot.style.right = '';
          cordSlot.style.top = '';
          cordSlot.style.width = '';
        } else {
          if (cordSlot.parentElement !== document.body) document.body.append(cordSlot);
          cordSlot.classList.remove('is-menu-docked');
          cordSlot.style.position = 'fixed';
          const sideRailMode = mode === 'full' || mode === 'below';
          cordSlot.style.top = sideRailMode ? '0px' : `${compactPosition.top}px`;
          cordSlot.style.left = sideRailMode
            ? `${rightLimit - componentWidth - viewportShift}px`
            : `${compactPosition.left}px`;
          cordSlot.style.right = 'auto';
          cordSlot.style.width = `${mode === 'compact-nav' ? compactSlotSize : componentWidth}px`;
        }
        cordSlot.classList.add('is-positioned');
      }
      scheduleCordPosition = () => {
        if (cordLayoutFrame) return;
        cordLayoutFrame = requestCordFrame(() => {
          cordLayoutFrame = 0;
          updateCordPosition();
        });
      };
      function flushDeferredCordPosition() {
        if (!cordLayoutPending || activePointerId !== null || keyboardPullInProgress || returnFrame) return;
        cordLayoutPending = false;
        scheduleCordPosition();
      }
      function resistPull(distance) {
        if (distance < 0) return distance * 0.78;
        const slack = maxPull * 0.72;
        if (distance <= slack) return distance;
        const remainingTravel = maxPull - slack;
        const resistance = remainingTravel * (1 - Math.exp(-(distance - slack) / Math.max(1, maxPull * 0.34)));
        return Math.min(maxPull, slack + resistance);
      }
      function setCordPose(distance, sway = 0) {
        const pull = clamp(distance, 0, maxPull);
        const lateral = clamp(sway, -maxSway, maxSway);
        currentPull = pull;
        currentSway = lateral;
        if (!cord || !cordLine) return;
        const endY = restY + pull;
        const endX = handleCenterX + lateral;
        const deltaX = endX - lineX;
        const curveOffset = lateral * 0.35;
        const control1X = lineX + deltaX * 0.3 + curveOffset;
        const control2X = lineX + deltaX * 0.72 + curveOffset * 0.35;
        cord.style.transform = `translate3d(${lateral.toFixed(2)}px, ${pull.toFixed(2)}px, 0)`;
        cordLinePath?.setAttribute('d', `M ${lineX.toFixed(2)} 0 C ${control1X.toFixed(2)} ${(endY * 0.33).toFixed(2)} ${control2X.toFixed(2)} ${(endY * 0.72).toFixed(2)} ${endX.toFixed(2)} ${endY.toFixed(2)}`);
      }
      function stopCordReturn() {
        if (returnFrame) cancelCordFrame?.(returnFrame);
        returnFrame = 0;
      }
      function easeOut(progress) {
        const x1 = 0.23;
        const x2 = 0.32;
        let parameter = progress;
        for (let iteration = 0; iteration < 6; iteration++) {
          const inverse = 1 - parameter;
          const curveX = 3 * inverse * inverse * parameter * x1 + 3 * inverse * parameter * parameter * x2 + parameter * parameter * parameter;
          const slope = 3 * inverse * inverse * x1 + 6 * inverse * parameter * (x2 - x1) + 3 * parameter * parameter * (1 - x2);
          const error = curveX - progress;
          if (Math.abs(error) < 0.0001 || slope < 0.0001) break;
          parameter = clamp(parameter - error / slope, 0, 1);
        }
        const inverse = 1 - parameter;
        return 3 * inverse * inverse * parameter + 3 * inverse * parameter * parameter + parameter * parameter * parameter;
      }
      function animateCordReturn(distance, velocity = 0, sway = currentSway, lateralVelocity = swayVelocity, onSettled = null) {
        if (!cord || !cordLine) {
          onSettled?.();
          flushDeferredCordPosition();
          return;
        }
        cord.classList.remove('is-dragging');
        cordAssembly?.classList.remove('is-dragging');
        stopCordReturn();
        let position = clamp(distance, 0, maxPull);
        let speed = clamp(velocity, -260, 260);
        let swayPosition = clamp(sway, -maxSway, maxSway);
        let swaySpeed = clamp(lateralVelocity, -180, 180);
        if (prefersReducedMotion()) {
          const startPosition = position;
          const startSway = swayPosition;
          let startTime = null;
          const reducedStep = (now) => {
            if (startTime === null) startTime = now;
            const progress = clamp((now - startTime) / 110, 0, 1);
            const remaining = 1 - easeOut(progress);
            setCordPose(startPosition * remaining, startSway * remaining);
            if (progress < 1) {
              returnFrame = requestCordFrame(reducedStep);
              return;
            }
            setCordPose(0, 0);
            pullVelocity = 0;
            swayVelocity = 0;
            returnFrame = 0;
            onSettled?.();
            flushDeferredCordPosition();
          };
          returnFrame = requestCordFrame(reducedStep);
          return;
        }
        let previousTime = 0;
        const stiffness = 250;
        const damping = 25;
        const step = (now) => {
          const dt = Math.min(0.032, Math.max(0.001, previousTime ? (now - previousTime) / 1000 : 1 / 60));
          previousTime = now;
          speed += (-stiffness * position - damping * speed) * dt;
          position += speed * dt;
          if (position < 0) {
            position = -position * 0.18;
            speed = Math.abs(speed) * 0.18;
          } else if (position > maxPull) {
            position = maxPull;
            speed = Math.min(0, speed);
          }
          swaySpeed += (-stiffness * swayPosition - damping * swaySpeed) * dt;
          swayPosition += swaySpeed * dt;
          if (swayPosition < -maxSway || swayPosition > maxSway) {
            swayPosition = clamp(swayPosition, -maxSway, maxSway);
            if (Math.sign(swaySpeed) === Math.sign(swayPosition)) swaySpeed = 0;
          }
          if (Math.abs(swayPosition) < 0.08 && Math.abs(swaySpeed) < 1) {
            swayPosition = 0;
            swaySpeed = 0;
          }
          setCordPose(position, swayPosition);
          pullVelocity = speed;
          swayVelocity = swaySpeed;
          if (position < 0.12 && Math.abs(speed) < 2 && Math.abs(swayPosition) < 0.12 && Math.abs(swaySpeed) < 2) {
            setCordPose(0, 0);
            pullVelocity = 0;
            swayVelocity = 0;
            returnFrame = 0;
            onSettled?.();
            flushDeferredCordPosition();
            return;
          }
          returnFrame = requestCordFrame(step);
        };
        returnFrame = requestCordFrame(step);
      }
      function updatePull(event) {
        const now = Number.isFinite(event.timeStamp) && event.timeStamp > 0 ? event.timeStamp : Date.now();
        const elapsed = Math.max(8, now - lastPointerTime);
        const nextPull = clamp(dragStartPull + resistPull(event.clientY - startY), 0, maxPull);
        const nextSway = clamp(dragStartSway + (event.clientX - startX) * 0.14, -maxSway, maxSway);
        const pullDelta = nextPull - currentPull;
        const swayDelta = nextSway - currentSway;
        if (Math.abs(pullDelta) > 0.05 || Math.abs(swayDelta) > 0.05) {
          pullVelocity = clamp(pullDelta / elapsed * 1000, -260, 260);
          swayVelocity = clamp(swayDelta / elapsed * 1000, -180, 180);
        } else if (now - lastPointerTime > 120) {
          pullVelocity = 0;
          swayVelocity = 0;
        }
        lastPointerTime = now;
        setCordPose(nextPull, nextSway);
        if (currentPull >= activationThreshold && !firedThisPull) {
          firedThisPull = true;
          fireActivation('pointer');
        }
      }
      function startKeyboardPull() {
        if (activePointerId !== null || keyboardPullInProgress) return;
        stopCordReturn();
        keyboardPullInProgress = true;
        firedThisPull = false;
        const startPull = currentPull;
        const targetPull = Math.min(maxPull, Math.max(startPull, activationThreshold + Math.min(4, maxPull * 0.08)));
        const startSway = currentSway;
        const duration = 120;
        let startTime = null;
        const step = (now) => {
          if (startTime === null) startTime = now;
          const progress = clamp((now - startTime) / duration, 0, 1);
          const eased = easeOut(progress);
          const distance = startPull + (targetPull - startPull) * eased;
          setCordPose(distance, startSway * (1 - eased));
          if (currentPull >= activationThreshold && !firedThisPull) {
            firedThisPull = true;
            fireActivation('keyboard');
          }
          if (progress < 1) {
            returnFrame = requestCordFrame(step);
            return;
          }
          returnFrame = 0;
          animateCordReturn(currentPull, 0, currentSway, 0, () => {
            keyboardPullInProgress = false;
            firedThisPull = false;
          });
        };
        returnFrame = requestCordFrame(step);
      }
      if (cord && cordLine) {
        setCordPose(0, 0);
        cord.addEventListener('pointerdown', (event) => {
          if (activePointerId !== null || event.isPrimary === false || (event.pointerType === 'mouse' && event.button !== 0)) return;
          prepareAudioForInteraction();
          stopCordReturn();
          keyboardPullInProgress = false;
          activePointerId = event.pointerId;
          const metrics = readCordMetrics();
          applyCordMetrics(metrics);
          dragStartPull = currentPull;
          dragStartSway = currentSway;
          startX = event.clientX;
          startY = event.clientY;
          pullVelocity = 0;
          swayVelocity = 0;
          lastPointerTime = Number.isFinite(event.timeStamp) && event.timeStamp > 0 ? event.timeStamp : Date.now();
          firedThisPull = currentPull >= activationThreshold;
          cord.classList.add('is-dragging');
          cordAssembly?.classList.add('is-dragging');
          try { cord.setPointerCapture(event.pointerId); } catch {}
        });
        cord.addEventListener('pointermove', (event) => {
          if (activePointerId !== event.pointerId) return;
          updatePull(event);
        });
        const finishPointerPull = (event) => {
          if (activePointerId !== event.pointerId) return;
          if (event.type === 'pointerup') updatePull(event);
          const pointerId = activePointerId;
          const distance = currentPull;
          const velocity = event.type === 'pointerup' ? pullVelocity : 0;
          const lateralVelocity = event.type === 'pointerup' ? swayVelocity : 0;
          activePointerId = null;
          firedThisPull = false;
          try {
            if (cord.hasPointerCapture?.(pointerId)) cord.releasePointerCapture(pointerId);
          } catch {}
          animateCordReturn(distance, velocity, currentSway, lateralVelocity);
        };
        cord.addEventListener('pointerup', finishPointerPull);
        cord.addEventListener('pointercancel', finishPointerPull);
        cord.addEventListener('lostpointercapture', finishPointerPull);
        cord.addEventListener('click', (event) => {
          if (event.detail !== 0 || activePointerId !== null) return;
          prepareAudioForInteraction();
          startKeyboardPull();
        });
      }
      window.addEventListener('resize', scheduleCordPosition, { passive: true });
      window.visualViewport?.addEventListener('resize', scheduleCordPosition, { passive: true });
      window.visualViewport?.addEventListener('scroll', scheduleCordPosition, { passive: true });
      mobileMenu?.addEventListener('toggle', scheduleCordPosition);
      if (typeof ResizeObserver === 'function') {
        const cordResizeObserver = new ResizeObserver(scheduleCordPosition);
        if (mainContainer) cordResizeObserver.observe(mainContainer);
        if (navInner) cordResizeObserver.observe(navInner);
        if (cordHint) cordResizeObserver.observe(cordHint);
        if (cordHintBelow) cordResizeObserver.observe(cordHintBelow);
      }
      scheduleCordPosition();
    })();
