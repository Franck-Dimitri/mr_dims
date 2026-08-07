import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const dictionary = {
    fr: {
        // Navigation
        nav_home: "ACCUEIL",
        nav_projects: "PROJETS",
        nav_about: "À PROPOS",
        nav_services: "SERVICES",
        nav_packs: "PACKS",
        nav_blog: "BLOG",
        nav_contact: "CONTACT",

        // Common UI
        sys_status: "SYS_STATUS: EN LIGNE",
        sys_offline: "SYS_STATUS: HORS LIGNE",
        read_more: "EN SAVOIR PLUS →",
        view_details: "DÉTAILS DU PROJET →",
        view_all_projects: "VOIR TOUS LES PROJETS →",
        view_all_blogs: "TOUS LES ARTICLES →",
        published_on: "Publié le",
        likes: "Likes",
        views: "Vues",
        back_to_base: "RETOUR À LA BASE",
        
        // Welcome Page
        welcome_hero_title1: "INGÉNIERIE",
        welcome_hero_title2: "LOGICIELLE",
        welcome_hero_tag: "INGÉNIEUR FULL STACK",
        welcome_hero_desc: "// ARCHITECTURE SYSTÈME ET DÉVELOPPEMENT LOGICIEL. JE TRANSFORME DES CONCEPTS COMPLEXES EN APPLICATIONS WEB SCALABLES ET PERFORMANTES.",
        btn_explore_code: "EXPLORER LE CODE",
        btn_initiate_project: "INITIER UN PROJET",
        btn_view_cv: "VOIR LE CV",
        btn_download_cv: "TÉLÉCHARGER CV",
        btn_share_cv: "PARTAGER",
        cv_modal_title: "CURRICULUM VITAE",
        cv_subtitle: "// DOCUMENT OFFICIEL — KOUONGME MBOUOM F. DIMITRI",
        cv_view_pdf: "DOCUMENT PDF",
        cv_view_image: "APERÇU IMAGES",
        cv_link_copied: "Lien du CV copié !",
        cv_download: "TÉLÉCHARGER (PDF)",
        home_matrix_tag: "// MATRICE COMPÉTENCES",
        home_matrix_title: "STACK & EXPERTISE TECHNIQUE",
        home_projects_tag: "// PORTFOLIO SÉLECTIONNÉ",
        home_projects_title: "PROJETS RÉCENTS",
        home_services_tag: "// OFFRES D'INGÉNIERIE",
        home_services_title: "SERVICES SUR-MESURE",
        home_blog_tag: "// PUBLICATIONS & ARTICLES",
        home_blog_title: "DERNIÈRES PUBLICATIONS",
        
        // Projects Page
        projects_title: "PORTFOLIO & RÉALISATIONS",
        projects_subtitle: "// EXPLOREZ MES ARCHITECTURES, PROJETS OPEN-SOURCE ET APPLICATIONS WEB DÉPLOYÉES.",
        filter_all: "TOUS LES PROJETS",
        filter_web: "WEB APPS",
        filter_api: "APIS & BACKEND",
        filter_mobile: "MOBILE",
        no_projects_found: "Aucun projet trouvé pour cette catégorie.",
        project_repo: "CODE SOURCE (GITHUB)",
        project_demo: "PRÉVISUALISER LA DÉMO",
        project_other: "AUTRES PROJETS RÉCENTS",

        // Services Page
        services_title: "SERVICES & SOLUTIONS ARCHITECTURALES",
        services_subtitle: "// CONCEPTION DE SYSTÈMES SUR-MESURE, DÉVELOPPEMENT FULL STACK ET CONSEIL TECHNIQUE.",
        service_1_title: "DÉVELOPPEMENT WEB FULL STACK",
        service_1_desc: "Création d'applications web modernes, réactives et performantes avec Laravel 13, Inertia et React.",
        service_2_title: "ARCHITECTURE D'API & MICROSERVICES",
        service_2_desc: "Conception d'APIs RESTful sécurisées, évolutives et optimisées pour fort trafic.",
        service_3_title: "AUDIT & REFACTORING DE CODE",
        service_3_desc: "Analyse d'architecture, optimisation des requêtes SQL, correction de bugs et sécurisation.",

        // Packs & Estimator
        packs_title: "PACKS DE SERVICES & ESTIMATEUR",
        packs_subtitle: "// SÉLECTIONNEZ UNE STRUCTURE PRÉCONFIGURÉE OU PERSONNALISEZ VOTRE SPÉCIFICATION EN TEMPS RÉEL.",
        btn_select_pack: "SÉLECTIONNER CE PACK →",
        estimator_title: "// CALCULATEUR DE DEVIS ARCHITECTURAL",
        estimator_step1: "> 01. TYPE DE PROJET",
        estimator_step2: "> 02. SPÉCIFICATIONS TECHNIQUES",
        estimator_step3: "> 03. MAINTENANCE & SUIVI",
        estimator_total: "[ ESTIMATION DU BUDGET PROJET ]",
        btn_initiate_estimator: "INITIER CE PROJET →",

        // Blog Page
        blog_title: "BLOG & KNOWLEDGE BASE",
        blog_subtitle: "// ARTICLES TECHNIQUES, RETOURS D'EXPÉRIENCE ET BONNES PRATIQUES D'INGÉNIERIE LOGICIELLE.",
        blog_read_time: "min de lecture",
        blog_comments_title: "COMMENTAIRES",
        blog_add_comment: "LAISSER UN COMMENTAIRE",
        label_comment_name: "Votre Nom",
        label_comment_email: "Votre Email",
        label_comment_text: "Votre Commentaire",
        btn_post_comment: "PUBLIER LE COMMENTAIRE",

        // Contact
        contact_title: "ÉTABLIR LE CONTACT",
        contact_subtitle: "// TRANSMISSION DE SPÉCIFICATIONS ET DEMANDES DE COLLABORATION TECHNIQUE.",
        label_name: "> NOM COMPLET / ENTREPRISE",
        label_email: "> ADRESSE EMAIL",
        label_message: "> SPÉCIFICATIONS DU PROJET",
        label_file: "> PIÈCE JOINTE (MAX 2MO)",
        btn_send: "EXECUTER_POST()",
        sending: "COMPILATION EN COURS...",
        success_msg: "[SUCCESS] Votre message a bien été transmis. Je vous réponds sous 24h !"
    },
    en: {
        // Navigation
        nav_home: "HOME",
        nav_projects: "PROJECTS",
        nav_about: "ABOUT",
        nav_services: "SERVICES",
        nav_packs: "PACKS",
        nav_blog: "BLOG",
        nav_contact: "CONTACT",

        // Common UI
        sys_status: "SYS_STATUS: ONLINE",
        sys_offline: "SYS_STATUS: OFFLINE",
        read_more: "LEARN MORE →",
        view_details: "PROJECT DETAILS →",
        view_all_projects: "VIEW ALL PROJECTS →",
        view_all_blogs: "ALL ARTICLES →",
        published_on: "Published on",
        likes: "Likes",
        views: "Views",
        back_to_base: "BACK TO BASE",

        // Welcome Page
        welcome_hero_title1: "SOFTWARE",
        welcome_hero_title2: "ENGINEERING",
        welcome_hero_tag: "FULL STACK ENGINEER",
        welcome_hero_desc: "// SYSTEM ARCHITECTURE AND SOFTWARE DEVELOPMENT. I TRANSFORM COMPLEX CONCEPTS INTO SCALABLE, HIGH-PERFORMANCE WEB APPLICATIONS.",
        btn_explore_code: "EXPLORE CODE",
        btn_initiate_project: "START A PROJECT",
        btn_view_cv: "VIEW RESUME",
        btn_download_cv: "DOWNLOAD CV",
        btn_share_cv: "SHARE",
        cv_modal_title: "CURRICULUM VITAE",
        cv_subtitle: "// OFFICIAL DOCUMENT — KOUONGME MBOUOM F. DIMITRI",
        cv_view_pdf: "PDF DOCUMENT",
        cv_view_image: "HD PREVIEW",
        cv_link_copied: "Resume link copied!",
        cv_download: "DOWNLOAD (PDF)",
        home_matrix_tag: "// SKILLS MATRIX",
        home_matrix_title: "STACK & TECHNICAL EXPERTISE",
        home_projects_tag: "// SELECTED PORTFOLIO",
        home_projects_title: "RECENT PROJECTS",
        home_services_tag: "// ENGINEERING OFFERINGS",
        home_services_title: "CUSTOM SERVICES",
        home_blog_tag: "// PUBLICATIONS & ARTICLES",
        home_blog_title: "LATEST ARTICLES",

        // Projects Page
        projects_title: "PORTFOLIO & PROJECTS",
        projects_subtitle: "// EXPLORE MY ARCHITECTURES, OPEN-SOURCE PROJECTS AND DEPLOYED WEB APPLICATIONS.",
        filter_all: "ALL PROJECTS",
        filter_web: "WEB APPS",
        filter_api: "APIS & BACKEND",
        filter_mobile: "MOBILE",
        no_projects_found: "No projects found for this category.",
        project_repo: "SOURCE CODE (GITHUB)",
        project_demo: "PREVIEW DEMO",
        project_other: "OTHER RECENT PROJECTS",

        // Services Page
        services_title: "SERVICES & ARCHITECTURAL SOLUTIONS",
        services_subtitle: "// CUSTOM SYSTEM DESIGN, FULL STACK DEVELOPMENT, AND TECHNICAL CONSULTING.",
        service_1_title: "FULL STACK WEB DEVELOPMENT",
        service_1_desc: "Creation of modern, responsive, high-performance web applications using Laravel 13, Inertia, and React.",
        service_2_title: "API ARCHITECTURE & MICROSERVICES",
        service_2_desc: "Design of secure, scalable, and high-traffic optimized RESTful APIs.",
        service_3_title: "CODE AUDIT & REFACTORING",
        service_3_desc: "Architecture analysis, SQL query optimization, bug fixing, and security hardening.",

        // Packs & Estimator
        packs_title: "SERVICE PACKS & ESTIMATOR",
        packs_subtitle: "// CHOOSE A PRE-CONFIGURED STRUCTURE OR CUSTOMIZE YOUR SPECIFICATION IN REAL TIME.",
        btn_select_pack: "SELECT THIS PACK →",
        estimator_title: "// ARCHITECTURAL QUOTE CALCULATOR",
        estimator_step1: "> 01. PROJECT TYPE",
        estimator_step2: "> 02. TECHNICAL SPECIFICATIONS",
        estimator_step3: "> 03. MAINTENANCE & SUPPORT",
        estimator_total: "[ ESTIMATED PROJECT BUDGET ]",
        btn_initiate_estimator: "START THIS PROJECT →",

        // Blog Page
        blog_title: "BLOG & KNOWLEDGE BASE",
        blog_subtitle: "// TECHNICAL ARTICLES, CASE STUDIES, AND SOFTWARE ENGINEERING BEST PRACTICES.",
        blog_read_time: "min read",
        blog_comments_title: "COMMENTS",
        blog_add_comment: "LEAVE A COMMENT",
        label_comment_name: "Your Name",
        label_comment_email: "Your Email",
        label_comment_text: "Your Comment",
        btn_post_comment: "POST COMMENT",

        // Contact
        contact_title: "ESTABLISH CONTACT",
        contact_subtitle: "// SPECIFICATION TRANSMISSION AND TECHNICAL COLLABORATION REQUESTS.",
        label_name: "> FULL NAME / COMPANY",
        label_email: "> EMAIL ADDRESS",
        label_message: "> PROJECT SPECIFICATIONS",
        label_file: "> ATTACHMENT (MAX 2MB)",
        btn_send: "EXECUTE_POST()",
        sending: "COMPILING...",
        success_msg: "[SUCCESS] Your message has been sent. I will reply within 24h!"
    }
};

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('fr');

    useEffect(() => {
        const storedLang = localStorage.getItem('app_language');
        if (storedLang && (storedLang === 'fr' || storedLang === 'en')) {
            setLang(storedLang);
        }
    }, []);

    const changeLanguage = (newLang) => {
        setLang(newLang);
        localStorage.setItem('app_language', newLang);
    };

    const t = (key) => {
        return dictionary[lang]?.[key] || dictionary['fr']?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
