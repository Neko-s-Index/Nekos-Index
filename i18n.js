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

            'list.tagline': 'A hand-picked list of open-source apps and privacy tools that actually work. Search by name or tag, star the ones you like, and check the guides if you\u2019re not sure where to start.',
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

            'gate.title': 'Welcome to Neko\u2019s Index',
            'gate.clickContinue': 'Click below to continue.',
            'gate.continueBtn': 'I Understand & Continue',

            'guides.title': 'Guides & How-To',
            'guides.notice': 'Please read — these guides can help you use the index safely and effectively.',
            'guides.intro': 'These guides are meant to help you get started with open-source apps and tools listed on the main index. They are for informational purposes only.',
            'guides.about.title': 'About Neko\u2019s Index',
            'guides.about.body': 'Neko\u2019s Index started as a personal list of open-source apps and privacy tools worth using, and it grew from there. It\u2019s free, and it\u2019s just links \u2014 nothing is hosted here. The point is to make it a little easier to find software that respects your privacy and doesn\u2019t lock you in, whether you\u2019re on PC, Android, iOS, or just browsing.',

            'adult.title': '18+ Resources',
            'adult.tagline': 'Adult websites, apps, VR porn, and hentai/anime (18+) — third-party links only.',
            'adult.warningTitle': '18+ Content Warning',
            'adult.enter': 'I am 18 or older — Enter',
            'adult.leave': 'I am under 18 — Leave',
            'adult.revealBtn': 'Click to Reveal Links',
            'adult.revealNote': 'Resource links are blurred until revealed.',
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

            'list.tagline': 'Una lista de apps de código abierto y herramientas de privacidad que realmente funcionan. Busca por nombre o etiqueta, marca tus favoritas y consulta las guías si no sabes por dónde empezar.',
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

            'gate.title': 'Bienvenido a Neko\u2019s Index',
            'gate.clickContinue': 'Haz clic abajo para continuar.',
            'gate.continueBtn': 'Entiendo y Continúo',

            'guides.title': 'Guías y Tutoriales',
            'guides.notice': 'Por favor lee esto — estas guías te ayudan a usar el índice de forma segura y eficaz.',
            'guides.intro': 'Estas guías están pensadas para ayudarte a empezar con las apps y herramientas de código abierto listadas en el índice principal. Son solo con fines informativos.',
            'guides.about.title': 'Sobre Neko\u2019s Index',
            'guides.about.body': 'Neko\u2019s Index empezó como una lista personal de apps de código abierto y herramientas de privacidad que valían la pena, y creció a partir de ahí. Es gratis, y son solo enlaces: aquí no se aloja nada. La idea es facilitar un poco encontrar software que respete tu privacidad y no te encierre, ya sea en PC, Android, iOS o desde el navegador.',

            'adult.title': 'Recursos 18+',
            'adult.tagline': 'Sitios, apps, VR porno y hentai/anime (18+) para adultos — solo enlaces de terceros.',
            'adult.warningTitle': 'Advertencia de Contenido 18+',
            'adult.enter': 'Tengo 18 años o más — Entrar',
            'adult.leave': 'Soy menor de 18 — Salir',
            'adult.revealBtn': 'Haz Clic para Revelar Enlaces',
            'adult.revealNote': 'Los enlaces de recursos están difuminados hasta que se revelen.',
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

            'list.tagline': 'Une liste d\u2019applications open-source et d\u2019outils de confidentialité qui fonctionnent vraiment. Recherchez par nom ou par tag, mettez vos favoris de côté, et consultez les guides si vous ne savez pas par où commencer.',
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

            'gate.title': 'Bienvenue sur Neko\u2019s Index',
            'gate.clickContinue': 'Cliquez ci-dessous pour continuer.',
            'gate.continueBtn': 'Je Comprends et Continue',

            'guides.title': 'Guides et Tutoriels',
            'guides.notice': 'Merci de lire ceci — ces guides vous aident à utiliser l\u2019index en toute sécurité et efficacement.',
            'guides.intro': 'Ces guides visent à vous aider à démarrer avec les applications et outils open-source listés sur l\u2019index principal. Elles sont uniquement à titre informatif.',
            'guides.about.title': 'À propos de Neko\u2019s Index',
            'guides.about.body': 'Neko\u2019s Index a commencé comme une liste personnelle d\u2019applications open-source et d\u2019outils de confidentialité qui en valaient la peine, puis ça a grandi. C\u2019est gratuit, et ce ne sont que des liens \u2014 rien n\u2019est héberg\u00e9 ici. L\u2019idée, c\u2019est de faciliter un peu la découverte de logiciels qui respectent votre vie privée et ne vous enferment pas, que vous soyez sur PC, Android, iOS ou simplement en train de naviguer.',

            'adult.title': 'Ressources 18+',
            'adult.tagline': 'Sites, applications, VR porno et hentai/anime (18+) pour adultes — liens tiers uniquement.',
            'adult.warningTitle': 'Avertissement de Contenu 18+',
            'adult.enter': 'J\u2019ai 18 ans ou plus — Entrer',
            'adult.leave': 'J\u2019ai moins de 18 ans — Quitter',
            'adult.revealBtn': 'Cliquez pour Révéler les Liens',
            'adult.revealNote': 'Les liens des ressources sont flous jusqu\u2019à ce qu\u2019ils soient révélés.',
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

            'list.tagline': 'Eine handverlesene Liste von Open-Source-Apps und Datenschutz-Tools, die wirklich funktionieren. Suche nach Name oder Tag, markiere deine Favoriten und schau in die Anleitungen, wenn du nicht weißt, wo du anfangen sollst.',
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

            'gate.title': 'Willkommen bei Neko\u2019s Index',
            'gate.clickContinue': 'Klicke unten, um fortzufahren.',
            'gate.continueBtn': 'Verstanden & Weiter',

            'guides.title': 'Anleitungen & How-Tos',
            'guides.notice': 'Bitte lesen — diese Anleitungen helfen dir, den Index sicher und effektiv zu nutzen.',
            'guides.intro': 'Diese Anleitungen sollen dir den Einstieg in die im Hauptindex aufgeführten Open-Source-Apps und Tools erleichtern. Sie dienen nur zu Informationszwecken.',
            'guides.about.title': 'Über Neko\u2019s Index',
            'guides.about.body': 'Neko\u2019s Index hat als persönliche Liste von Open-Source-Apps und Datenschutz-Tools angefangen, die es wert waren \u2014 und ist von dort aus gewachsen. Es ist kostenlos, und es sind nur Links: Hier wird nichts gehostet. Der Sinn ist, es ein bisschen leichter zu machen, Software zu finden, die deine Privatsphäre respektiert und dich nicht einsperrt \u2014 egal ob auf PC, Android, iOS oder einfach im Browser.',

            'adult.title': '18+ Ressourcen',
            'adult.tagline': 'Erwachsenen-Websites, Apps, VR-Porno und Hentai/Anime (18+) — nur Links zu Drittanbietern.',
            'adult.warningTitle': '18+ Inhaltswarnung',
            'adult.enter': 'Ich bin 18 oder älter — Eintreten',
            'adult.leave': 'Ich bin unter 18 — Verlassen',
            'adult.revealBtn': 'Klicken, um Links Anzuzeigen',
            'adult.revealNote': 'Ressourcen-Links sind unscharf, bis sie angezeigt werden.',
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

            'list.tagline': 'Uma lista selecionada a dedo de apps de código aberto e ferramentas de privacidade que realmente funcionam. Pesquise por nome ou tag, marque seus favoritos e confira os guias se não souber por onde começar.',
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

            'gate.title': 'Bem-vindo ao Neko\u2019s Index',
            'gate.clickContinue': 'Clique abaixo para continuar.',
            'gate.continueBtn': 'Entendi e Quero Continuar',

            'guides.title': 'Guias e Tutoriais',
            'guides.notice': 'Por favor, leia — estes guias ajudam você a usar o índice com segurança e eficácia.',
            'guides.intro': 'Estes guias servem para ajudar você a começar com os apps e ferramentas de código aberto listados no índice principal. São apenas para fins informativos.',
            'guides.about.title': 'Sobre o Neko\u2019s Index',
            'guides.about.body': 'O Neko\u2019s Index começou como uma lista pessoal de apps de código aberto e ferramentas de privacidade que valiam a pena, e cresceu a partir daí. É gratuito, e são só links \u2014 nada é hospedado aqui. A ideia é facilitar um pouco encontrar softwares que respeitem sua privacidade e não te prendam a eles, seja no PC, Android, iOS ou direto no navegador.',

            'adult.title': 'Recursos 18+',
            'adult.tagline': 'Sites, apps, VR pornô e hentai/anime (18+) adultos — apenas links de terceiros.',
            'adult.warningTitle': 'Aviso de Conteúdo 18+',
            'adult.enter': 'Tenho 18 anos ou mais — Entrar',
            'adult.leave': 'Tenho menos de 18 anos — Saír',
            'adult.revealBtn': 'Clique para Revelar os Links',
            'adult.revealNote': 'Os links dos recursos ficam borrados até serem revelados.',
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

            'list.tagline': '実際に使えるオープンソースアプリとプライバシーツールを厳選しました。名前やタグで検索して、気に入ったものをお気に入りに入れ、どこから始めればいいか分からないときはガイドをチェックしてください。',
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

            'gate.title': "Neko's Indexへようこそ",
            'gate.clickContinue': '下のボタンをクリックして続けてください。',
            'gate.continueBtn': '理解しました・続ける',

            'guides.title': 'ガイド＆使い方',
            'guides.notice': 'このガイドはインデックスを安全かつ効果的に使うためのものです。',
            'guides.intro': 'これらのガイドは、メインインデックスに掲載されているオープンソースアプリやツールを使い始めるためのものです。情報提供のみを目的としています。',
            'guides.about.title': "Neko's Indexについて",
            'guides.about.body': "Neko's Indexは、もともと個人的に使っていたオープンソースアプリやプライバシーツールのリストから始まり、そこから少しずつ大きくなったものです。無料で、リンクを載せているだけ — ここには何もホストしていません。目的は、プライバシーを尊重し、縛られないソフトウェアを、PCでもAndroidでもiOSでも、ブラウザからでも見つけやすくすることです。",

            'adult.title': '18+ リソース',
            'adult.tagline': 'アダルトサイト、アプリ、VRポルノ、ヘンタイ/アニメ（18+）— 第三者リンクのみです。',
            'adult.warningTitle': '18+ コンテンツ警告',
            'adult.enter': '18歳以上です — 入る',
            'adult.leave': '18歳未満です — 離れる',
            'adult.revealBtn': 'クリックしてリンクを表示',
            'adult.revealNote': 'リソースへのリンクは表示するまでぼかされています。',
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

            'list.tagline': '一份精心挑选、真正好用的开源应用和隐私工具列表。按名称或标签搜索，收藏喜欢的项目，如果不知道从哪里开始，可以看看指南。',
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

            'gate.title': "欢迎来到 Neko's Index",
            'gate.clickContinue': '点击下方按钮继续。',
            'gate.continueBtn': '我已了解并继续',

            'guides.title': '指南与教程',
            'guides.notice': '请阅读 — 这些指南可以帮助您安全有效地使用本索引。',
            'guides.intro': '这些指南旨在帮助您开始使用主索引中列出的开源应用和工具，仅供参考。',
            'guides.about.title': '关于 Neko\u2019s Index',
            'guides.about.body': "Neko's Index 最初只是一份个人整理的开源应用和隐私工具清单，后来慢慢扩展成了现在的样子。它是免费的，也只是一堆链接——这里不托管任何东西。目的很简单：让你更容易找到尊重隐私、不把你困住的软件，不管你用的是 PC、Android、iOS，还是直接在浏览器里看。",

            'adult.title': '18+ 资源',
            'adult.tagline': '成人网站、应用、VR 色情内容和成人向动漫/漫画（18+）— 仅为第三方链接。',
            'adult.warningTitle': '18+ 内容警告',
            'adult.enter': '我已满18岁 — 进入',
            'adult.leave': '我未满18岁 — 离开',
            'adult.revealBtn': '点击显示链接',
            'adult.revealNote': '资源链接在显示之前会被模糊处理。',
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

            'list.tagline': 'ऐसे ओपन-सोर्स ऐप्स और प्राइवेसी टूल्स की चुनी हुई लिस्ट जो वाकई काम करते हैं। नाम या टैग से खोजें, अपने पसंदीदा सेव करें, और अगर समझ न आए कि कहाँ से शुरू करें तो गाइड्स देख लें।',
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

            'gate.title': "Neko's Index में आपका स्वागत है",
            'gate.clickContinue': 'जारी रखने के लिए नीचे क्लिक करें।',
            'gate.continueBtn': 'मैं समझता/समझती हूँ और जारी रखता/रखती हूँ',

            'guides.title': 'गाइड्स और हाउ-टू',
            'guides.notice': 'कृपया पढ़ें — ये गाइड्स आपको इंडेक्स को सुरक्षित और प्रभावी ढंग से उपयोग करने में मदद करते हैं।',
            'guides.intro': 'ये गाइड्स आपको मुख्य इंडेक्स में सूचीबद्ध ओपन-सोर्स ऐप्स और टूल्स के साथ शुरुआत करने में मदद करने के लिए हैं। ये केवल सूचनात्मक उद्देश्यों के लिए हैं।',
            'guides.about.title': "Neko's Index के बारे में",
            'guides.about.body': "Neko's Index की शुरुआत एक पर्सनल लिस्ट के तौर पर हुई थी — ऐसे ओपन-सोर्स ऐप्स और प्राइवेसी टूल्स जो इस्तेमाल करने लायक थे — और वहीं से यह बढ़ता गया। यह मुफ्त है, और सिर्फ लिंक्स हैं — यहाँ कुछ भी होस्ट नहीं किया जाता। मकसद बस यह है कि ऐसा सॉफ़्टवेयर ढूँढना थोड़ा आसान हो जाए जो आपकी प्राइवेसी का सम्मान करे और आपको बांधे नहीं — चाहे आप PC, Android, iOS पर हों या सीधे ब्राउज़र में।",

            'adult.title': '18+ संसाधन',
            'adult.tagline': 'एडल्ट वेबसाइट्स, ऐप्स, VR पोर्न, और हेंताई/एनीमे (18+) — केवल थर्ड-पार्टी लिंक।',
            'adult.warningTitle': '18+ सामग्री चेतावनी',
            'adult.enter': 'मैं 18 वर्ष या उससे अधिक का हूँ — प्रवेश करें',
            'adult.leave': 'मैं 18 वर्ष से कम का हूँ — छोड़ें',
            'adult.revealBtn': 'लिंक देखने के लिए क्लिक करें',
            'adult.revealNote': 'रिसोर्स लिंक तब तक धुंधले रहेंगे जब तक आप उन्हें प्रकट नहीं करते।',
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
        if (window.NEKO_SKIP_FLOATING_LANG) return;
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
