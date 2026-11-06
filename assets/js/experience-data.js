(() => {
  'use strict';

  window.portfolioExperienceData = {
    labels: {
      en: {
        projectPeriod: 'Project period',
        mode: 'Mode',
        technologies: 'Technologies',
        deployment: 'Deployment',
        viewProject: 'View project',
        watchVideo: 'Watch video',
        opensInNewTab: 'opens in a new tab',
        initiativeTechnologies: 'Technologies used in',
        initiatives: 'Initiatives',
        proposedComponents: 'Proposed components'
      },
      es: {
        projectPeriod: 'Período del proyecto',
        mode: 'Modalidad',
        technologies: 'Tecnologías',
        deployment: 'Despliegue',
        viewProject: 'Ver proyecto',
        watchVideo: 'Ver vídeo',
        opensInNewTab: 'se abre en una pestaña nueva',
        initiativeTechnologies: 'Tecnologías usadas en',
        initiatives: 'Iniciativas',
        proposedComponents: 'Componentes propuestos'
      }
    },
    experiences: [
      {
        id: 'caja-ica',
        organization: 'Caja Ica',
        organizationPeriodStart: '2024-04',
        organizationPeriod: { en: 'Apr. 2024 – Present', es: 'Abril de 2024 – actualidad' },
        projects: [],
        roles: [
          {
            id: 'crm-ai-analyst-developer',
            title: { en: 'CRM & AI Analyst Developer', es: 'Analista Desarrollador de CRM e IA' },
            periodStart: '2026-06',
            period: { en: 'Jun. 2026 – Present', es: 'junio de 2026 – actualidad' },
            openByDefault: true,
            initiatives: [
              {
                id: 'receipt-ocr',
                technologies: ['Java 25', 'Spring Boot', 'Spring AI', 'Clean Architecture', 'Amazon Textract', 'Amazon SNS / SQS', 'Amazon Bedrock', 'Mockito', 'SonarQube', 'OWASP Dependency-Check'],
                title: { en: 'Receipt processing with OCR', es: 'Procesamiento de recibos con OCR' },
                description: {
                  en: 'Reduced the time Logistics spent manually looking up service-receipt data by adding OCR to the core application. Built it with Java 25, Spring Boot, Spring AI, and Clean Architecture; used Amazon Textract with SNS/SQS for asynchronous processing and Bedrock to structure the extracted data. Added Mockito tests, SonarQube analysis, and OWASP Dependency-Check.',
                  es: 'Reduje el tiempo que Logística dedicaba a buscar manualmente los datos de recibos al integrar OCR en el aplicativo core. Lo desarrollé con Java 25, Spring Boot, Spring AI y Clean Architecture; procesé los recibos de forma asíncrona con Textract y SNS/SQS, y estructuré los datos con Bedrock. Añadí pruebas con Mockito, análisis con SonarQube y revisión con OWASP Dependency-Check.'
                }
              },
              {
                id: 'executive-ai-assistant',
                technologies: ['Microsoft Copilot Studio', 'Teams', 'SharePoint'],
                title: { en: 'AI assistant for executives', es: 'Asistente de IA para directivos' },
                description: {
                  en: 'Enabled a Microsoft Copilot Studio assistant in Teams for Caja Ica executives, connected to a private SharePoint knowledge base, making institutional regulations, conference materials, and other documents faster to find and supporting informed decisions.',
                  es: 'Habilité para los directivos de Caja Ica un asistente de Microsoft Copilot Studio en Teams, conectado a una base de conocimiento privada en SharePoint, para agilizar la consulta de reglamentos, conferencias y otros documentos institucionales y apoyar decisiones informadas.'
                }
              },
              {
                id: 'salesforce-collections-communications',
                technologies: ['Salesforce Marketing Cloud', 'Java 25', 'Spring Boot', 'REST API', 'SFTP', 'Data Extensions', 'Automation Studio', 'Journey Builder'],
                title: { en: 'Collections communications with Salesforce Marketing Cloud', es: 'Comunicaciones de cobranza con Salesforce Marketing Cloud' },
                description: {
                  en: 'Connected the core to Salesforce Marketing Cloud through a Java 25/Spring Boot REST API that batches customers and transfers CSV files over SFTP. Configured Data Extensions, Automation Studio, and Journey Builder to segment messages by delinquency, credit type, and customer type, so Recoveries could manage templates.',
                  es: 'Integré el core con Salesforce Marketing Cloud mediante una API REST en Java 25 y Spring Boot que procesa clientes por lotes y transfiere CSV por SFTP. Configuré Data Extensions, Automation Studio y Journey Builder para segmentar comunicaciones por mora, tipo de crédito y de persona, y permitir que Recuperaciones gestione las plantillas.'
                }
              },
              {
                id: 'python-ai-agent-archetype',
                technologies: ['Python', 'FastAPI', 'uv', 'Hexagonal architecture', 'SonarQube'],
                title: { en: 'Python archetype for AI agents', es: 'Arquetipo Python para agentes de IA' },
                description: {
                  en: 'Proposed and built a reusable AI-agent foundation with Python, FastAPI, uv, and hexagonal architecture, with SonarQube code analysis.',
                  es: 'Propuse y desarrollé una base reutilizable para agentes de IA con Python, FastAPI, uv y arquitectura hexagonal, con análisis de código en SonarQube.'
                },
                proposedComponents: {
                  en: 'Qdrant for vector search, LiteLLM for model access, and a CI/CD workflow to publish and distribute the archetype through Nexus were proposed as components.',
                  es: 'Se propusieron Qdrant para búsqueda vectorial, LiteLLM para acceso a modelos y un flujo de CI/CD para publicar y distribuir el arquetipo mediante Nexus.'
                }
              }
            ]
          },
          {
            id: 'junior-software-developer',
            title: { en: 'Junior Software Developer', es: 'Desarrollador de Software Junior' },
            periodStart: '2024-07',
            period: { en: 'Jul. 2024 – Jun. 2026', es: 'julio de 2024 – junio de 2026' },
            openByDefault: false,
            initiatives: [
              {
                id: 'whatsapp-card-blocking',
                technologies: ['Boty', 'WhatsApp', 'Java', 'Spring Boot', 'Circuit Breaker'],
                title: { en: 'Card blocking through WhatsApp', es: 'Bloqueo de tarjetas por WhatsApp' },
                description: {
                  en: 'Made it easier for Caja Ica customers to block cards through Boty on WhatsApp. Enabled the feature with a Java and Spring Boot microservice and Circuit Breaker to handle failures when checking active cards.',
                  es: 'Facilité que los clientes de Caja Ica bloquearan sus tarjetas desde Boty, el canal de WhatsApp. Habilité la opción con un microservicio en Java y Spring Boot y Circuit Breaker para manejar fallas al consultar tarjetas activas.'
                }
              },
              {
                id: 'cash-counting-policies-modernization',
                technologies: ['Angular', 'AG Grid', 'Java', 'Spring Boot', 'REST API'],
                title: { en: 'Modernization of the cash-counting and policies module', es: 'Modernización del módulo de arqueos y pólizas' },
                description: {
                  en: 'Made agency-closing progress easier to track with a dashboard showing which branches had uploaded required documents and which were still pending. Migrated the ASP.NET Web Forms module to Angular and AG Grid, backed by a Java/Spring Boot REST API.',
                  es: 'Facilité el seguimiento del cierre de agencias con un tablero que mostraba qué sedes habían cargado los documentos requeridos y cuáles seguían pendientes. Migré el módulo de ASP.NET Web Forms a Angular y AG Grid, respaldado por una API REST con Java y Spring Boot.'
                }
              },
              {
                id: 'reniec-integration',
                technologies: ['Java', 'Spring Boot', 'REST API', 'RENIEC'],
                title: { en: 'RENIEC integration', es: 'Integración con RENIEC' },
                description: {
                  en: 'Reduced the response time of personal-data queries in central applications by optimizing the Java/Spring Boot REST API integrated with RENIEC.',
                  es: 'Reduje el tiempo de respuesta de las consultas de datos personales de los aplicativos centrales al optimizar la API REST de integración con RENIEC en Java y Spring Boot.'
                }
              },
              {
                id: 'petty-cash-management',
                technologies: ['C#', 'WPF', 'WCF', 'SQL Server', 'SQL Server Reporting Services'],
                title: { en: 'Petty-cash management', es: 'Gestión de caja chica' },
                description: {
                  en: 'Simplified tracking of administrative-area funds by centralizing in the core the records Operations Central had kept in Excel. Implemented fund controls and monthly, preventive, and surprise counts with C#, WPF, WCF, and SQL Server, plus reports with SQL Server Reporting Services.',
                  es: 'Simplifiqué el seguimiento de los fondos de áreas administrativas al centralizar en el core el registro que Operaciones Centrales llevaba en Excel. Implementé el control de fondos y arqueos mensuales, preventivos y sorpresivos con C#, WPF, WCF y SQL Server, además de reportes con SQL Server Reporting Services.'
                }
              },
              {
                id: 'sql-server-optimization',
                technologies: ['SQL Server'],
                title: { en: 'SQL Server optimization', es: 'Optimización de SQL Server' },
                description: {
                  en: 'Improved maintenance of core stored procedures by optimizing their logic and applying SQL Server development best practices.',
                  es: 'Mejoré el mantenimiento de procedimientos almacenados del core al optimizar su lógica y aplicar buenas prácticas de desarrollo en SQL Server.'
                }
              }
            ]
          },
          {
            id: 'backend-independent-contractor',
            title: { en: 'Backend Developer | Independent Contractor', es: 'Desarrollador Backend | Locación de servicios' },
            periodStart: '2024-04',
            period: { en: 'Apr. 2024 – Jul. 2024', es: 'abril de 2024 – julio de 2024' },
            openByDefault: false,
            initiatives: [
              {
                id: 'automatic-service-debits',
                technologies: ['Java 11', 'Spring Boot 2.2.1', 'SQL Server', 'Layered architecture', 'Strategy pattern'],
                title: { en: 'Automatic service debits', es: 'Débito automático de servicios' },
                description: {
                  en: 'Automated overnight billing for Contugas and Electrodunas using their customer lists, laying the groundwork for adding the flow to the Caja Ica mobile app. Built layered microservices with Java 11, Spring Boot 2.2.1, and SQL Server, using Strategy to select logic by service and contract.',
                  es: 'Automaticé el cobro nocturno de recibos de Contugas y Electrodunas con sus listados de clientes, sentando las bases para incorporarlo a la app móvil. Desarrollé microservicios en capas con Java 11, Spring Boot 2.2.1 y SQL Server, y usé Strategy para elegir la lógica según el servicio y el contrato.'
                }
              },
              {
                id: 'savings-account-migration',
                technologies: ['C#', 'WPF', 'WCF', 'Indigo Persona'],
                title: { en: 'Savings account migration', es: 'Migración de cuentas de ahorro' },
                description: {
                  en: 'I implemented an overnight migration process for legal-entity savings accounts. I adapted Indigo Persona to update customer data with C#, WPF, and WCF.',
                  es: 'Implementé un proceso nocturno para migrar cuentas de ahorro de personas jurídicas. Adapté Indigo Persona para actualizar los datos de los clientes con C#, WPF y WCF.'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'no-country',
        organization: 'No Country',
        role: { en: 'Backend Developer', es: 'Desarrollador Backend' },
        periodStart: '2023-10',
        period: { en: 'Oct. 2023 — Jan. 2024', es: 'octubre de 2023 – enero de 2024' },
        duration: { en: '4 months', es: '4 meses' },
        summary: {
          en: 'I participated in multicultural teams developing backend solutions with Java and Spring Boot, collaborating to solve technical challenges and meet delivery deadlines.',
          es: 'Participé en equipos multiculturales desarrollando soluciones backend con Java y Spring Boot, colaborando en la resolución de retos técnicos y el cumplimiento de los plazos de entrega.'
        },
        projects: [
          {
            id: 'trucking',
            title: 'Trucking',
            dateTime: '2023-11',
            period: { en: 'Nov. – Dec. 2023', es: 'noviembre – diciembre de 2023' },
            mode: { en: 'Remote', es: 'remoto' },
            description: {
              en: 'I led the backend development of a fleet management system using a layered REST architecture, applying design patterns and best practices. I also designed and developed a WhatsApp chatbot with Baileys, integrated with the REST API built in Spring Boot.',
              es: 'Lideré el desarrollo backend de un sistema de gestión de flotas mediante una arquitectura REST en capas, aplicando patrones de diseño y buenas prácticas. También diseñé y desarrollé un chatbot de WhatsApp con Baileys, integrado con la API REST construida en Spring Boot.'
            },
            technologies: ['Java 17', 'Spring Boot', 'Spring Mail', 'Spring Security', 'Spring Data JPA', 'MapStruct', 'JWT', 'Springdoc OpenAPI', 'Docker', 'GitHub Actions', 'Maven', 'Git', 'Baileys', 'MySQL'],
            deployment: { en: 'Physical IBM X3550 M4 server', es: 'Servidor físico IBM X3550 M4' },
            image: 'assets/img/tech/trucking.png',
            imageAlt: {
              en: 'Trucking fleet management project',
              es: 'Proyecto Trucking de gestión de flotas'
            },
            projectUrl: 'project-page-3.html',
            videoUrl: 'https://www.youtube.com/watch?v=UziTMfvcI_I'
          },
          {
            id: 'cashier',
            title: 'Cashier',
            dateTime: '2023-10',
            period: { en: 'Oct. – Nov. 2023', es: 'octubre – noviembre de 2023' },
            mode: null,
            description: {
              en: 'I developed backend features for a digital wallet using a layered REST architecture, applying design patterns and best practices.',
              es: 'Desarrollé funcionalidades backend para una billetera digital mediante una arquitectura REST en capas, aplicando patrones de diseño y buenas prácticas.'
            },
            technologies: ['Java 17', 'Spring Boot', 'Spring Mail', 'Spring Data JPA', 'MapStruct', 'Spring Security', 'JWT', 'Swagger', 'Docker', 'Firebase Cloud Storage', 'Maven', 'Git', 'ZXing', 'PostgreSQL'],
            deployment: { en: 'Physical IBM X3550 M4 server', es: 'Servidor físico IBM X3550 M4' },
            image: 'assets/img/nature/Banner.png',
            imageAlt: {
              en: 'Cashier digital wallet project',
              es: 'Proyecto Cashier de billetera digital'
            },
            projectUrl: 'project-page-2.html',
            videoUrl: 'https://lnkd.in/eG2f7kgk'
          }
        ]
      },
      { id: 'hospital-regional-de-ica', projects: [] }
    ]
  };
})();
