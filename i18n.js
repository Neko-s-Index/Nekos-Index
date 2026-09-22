// Lightweight i18n for Neko's Index.
// Covers site navigation, common buttons/labels, and shared UI chrome across all pages.
// Third-party app/site names and long-form legal text (Disclaimer/DMCA/Privacy bodies)
// are intentionally left untranslated: proper nouns shouldn't be translated, and legal
// text should only be translated by a professional/reviewed process.
(() => {
    const STORAGE_KEY = 'nekos_lang';

    const LANGS = [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'pt', name: 'Português' },
        { code: 'ja', name: '日本語' },
        { code: 'zh', name: '中文' },
        { code: 'hi', name: 'हिन्दी' },
    ];

    const DICT = {
        en: {
            'nav.home': 'Home', 'nav.index': 'Index', 'nav.guides': 'Guides', 'nav.mylists': 'My Lists',
            'nav.notes': 'Notes', 'nav.socials': 'Socials', 'nav.sitemap': 'Sitemap',
            'nav.privacySettings': 'Privacy Settings', 'nav.privacy': 'Privacy', 'nav.disclaimer': 'Disclaimer',
            'nav.dmca': 'DMCA', 'nav.donate': 'Donate', 'nav.adult': '18+',

            'common.settings': 'Settings', 'common.guide': 'Guide', 'common.close': 'Close',
            'common.save': 'Save', 'common.cancel': 'Cancel', 'common.language': 'Language',
            'common.backToTop': 'Back to Top', 'common.continue': 'Continue', 'common.verify': 'Verify',
            'common.mobileNoteSummary': 'Mobile note',

            'list.tagline': 'A curated directory of open-source apps, privacy tools, streaming utilities, and more. Browse categories, search by tags, save your favorites, and check the guides for PC, Android, iOS, and the web.',
            'list.checkOutPages': 'Check out pages',
            'list.categoriesHeading': 'Categories',
            'list.searchPlaceholder': 'Search apps, tools, and services...',
            'list.randomApp': 'Random App',
            'list.share': 'Share',
            'list.searchDDG': 'Search on DuckDuckGo',
            'list.searchNote': "Some apps fit more than one category. If you don't see what you need, try another filter or search by name.",
            'list.checkOutCategories': 'Check out these categories',
            'list.noResults': 'No results found.',

            'filter.all': 'All', 'filter.streaming': 'Streaming', 'filter.anime': 'Anime', 'filter.manga': 'Manga',
            'filter.tools': 'Tools', 'filter.download': 'Downloads', 'filter.android': 'Android', 'filter.pc': 'PC',
            'filter.ios': 'iOS', 'filter.ai': 'AI', 'filter.gaming': 'Gaming', 'filter.privacy': 'Privacy',
            'filter.modding': 'Modding', 'filter.retro': 'Retro', 'filter.community': 'Community',

            'footer.donateNotice': "All resources listed are third-party. If you find this index useful, please consider donating.",
            'footer.contactNote': 'Notice any issues or missing sources? Please get in contact and let me know.',
            'footer.otherIndexes': 'Other Useful Indexes:',
            'footer.showIndexes': 'Show Indexes',
            'footer.mobileNote': 'For mobile users: scroll or drag to view more buttons',

            'gate.title': 'Verify to Continue',
            'gate.clickContinue': 'Click below to continue.',
            'gate.continueBtn': 'I Understand & Continue',

            'guides.title': 'Guides & How-To',
            'guides.notice': 'Please read — these guides can help you use the index safely and effectively.',
            'guides.intro': 'These guides are meant to help you get started with open-source apps and tools listed on the main index. They are for informational purposes only.',
            'guides.about.title': 'About Neko\u2019s Index',
            'guides.about.body': 'Neko\u2019s Index is a free, community-curated directory of open-source apps, privacy tools, streaming utilities, emulation resources, and more. It does not host any files or copyrighted content \u2014 it only links to third-party projects and services. The goal is to make it easy to discover safe, open-source, and privacy-respecting software for PC, Android, iOS, and the web, all in one place.',

            'adult.title': '18+ Resources',
            'adult.tagline': 'Adult websites, apps, VR porn, and hentai/anime (18+) — third-party links only.',
            'adult.warningTitle': '18+ Content Warning',
            'adult.enter': 'I am 18 or older — Enter',
            'adult.leave': 'I am under 18 — Leave',
            'adult.revealBtn': 'Click to Reveal Links',
        },
        es: {
            'nav.home': 'Inicio', 'nav.index': 'Índice', 'nav.guides': 'Guías', 'nav.mylists': 'Mis Listas',
            'nav.notes': 'Notas', 'nav.socials': 'Redes', 'nav.sitemap': 'Mapa del Sitio',
            'nav.privacySettings': 'Ajustes de Privacidad', 'nav.privacy': 'Privacidad', 'nav.disclaimer': 'Aviso Legal',
            'nav.dmca': 'DMCA', 'nav.donate': 'Donar', 'nav.adult': '18+',

            'common.settings': 'Configuración', 'common.guide': 'Guía', 'common.close': 'Cerrar',
            'common.save': 'Guardar', 'common.cancel': 'Cancelar', 'common.language': 'Idioma',
            'common.backToTop': 'Volver Arriba', 'common.continue': 'Continuar', 'common.verify': 'Verificar',
            'common.mobileNoteSummary': 'Nota para móviles',

            'list.tagline': 'Un directorio curado de apps de código abierto, herramientas de privacidad, utilidades de streaming y más. Explora categorías, busca por etiquetas, guarda tus favoritos y consulta las guías para PC, Android, iOS y la web.',
            'list.checkOutPages': 'Explora estas páginas',
            'list.categoriesHeading': 'Categorías',
            'list.searchPlaceholder': 'Buscar apps, herramientas y servicios...',
            'list.randomApp': 'App Aleatoria',
            'list.share': 'Compartir',
            'list.searchDDG': 'Buscar en DuckDuckGo',
            'list.searchNote': 'Algunas apps encajan en más de una categoría. Si no encuentras lo que buscas, prueba otro filtro o busca por nombre.',
            'list.checkOutCategories': 'Explora estas categorías',
            'list.noResults': 'No se encontraron resultados.',

            'filter.all': 'Todo', 'filter.streaming': 'Streaming', 'filter.anime': 'Anime', 'filter.manga': 'Manga',
            'filter.tools': 'Herramientas', 'filter.download': 'Descargas', 'filter.android': 'Android', 'filter.pc': 'PC',
            'filter.ios': 'iOS', 'filter.ai': 'IA', 'filter.gaming': 'Juegos', 'filter.privacy': 'Privacidad',
            'filter.modding': 'Modding', 'filter.retro': 'Retro', 'filter.community': 'Comunidad',

            'footer.donateNotice': 'Todos los recursos listados son de terceros. Si este índice te resulta útil, considera hacer una donación.',
            'footer.contactNote': '¿Ves algún problema o falta alguna fuente? Ponte en contacto y avísame.',
            'footer.otherIndexes': 'Otros Índices Útiles:',
            'footer.showIndexes': 'Mostrar Índices',
            'footer.mobileNote': 'Usuarios de móvil: desliza o arrastra para ver más botones',

            'gate.title': 'Verificar para Continuar',
            'gate.clickContinue': 'Haz clic abajo para continuar.',
            'gate.continueBtn': 'Entiendo y Continúo',

            'guides.title': 'Guías y Tutoriales',
            'guides.notice': 'Por favor lee esto — estas guías te ayudan a usar el índice de forma segura y eficaz.',
            'guides.intro': 'Estas guías están pensadas para ayudarte a empezar con las apps y herramientas de código abierto listadas en el índice principal. Son solo con fines informativos.',
            'guides.about.title': 'Sobre Neko\u2019s Index',
            'guides.about.body': 'Neko\u2019s Index es un directorio gratuito y curado por la comunidad de apps de código abierto, herramientas de privacidad, utilidades de streaming, recursos de emulación y más. No aloja archivos ni contenido con derechos de autor: solo enlaza a proyectos y servicios de terceros. El objetivo es facilitar el descubrimiento de software seguro, de código abierto y respetuoso con la privacidad para PC, Android, iOS y la web, todo en un solo lugar.',

            'adult.title': 'Recursos 18+',
            'adult.tagline': 'Sitios, apps, VR porno y hentai/anime (18+) para adultos — solo enlaces de terceros.',
            'adult.warningTitle': 'Advertencia de Contenido 18+',
            'adult.enter': 'Tengo 18 años o más — Entrar',
            'adult.leave': 'Soy menor de 18 — Salir',
            'adult.revealBtn': 'Haz Clic para Revelar Enlaces',
        },
        fr: {
            'nav.home': 'Accueil', 'nav.index': 'Index', 'nav.guides': 'Guides', 'nav.mylists': 'Mes Listes',
            'nav.notes': 'Notes', 'nav.socials': 'Réseaux', 'nav.sitemap': 'Plan du Site',
            'nav.privacySettings': 'Paramètres de Confidentialité', 'nav.privacy': 'Confidentialité', 'nav.disclaimer': 'Avertissement',
            'nav.dmca': 'DMCA', 'nav.donate': 'Faire un Don', 'nav.adult': '18+',

            'common.settings': 'Paramètres', 'common.guide': 'Guide', 'common.close': 'Fermer',
            'common.save': 'Enregistrer', 'common.cancel': 'Annuler', 'common.language': 'Langue',
            'common.backToTop': 'Haut de Page', 'common.continue': 'Continuer', 'common.verify': 'Vérifier',
            'common.mobileNoteSummary': 'Note mobile',

            'list.tagline': 'Un répertoire d\u2019applications open-source, d\u2019outils de confidentialité, d\u2019utilitaires de streaming et plus encore. Parcourez les catégories, recherchez par tag, enregistrez vos favoris et consultez les guides pour PC, Android, iOS et le web.',
            'list.checkOutPages': 'Découvrez ces pages',
            'list.categoriesHeading': 'Catégories',
            'list.searchPlaceholder': 'Rechercher des apps, outils et services...',
            'list.randomApp': 'App Aléatoire',
            'list.share': 'Partager',
            'list.searchDDG': 'Rechercher sur DuckDuckGo',
            'list.searchNote': 'Certaines apps appartiennent à plusieurs catégories. Si vous ne trouvez pas ce que vous cherchez, essayez un autre filtre ou recherchez par nom.',
            'list.checkOutCategories': 'Découvrez ces catégories',
            'list.noResults': 'Aucun résultat trouvé.',

            'filter.all': 'Tout', 'filter.streaming': 'Streaming', 'filter.anime': 'Anime', 'filter.manga': 'Manga',
            'filter.tools': 'Outils', 'filter.download': 'Téléchargements', 'filter.android': 'Android', 'filter.pc': 'PC',
            'filter.ios': 'iOS', 'filter.ai': 'IA', 'filter.gaming': 'Jeux', 'filter.privacy': 'Confidentialité',
            'filter.modding': 'Modding', 'filter.retro': 'Rétro', 'filter.community': 'Communauté',

            'footer.donateNotice': 'Toutes les ressources listées sont tierces. Si cet index vous est utile, pensez à faire un don.',
            'footer.contactNote': 'Vous remarquez un problème ou une source manquante ? Contactez-moi pour me le signaler.',
            'footer.otherIndexes': 'Autres Index Utiles :',
            'footer.showIndexes': 'Afficher les Index',
            'footer.mobileNote': 'Utilisateurs mobiles : faites défiler ou glissez pour voir plus de boutons',

            'gate.title': 'Vérifier pour Continuer',
            'gate.clickContinue': 'Cliquez ci-dessous pour continuer.',
            'gate.continueBtn': 'Je Comprends et Continue',

            'guides.title': 'Guides et Tutoriels',
            'guides.notice': 'Merci de lire ceci — ces guides vous aident à utiliser l\u2019index en toute sécurité et efficacement.',
            'guides.intro': 'Ces guides visent à vous aider à démarrer avec les applications et outils open-source listés sur l\u2019index principal. Elles sont uniquement à titre informatif.',
            'guides.about.title': 'À propos de Neko\u2019s Index',
            'guides.about.body': 'Neko\u2019s Index est un répertoire gratuit, géré par la communauté, d\u2019applications open-source, d\u2019outils de confidentialité, d\u2019utilitaires de streaming, de ressources d\u2019émulation et plus encore. Il n\u2019héberge aucun fichier ni contenu protégé par des droits d\u2019auteur : il ne fait que renvoyer vers des projets et services tiers. L\u2019objectif est de faciliter la découverte de logiciels sûrs, open-source et respectueux de la vie privée pour PC, Android, iOS et le web, tout au même endroit.',

            'adult.title': 'Ressources 18+',
            'adult.tagline': 'Sites, applications, VR porno et hentai/anime (18+) pour adultes — liens tiers uniquement.',
            'adult.warningTitle': 'Avertissement de Contenu 18+',
            'adult.enter': 'J\u2019ai 18 ans ou plus — Entrer',
            'adult.leave': 'J\u2019ai moins de 18 ans — Quitter',
            'adult.revealBtn': 'Cliquez pour Révéler les Liens',
        },
        de: {
            'nav.home': 'Startseite', 'nav.index': 'Index', 'nav.guides': 'Anleitungen', 'nav.mylists': 'Meine Listen',
            'nav.notes': 'Notizen', 'nav.socials': 'Soziale Medien', 'nav.sitemap': 'Sitemap',
            'nav.privacySettings': 'Datenschutzeinstellungen', 'nav.privacy': 'Datenschutz', 'nav.disclaimer': 'Haftungsausschluss',
            'nav.dmca': 'DMCA', 'nav.donate': 'Spenden', 'nav.adult': '18+',

            'common.settings': 'Einstellungen', 'common.guide': 'Anleitung', 'common.close': 'Schließen',
            'common.save': 'Speichern', 'common.cancel': 'Abbrechen', 'common.language': 'Sprache',
            'common.backToTop': 'Nach Oben', 'common.continue': 'Weiter', 'common.verify': 'Bestätigen',
            'common.mobileNoteSummary': 'Hinweis für Mobilgeräte',

            'list.tagline': 'Ein kuratiertes Verzeichnis von Open-Source-Apps, Datenschutz-Tools, Streaming-Hilfsprogrammen und mehr. Durchsuche Kategorien, filtere nach Tags, speichere deine Favoriten und schau in die Anleitungen für PC, Android, iOS und das Web.',
            'list.checkOutPages': 'Diese Seiten ansehen',
            'list.categoriesHeading': 'Kategorien',
            'list.searchPlaceholder': 'Apps, Tools und Dienste suchen...',
            'list.randomApp': 'Zufällige App',
            'list.share': 'Teilen',
            'list.searchDDG': 'Auf DuckDuckGo suchen',
            'list.searchNote': 'Manche Apps passen in mehrere Kategorien. Wenn du nicht findest, was du suchst, probiere einen anderen Filter oder suche nach Namen.',
            'list.checkOutCategories': 'Diese Kategorien ansehen',
            'list.noResults': 'Keine Ergebnisse gefunden.',

            'filter.all': 'Alle', 'filter.streaming': 'Streaming', 'filter.anime': 'Anime', 'filter.manga': 'Manga',
            'filter.tools': 'Tools', 'filter.download': 'Downloads', 'filter.android': 'Android', 'filter.pc': 'PC',
            'filter.ios': 'iOS', 'filter.ai': 'KI', 'filter.gaming': 'Gaming', 'filter.privacy': 'Datenschutz',
            'filter.modding': 'Modding', 'filter.retro': 'Retro', 'filter.community': 'Community',

            'footer.donateNotice': 'Alle aufgeführten Ressourcen sind Drittanbieter. Wenn du diesen Index nützlich findest, erwäge bitte eine Spende.',
            'footer.contactNote': 'Fällt dir ein Problem oder eine fehlende Quelle auf? Bitte melde dich und lass es mich wissen.',
            'footer.otherIndexes': 'Weitere Nützliche Indexe:',
            'footer.showIndexes': 'Indexe Anzeigen',
            'footer.mobileNote': 'Für Mobilgeräte: scrollen oder ziehen, um weitere Buttons zu sehen',

            'gate.title': 'Bestätigen um Fortzufahren',
            'gate.clickContinue': 'Klicke unten, um fortzufahren.',
            'gate.continueBtn': 'Verstanden & Weiter',

            'guides.title': 'Anleitungen & How-Tos',
            'guides.notice': 'Bitte lesen — diese Anleitungen helfen dir, den Index sicher und effektiv zu nutzen.',
            'guides.intro': 'Diese Anleitungen sollen dir den Einstieg in die im Hauptindex aufgeführten Open-Source-Apps und Tools erleichtern. Sie dienen nur zu Informationszwecken.',
            'guides.about.title': 'Über Neko\u2019s Index',
            'guides.about.body': 'Neko\u2019s Index ist ein kostenloses, von der Community kuratiertes Verzeichnis von Open-Source-Apps, Datenschutz-Tools, Streaming-Hilfsprogrammen, Emulations-Ressourcen und mehr. Es hostet keine Dateien oder urheberrechtlich geschützten Inhalte — es verlinkt nur auf Projekte und Dienste Dritter. Ziel ist es, sichere, Open-Source- und datenschutzfreundliche Software für PC, Android, iOS und das Web an einem zentralen Ort auffindbar zu machen.',

            'adult.title': '18+ Ressourcen',
            'adult.tagline': 'Erwachsenen-Websites, Apps, VR-Porno und Hentai/Anime (18+) — nur Links zu Drittanbietern.',
            'adult.warningTitle': '18+ Inhaltswarnung',
            'adult.enter': 'Ich bin 18 oder älter — Eintreten',
            'adult.leave': 'Ich bin unter 18 — Verlassen',
            'adult.revealBtn': 'Klicken, um Links Anzuzeigen',
        },
        pt: {
            'nav.home': 'Início', 'nav.index': 'Índice', 'nav.guides': 'Guias', 'nav.mylists': 'Minhas Listas',
            'nav.notes': 'Notas', 'nav.socials': 'Redes Sociais', 'nav.sitemap': 'Mapa do Site',
            'nav.privacySettings': 'Configurações de Privacidade', 'nav.privacy': 'Privacidade', 'nav.disclaimer': 'Aviso Legal',
            'nav.dmca': 'DMCA', 'nav.donate': 'Doar', 'nav.adult': '18+',

            'common.settings': 'Configurações', 'common.guide': 'Guia', 'common.close': 'Fechar',
            'common.save': 'Salvar', 'common.cancel': 'Cancelar', 'common.language': 'Idioma',
            'common.backToTop': 'Voltar ao Topo', 'common.continue': 'Continuar', 'common.verify': 'Verificar',
            'common.mobileNoteSummary': 'Nota para celular',

            'list.tagline': 'Um diretório selecionado de apps de código aberto, ferramentas de privacidade, utilitários de streaming e muito mais. Navegue por categorias, pesquise por tags, salve seus favoritos e confira os guias para PC, Android, iOS e a web.',
            'list.checkOutPages': 'Confira estas páginas',
            'list.categoriesHeading': 'Categorias',
            'list.searchPlaceholder': 'Pesquisar apps, ferramentas e serviços...',
            'list.randomApp': 'App Aleatório',
            'list.share': 'Compartilhar',
            'list.searchDDG': 'Pesquisar no DuckDuckGo',
            'list.searchNote': 'Alguns apps se encaixam em mais de uma categoria. Se não encontrar o que precisa, tente outro filtro ou pesquise pelo nome.',
            'list.checkOutCategories': 'Confira estas categorias',
            'list.noResults': 'Nenhum resultado encontrado.',

            'filter.all': 'Todos', 'filter.streaming': 'Streaming', 'filter.anime': 'Anime', 'filter.manga': 'Mangá',
            'filter.tools': 'Ferramentas', 'filter.download': 'Downloads', 'filter.android': 'Android', 'filter.pc': 'PC',
            'filter.ios': 'iOS', 'filter.ai': 'IA', 'filter.gaming': 'Jogos', 'filter.privacy': 'Privacidade',
            'filter.modding': 'Modding', 'filter.retro': 'Retrô', 'filter.community': 'Comunidade',

            'footer.donateNotice': 'Todos os recursos listados são de terceiros. Se este índice for útil para você, considere fazer uma doação.',
            'footer.contactNote': 'Notou algum problema ou fonte faltando? Entre em contato e me avise.',
            'footer.otherIndexes': 'Outros Índices Úteis:',
            'footer.showIndexes': 'Mostrar Índices',
            'footer.mobileNote': 'Usuários de celular: role ou arraste para ver mais botões',

            'gate.title': 'Verificar para Continuar',
            'gate.clickContinue': 'Clique abaixo para continuar.',
            'gate.continueBtn': 'Entendi e Quero Continuar',

            'guides.title': 'Guias e Tutoriais',
            'guides.notice': 'Por favor, leia — estes guias ajudam você a usar o índice com segurança e eficácia.',
            'guides.intro': 'Estes guias servem para ajudar você a começar com os apps e ferramentas de código aberto listados no índice principal. São apenas para fins informativos.',
            'guides.about.title': 'Sobre o Neko\u2019s Index',
            'guides.about.body': 'O Neko\u2019s Index é um diretório gratuito, mantido pela comunidade, de apps de código aberto, ferramentas de privacidade, utilitários de streaming, recursos de emulação e muito mais. Ele não hospeda arquivos ou conteúdo protegido por direitos autorais — apenas cria links para projetos e serviços de terceiros. O objetivo é facilitar a descoberta de softwares seguros, de código aberto e que respeitam a privacidade para PC, Android, iOS e a web, tudo em um só lugar.',

            'adult.title': 'Recursos 18+',
            'adult.tagline': 'Sites, apps, VR pornô e hentai/anime (18+) adultos — apenas links de terceiros.',
            'adult.warningTitle': 'Aviso de Conteúdo 18+',
            'adult.enter': 'Tenho 18 anos ou mais — Entrar',
            'adult.leave': 'Tenho menos de 18 anos — Saír',
            'adult.revealBtn': 'Clique para Revelar os Links',
        },
        ja: {
            'nav.home': 'ホーム', 'nav.index': 'インデックス', 'nav.guides': 'ガイド', 'nav.mylists': 'マイリスト',
            'nav.notes': 'ノート', 'nav.socials': 'ソーシャル', 'nav.sitemap': 'サイトマップ',
            'nav.privacySettings': 'プライバシー設定', 'nav.privacy': 'プライバシー', 'nav.disclaimer': '免責事項',
            'nav.dmca': 'DMCA', 'nav.donate': '寄付', 'nav.adult': '18+',

            'common.settings': '設定', 'common.guide': 'ガイド', 'common.close': '閉じる',
            'common.save': '保存', 'common.cancel': 'キャンセル', 'common.language': '言語',
            'common.backToTop': 'トップへ戻る', 'common.continue': '続ける', 'common.verify': '確認',
            'common.mobileNoteSummary': 'モバイル向けの注記',

            'list.tagline': 'オープンソースアプリ、プライバシーツール、ストリーミングユーティリティなどを厳選したディレクトリです。カテゴリを閲覧し、タグで検索し、お気に入りを保存し、PC・Android・iOS・Web向けのガイドをご確認ください。',
            'list.checkOutPages': 'これらのページをチェック',
            'list.categoriesHeading': 'カテゴリ',
            'list.searchPlaceholder': 'アプリ、ツール、サービスを検索...',
            'list.randomApp': 'ランダムアプリ',
            'list.share': '共有',
            'list.searchDDG': 'DuckDuckGoで検索',
            'list.searchNote': '一部のアプリは複数のカテゴリに当てはまります。目的のものが見つからない場合は、別のフィルターを試すか名前で検索してください。',
            'list.checkOutCategories': 'これらのカテゴリをチェック',
            'list.noResults': '結果が見つかりません。',

            'filter.all': 'すべて', 'filter.streaming': 'ストリーミング', 'filter.anime': 'アニメ', 'filter.manga': 'マンガ',
            'filter.tools': 'ツール', 'filter.download': 'ダウンロード', 'filter.android': 'Android', 'filter.pc': 'PC',
            'filter.ios': 'iOS', 'filter.ai': 'AI', 'filter.gaming': 'ゲーム', 'filter.privacy': 'プライバシー',
            'filter.modding': 'Modding', 'filter.retro': 'レトロ', 'filter.community': 'コミュニティ',

            'footer.donateNotice': '掲載されているリソースはすべて第三者のものです。このインデックスが役に立ったら、寄付をご検討ください。',
            'footer.contactNote': '問題や不足しているリソースに気づきましたか？ご連絡ください。',
            'footer.otherIndexes': '他の便利なインデックス：',
            'footer.showIndexes': 'インデックスを表示',
            'footer.mobileNote': 'モバイルの方はスクロールまたはドラッグしてボタンを表示できます',

            'gate.title': '続けるには確認してください',
            'gate.clickContinue': '下のボタンをクリックして続けてください。',
            'gate.continueBtn': '理解しました・続ける',

            'guides.title': 'ガイド＆使い方',
            'guides.notice': 'このガイドはインデックスを安全かつ効果的に使うためのものです。',
            'guides.intro': 'これらのガイドは、メインインデックスに掲載されているオープンソースアプリやツールを使い始めるためのものです。情報提供のみを目的としています。',
            'guides.about.title': "Neko's Indexについて",
            'guides.about.body': "Neko's Indexは、オープンソースアプリ、プライバシーツール、ストリーミングユーティリティ、エミュレーションリソースなどを集めた無料のコミュニティ主導型ディレクトリです。ファイルや著作権付きコンテンツは一切ホストしておらず、第三者のプロジェクトやサービスへのリンクのみを提供しています。目的は、PC・Android・iOS・Web向けの安全でオープンソースかつプライバシーに配慮したソフトウェアを、ひとつの場所で簡単に見つけられるようにすることです。",

            'adult.title': '18+ リソース',
            'adult.tagline': 'アダルトサイト、アプリ、VRポルノ、ヘンタイ/アニメ（18+）— 第三者リンクのみです。',
            'adult.warningTitle': '18+ コンテンツ警告',
            'adult.enter': '18歳以上です — 入る',
            'adult.leave': '18歳未満です — 離れる',
            'adult.revealBtn': 'クリックしてリンクを表示',
        },
        zh: {
            'nav.home': '首页', 'nav.index': '索引', 'nav.guides': '指南', 'nav.mylists': '我的列表',
            'nav.notes': '笔记', 'nav.socials': '社交', 'nav.sitemap': '网站地图',
            'nav.privacySettings': '隐私设置', 'nav.privacy': '隐私政策', 'nav.disclaimer': '免责声明',
            'nav.dmca': 'DMCA', 'nav.donate': '捐赠', 'nav.adult': '18+',

            'common.settings': '设置', 'common.guide': '指南', 'common.close': '关闭',
            'common.save': '保存', 'common.cancel': '取消', 'common.language': '语言',
            'common.backToTop': '返回顶部', 'common.continue': '继续', 'common.verify': '验证',
            'common.mobileNoteSummary': '移动端提示',

            'list.tagline': '精选的开源应用、隐私工具、流媒体实用程序等目录。浏览分类、按标签搜索、保存收藏，并查看适用于 PC、Android、iOS 和网页的指南。',
            'list.checkOutPages': '查看这些页面',
            'list.categoriesHeading': '分类',
            'list.searchPlaceholder': '搜索应用、工具和服务...',
            'list.randomApp': '随机应用',
            'list.share': '分享',
            'list.searchDDG': '在 DuckDuckGo 上搜索',
            'list.searchNote': '有些应用属于多个分类。如果没有找到所需内容，请尝试其他筛选条件或按名称搜索。',
            'list.checkOutCategories': '查看这些分类',
            'list.noResults': '未找到结果。',

            'filter.all': '全部', 'filter.streaming': '流媒体', 'filter.anime': '动漫', 'filter.manga': '漫画',
            'filter.tools': '工具', 'filter.download': '下载', 'filter.android': 'Android', 'filter.pc': 'PC',
            'filter.ios': 'iOS', 'filter.ai': 'AI', 'filter.gaming': '游戏', 'filter.privacy': '隐私',
            'filter.modding': '模组', 'filter.retro': '复古', 'filter.community': '社区',

            'footer.donateNotice': '所有列出的资源均为第三方资源。如果您觉得此索引有用，欢迎考虑捐赠支持。',
            'footer.contactNote': '发现问题或缺少资源？请联系我告知。',
            'footer.otherIndexes': '其他有用的索引：',
            'footer.showIndexes': '显示索引',
            'footer.mobileNote': '移动端用户：滚动或拖动以查看更多按钮',

            'gate.title': '请验证以继续',
            'gate.clickContinue': '点击下方按钮继续。',
            'gate.continueBtn': '我已了解并继续',

            'guides.title': '指南与教程',
            'guides.notice': '请阅读 — 这些指南可以帮助您安全有效地使用本索引。',
            'guides.intro': '这些指南旨在帮助您开始使用主索引中列出的开源应用和工具，仅供参考。',
            'guides.about.title': '关于 Neko\u2019s Index',
            'guides.about.body': "Neko's Index 是一个免费的、由社区维护的目录，收录开源应用、隐私工具、流媒体实用程序、模拟器资源等。它不托管任何文件或受版权保护的内容——仅链接到第三方项目和服务。其目标是让您可以在一个地方轻松发现适用于 PC、Android、iOS 和网页的安全、开源且尊重隐私的软件。",

            'adult.title': '18+ 资源',
            'adult.tagline': '成人网站、应用、VR 色情内容和成人向动漫/漫画（18+）— 仅为第三方链接。',
            'adult.warningTitle': '18+ 内容警告',
            'adult.enter': '我已满18岁 — 进入',
            'adult.leave': '我未满18岁 — 离开',
            'adult.revealBtn': '点击显示链接',
        },
        hi: {
            'nav.home': 'होम', 'nav.index': 'इंडेक्स', 'nav.guides': 'गाइड्स', 'nav.mylists': 'मेरी सूचियाँ',
            'nav.notes': 'नोट्स', 'nav.socials': 'सोशल', 'nav.sitemap': 'साइटमैप',
            'nav.privacySettings': 'प्राइवेसी सेटिंग्स', 'nav.privacy': 'प्राइवेसी', 'nav.disclaimer': 'अस्वीकरण',
            'nav.dmca': 'DMCA', 'nav.donate': 'दान करें', 'nav.adult': '18+',

            'common.settings': 'सेटिंग्स', 'common.guide': 'गाइड', 'common.close': 'बंद करें',
            'common.save': 'सहेजें', 'common.cancel': 'रद्द करें', 'common.language': 'भाषा',
            'common.backToTop': 'ऊपर जाएं', 'common.continue': 'जारी रखें', 'common.verify': 'सत्यापित करें',
            'common.mobileNoteSummary': 'मोबाइल नोट',

            'list.tagline': 'ओपन-सोर्स ऐप्स, प्राइवेसी टूल्स, स्ट्रीमिंग यूटिलिटीज़ और भी बहुत कुछ की एक क्यूरेटेड डायरेक्टरी। श्रेणियाँ ब्राउज़ करें, टैग से खोजें, अपने पसंदीदा सहेजें, और PC, Android, iOS और वेब के लिए गाइड देखें।',
            'list.checkOutPages': 'ये पेज देखें',
            'list.categoriesHeading': 'श्रेणियाँ',
            'list.searchPlaceholder': 'ऐप्स, टूल्स और सेवाएं खोजें...',
            'list.randomApp': 'रैंडम ऐप',
            'list.share': 'शेयर करें',
            'list.searchDDG': 'DuckDuckGo पर खोजें',
            'list.searchNote': 'कुछ ऐप्स एक से अधिक श्रेणी में आते हैं। यदि आपको जो चाहिए वह नहीं मिल रहा है, तो कोई और फ़िल्टर आज़माएं या नाम से खोजें।',
            'list.checkOutCategories': 'ये श्रेणियाँ देखें',
            'list.noResults': 'कोई परिणाम नहीं मिला।',

            'filter.all': 'सभी', 'filter.streaming': 'स्ट्रीमिंग', 'filter.anime': 'एनीमे', 'filter.manga': 'मांगा',
            'filter.tools': 'टूल्स', 'filter.download': 'डाउनलोड्स', 'filter.android': 'Android', 'filter.pc': 'PC',
            'filter.ios': 'iOS', 'filter.ai': 'AI', 'filter.gaming': 'गेमिंग', 'filter.privacy': 'प्राइवेसी',
            'filter.modding': 'मॉडिंग', 'filter.retro': 'रेट्रो', 'filter.community': 'समुदाय',

            'footer.donateNotice': 'सूचीबद्ध सभी संसाधन थर्ड-पार्टी हैं। यदि यह इंडेक्स आपके लिए उपयोगी है, तो कृपया दान करने पर विचार करें।',
            'footer.contactNote': 'कोई समस्या या कोई स्रोत गायब दिखा? कृपया संपर्क करें और मुझे बताएं।',
            'footer.otherIndexes': 'अन्य उपयोगी इंडेक्स:',
            'footer.showIndexes': 'इंडेक्स दिखाएं',
            'footer.mobileNote': 'मोबाइल यूज़र्स: अधिक बटन देखने के लिए स्क्रॉल या ड्रैग करें',

            'gate.title': 'जारी रखने के लिए सत्यापित करें',
            'gate.clickContinue': 'जारी रखने के लिए नीचे क्लिक करें।',
            'gate.continueBtn': 'मैं समझता/समझती हूँ और जारी रखता/रखती हूँ',

            'guides.title': 'गाइड्स और हाउ-टू',
            'guides.notice': 'कृपया पढ़ें — ये गाइड्स आपको इंडेक्स को सुरक्षित और प्रभावी ढंग से उपयोग करने में मदद करते हैं।',
            'guides.intro': 'ये गाइड्स आपको मुख्य इंडेक्स में सूचीबद्ध ओपन-सोर्स ऐप्स और टूल्स के साथ शुरुआत करने में मदद करने के लिए हैं। ये केवल सूचनात्मक उद्देश्यों के लिए हैं।',
            'guides.about.title': "Neko's Index के बारे में",
            'guides.about.body': "Neko's Index ओपन-सोर्स ऐप्स, प्राइवेसी टूल्स, स्ट्रीमिंग यूटिलिटीज़, एमुलेशन संसाधनों और भी बहुत कुछ की एक मुफ्त, समुदाय द्वारा क्यूरेट की गई डायरेक्टरी है। यह किसी भी फाइल या कॉपीराइट सामग्री को होस्ट नहीं करता — यह केवल थर्ड-पार्टी प्रोजेक्ट्स और सेवाओं से लिंक करता है। इसका लक्ष्य PC, Android, iOS और वेब के लिए सुरक्षित, ओपन-सोर्स और प्राइवेसी का सम्मान करने वाले सॉफ़्टवेयर को एक ही जगह पर खोजना आसान बनाना है।",

            'adult.title': '18+ संसाधन',
            'adult.tagline': 'एडल्ट वेबसाइट्स, ऐप्स, VR पोर्न, और हेंताई/एनीमे (18+) — केवल थर्ड-पार्टी लिंक।',
            'adult.warningTitle': '18+ सामग्री चेतावनी',
            'adult.enter': 'मैं 18 वर्ष या उससे अधिक का हूँ — प्रवेश करें',
            'adult.leave': 'मैं 18 वर्ष से कम का हूँ — छोड़ें',
            'adult.revealBtn': 'लिंक देखने के लिए क्लिक करें',
        },
    };

    function getLang() {
        return localStorage.getItem(STORAGE_KEY) || 'en';
    }

    function t(key) {
        const lang = getLang();
        const dict = DICT[lang] || DICT.en;
        return dict[key] || DICT.en[key] || key;
    }

    function applyAll() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            el.title = t(el.getAttribute('data-i18n-title'));
        });
    }

    function populateSelect(select) {
        if (select.dataset.nekoPopulated === 'true') return;
        select.innerHTML = '';
        LANGS.forEach(l => {
            const opt = document.createElement('option');
            opt.value = l.code;
            opt.textContent = l.name;
            select.appendChild(opt);
        });
        select.value = getLang();
        select.dataset.nekoPopulated = 'true';
        select.addEventListener('change', () => setLang(select.value));
    }

    function populateAllSelects() {
        document.querySelectorAll('select.neko-lang-select').forEach(populateSelect);
    }

    function syncSelects() {
        document.querySelectorAll('.neko-lang-select').forEach(sel => {
            sel.value = getLang();
        });
    }

    function setLang(code) {
        localStorage.setItem(STORAGE_KEY, code);
        document.documentElement.lang = code;
        applyAll();
        syncSelects();
        document.dispatchEvent(new CustomEvent('nekoLangChange', { detail: { lang: code } }));
    }

    function buildSelect(extraClass) {
        const select = document.createElement('select');
        select.className = 'neko-lang-select' + (extraClass ? ' ' + extraClass : '');
        select.setAttribute('aria-label', 'Language');
        populateSelect(select);
        return select;
    }

    function ensureSwitcherStyles() {
        if (document.getElementById('nekoLangSwitcherStyle')) return;
        const style = document.createElement('style');
        style.id = 'nekoLangSwitcherStyle';
        style.textContent = `
            @keyframes nekoLangFadeIn {
                from { opacity: 0; transform: translateY(-6px); }
                to { opacity: 1; transform: translateY(0); }
            }
            #nekoLangSwitcher {
                animation: nekoLangFadeIn 0.4s ease-out;
            }
            #nekoLangSwitcher select.neko-lang-floating {
                transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
            }
            #nekoLangSwitcher select.neko-lang-floating:hover {
                transform: translateY(-1px);
                border-color: #3b82f6;
                box-shadow: 0 6px 18px rgba(59, 130, 246, 0.3);
            }
        `;
        document.head.appendChild(style);
    }

    function injectFloatingSwitcher() {
        if (document.getElementById('nekoLangSwitcher')) return;
        ensureSwitcherStyles();
        const wrap = document.createElement('div');
        wrap.id = 'nekoLangSwitcher';
        wrap.style.cssText = 'position:fixed; top:12px; right:12px; z-index:9998;';
        const select = buildSelect('neko-lang-floating');
        select.style.cssText = 'background:#1c1c1f; color:#fff; border:1px solid #27272a; border-radius:8px; padding:6px 10px; font-size:12px; cursor:pointer; box-shadow:0 4px 14px rgba(0,0,0,0.35);';
        select.setAttribute('title', 'Language / Idioma / Langue / Sprache / 言語 / 语言 / भाषा');
        wrap.appendChild(select);
        document.body.appendChild(wrap);
    }

    function init() {
        document.documentElement.lang = getLang();
        injectFloatingSwitcher();
        populateAllSelects();
        applyAll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.NekoI18n = { t, getLang, setLang, applyAll, buildSelect, LANGS };
})();
