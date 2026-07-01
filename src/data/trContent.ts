export interface TrToolDef {
  key: string;
  slug: string; // path under /tr/
  title: string; // <title> / SEO
  description: string;
  keywords: string;
  h1: string;
  tagline: string;
  intro: string[];
  steps: string[];
  faqs: { q: string; a: string }[];
}

// Turkish landing pages for the core tools. Targets Turkish search queries,
// which have far less competition than the English equivalents.
export const trTools: TrToolDef[] = [
  {
    key: 'json-formatlayici',
    slug: 'json-formatlayici',
    title: 'JSON Formatlayıcı | Ücretsiz Online JSON Biçimlendirme Aracı',
    description: 'Ücretsiz online JSON formatlayıcı. JSON verinizi anında düzenli, girintili ve okunabilir hale getirin, hataları bulun. Her şey tarayıcınızda çalışır.',
    keywords: 'json formatlayıcı, json biçimlendirme, json düzenleyici, online json formatlayıcı, json güzelleştirici, json doğrulama',
    h1: 'JSON Formatlayıcı',
    tagline: 'JSON verinizi anında düzenli, girintili ve okunabilir hale getirin. Hataları saniyeler içinde bulun.',
    intro: [
      'JSON (JavaScript Object Notation), web API’lerinin, yapılandırma dosyalarının ve veri saklamanın ortak dilidir. Ancak sunucudan gelen ham JSON genellikle tek satıra sıkıştırılmış ve okunması zor olur. JSON formatlayıcı, bu sıkışık metni girintili, renkli ve anlaşılır bir yapıya dönüştürür.',
      'Aracımız aynı zamanda doğrulama yapar: eksik virgül, yanlış tırnak veya kapanmayan parantez gibi hataları anında yakalar ve nerede olduğunu gösterir. Tüm işlem tarayıcınızda gerçekleşir — verileriniz hiçbir sunucuya gönderilmez, bu yüzden hassas verilerle bile güvenle kullanabilirsiniz.',
    ],
    steps: [
      'JSON verinizi yukarıdaki kutuya yapıştırın.',
      'Formatla düğmesine tıklayın; JSON düzgün girintiyle biçimlenir.',
      'Hata varsa, vurgulanan mesajdan eksik virgülü veya parantezi bulup düzeltin.',
      'Sonucu tek tıkla kopyalayın veya indirin.',
    ],
    faqs: [
      { q: 'JSON formatlayıcı ücretsiz mi?', a: 'Evet, tamamen ücretsizdir. Üyelik gerekmez, sınır yoktur ve hem kişisel hem ticari projelerde kullanabilirsiniz.' },
      { q: 'Verilerim güvende mi?', a: 'Kesinlikle. Tüm işlem tarayıcınızda, cihazınızda gerçekleşir. JSON verileriniz hiçbir sunucuya gönderilmez veya saklanmaz.' },
      { q: 'Büyük dosyaları işleyebilir mi?', a: 'Evet, birkaç megabayt boyutundaki büyük JSON dosyalarını rahatlıkla işleyebilir.' },
    ],
  },
  {
    key: 'json-goruntuleyici',
    slug: 'json-goruntuleyici',
    title: 'JSON Görüntüleyici | Ücretsiz Online JSON Viewer',
    description: 'Ücretsiz online JSON görüntüleyici. JSON verinizi okunabilir ağaç yapısında inceleyin, genişletin ve daraltın. Hızlı, güvenli ve tarayıcıda çalışır.',
    keywords: 'json görüntüleyici, json viewer türkçe, json ağaç görünümü, online json görüntüleyici, json inceleme',
    h1: 'JSON Görüntüleyici',
    tagline: 'JSON verinizi okunabilir bir ağaç yapısında görüntüleyin ve kolayca gezinin.',
    intro: [
      'Büyük JSON belgelerinde düz metin içinde gezinmek zordur. JSON görüntüleyici, verinizi katlanabilir bir ağaç yapısında gösterir; yalnızca ilgilendiğiniz dalları açar, gerisini kapalı tutarsınız. Böylece derin iç içe geçmiş bir API yanıtında dosya gezgini gibi rahatça dolaşırsınız.',
      'Tanımadığınız bir verinin yapısını anlamak için idealdir. Tüm işlem tarayıcınızda yapılır, veriniz hiçbir yere gönderilmez.',
    ],
    steps: [
      'JSON verinizi kutuya yapıştırın.',
      'Veri otomatik olarak biçimlenir ve görüntülenir.',
      'Nesne ve dizileri genişletip daraltarak yapıyı inceleyin.',
      'İhtiyacınız olan bölümü kopyalayın.',
    ],
    faqs: [
      { q: 'Görüntüleyici ile formatlayıcı farkı nedir?', a: 'Formatlayıcı, girintili metin üretir; görüntüleyici ise büyük ve iç içe verilerde çok daha kullanışlı olan, genişletilip daraltılabilen bir ağaç sunar.' },
      { q: 'Verilerim gizli kalır mı?', a: 'Evet. Görüntüleyici tarayıcınızda çalışır ve JSON’unuzu hiçbir sunucuya göndermez.' },
      { q: 'Ücretsiz mi?', a: 'Evet, tamamen ücretsizdir ve sınırsız kullanılabilir.' },
    ],
  },
  {
    key: 'json-dogrulayici',
    slug: 'json-dogrulayici',
    title: 'JSON Doğrulayıcı | Ücretsiz Online JSON Validator (Türkçe)',
    description: 'Ücretsiz online JSON doğrulayıcı. JSON’unuzun geçerli olup olmadığını kontrol edin, sözdizimi hatalarını ve konumlarını anında bulun.',
    keywords: 'json doğrulayıcı, json validator türkçe, json doğrulama, json kontrol, json hata bulma, geçerli json',
    h1: 'JSON Doğrulayıcı',
    tagline: 'JSON’unuzun geçerli olup olmadığını kontrol edin ve sözdizimi hatalarını anında bulun.',
    intro: [
      'Geçerli JSON sözdizimi, verinizin doğru ayrıştırılabilmesi için şarttır. Tek bir eksik virgül, yanlış tırnak veya kapanmayan parantez tüm ayrıştırmayı bozar. JSON doğrulayıcı, verinizi kontrol eder ve hatanın tam olarak nerede olduğunu gösterir.',
      'API yanıtlarını, yapılandırma dosyalarını veya elle yazılmış JSON’u kontrol etmek için idealdir. Tüm doğrulama tarayıcınızda yapılır.',
    ],
    steps: [
      'JSON verinizi kutuya yapıştırın.',
      'Araç, veriyi anında doğrular.',
      'Hata varsa, tam satır ve karakter konumuyla birlikte gösterilir.',
      'Belirtilen yerdeki sorunu düzeltip tekrar kontrol edin.',
    ],
    faqs: [
      { q: 'En sık görülen JSON hataları nelerdir?', a: 'Sondaki fazladan virgül, çift yerine tek tırnak, tırnaksız anahtarlar ve kapanmayan parantezler en yaygın hatalardır.' },
      { q: 'Verilerim güvende mi?', a: 'Evet. Doğrulama tamamen tarayıcınızda gerçekleşir, veriniz hiçbir yere gönderilmez.' },
      { q: 'Ücretsiz mi?', a: 'Evet, tamamen ücretsiz ve sınırsızdır.' },
    ],
  },
  {
    key: 'json-excel-cevirici',
    slug: 'json-excel-cevirici',
    title: "JSON'dan Excel'e Çevirici | Ücretsiz Online JSON Excel Aracı",
    description: "Ücretsiz online JSON'dan Excel'e çevirici. JSON verinizi anında .xlsx elektronik tablosuna dönüştürün. Hızlı, güvenli ve tarayıcıda çalışır.",
    keywords: 'json excel çevirici, json excel dönüştürücü, json to excel türkçe, json xlsx çevirici, json tablo',
    h1: "JSON'dan Excel'e Çevirici",
    tagline: "JSON verinizi anında Excel (.xlsx) elektronik tablosuna dönüştürün.",
    intro: [
      'JSON makineler için mükemmeldir, ancak veriyi meslektaşlarınızla veya yöneticilerinizle paylaşmanız gerektiğinde elektronik tablo çok daha erişilebilirdir. JSON’dan Excel’e dönüştürme, nesne dizilerini herkesin sıralayıp filtreleyebileceği satır ve sütunlara çevirir.',
      'Araç, JSON yapınızı otomatik olarak sütunlara eşler ve indirilebilir bir .xlsx dosyası üretir. Tüm dönüşüm tarayıcınızda yapılır, veriniz yüklenmez.',
    ],
    steps: [
      'JSON verinizi (genellikle bir nesne dizisi) kutuya yapıştırın.',
      'Araç, anahtarları algılayıp sütun başlıklarını oluşturur.',
      'Dönüştür / İndir düğmesine tıklayın.',
      'İndirilen .xlsx dosyasını Excel, Google E-Tablolar veya Numbers ile açın.',
    ],
    faqs: [
      { q: 'Hangi JSON yapısı en iyi çalışır?', a: 'Düz nesnelerden oluşan bir dizi en temiz sonucu verir: her nesne bir satır, her anahtar bir sütun olur.' },
      { q: 'Hangi dosya formatını alırım?', a: 'Excel, Google E-Tablolar ve LibreOffice ile açılan standart bir .xlsx dosyası alırsınız.' },
      { q: 'Verilerim yüklenir mi?', a: 'Hayır. Tüm dönüşüm tarayıcınızda gerçekleşir.' },
    ],
  },
  {
    key: 'excel-json-cevirici',
    slug: 'excel-json-cevirici',
    title: "Excel'den JSON'a Çevirici | Ücretsiz Online Excel JSON Aracı",
    description: "Ücretsiz online Excel'den JSON'a çevirici. Excel (.xlsx veya .csv) dosyalarınızı anında JSON’a dönüştürün. Tarayıcıda çalışır, güvenlidir.",
    keywords: 'excel json çevirici, excel json dönüştürücü, excel to json türkçe, xlsx json çevirici, csv json',
    h1: "Excel'den JSON'a Çevirici",
    tagline: "Excel ve CSV dosyalarınızı anında temiz bir JSON dizisine dönüştürün.",
    intro: [
      'Veriler elektronik tablolarda yaşar, ancak uygulamalar ve API’ler JSON konuşur. Excel’den JSON’a dönüştürme, satır ve sütunları doğrudan kodunuza, veritabanınıza veya API isteğinize aktarabileceğiniz temiz bir JSON nesne dizisine çevirir.',
      'İlk satır anahtar olarak kabul edilir, sonraki her satır bir nesne olur. Dosyanız tarayıcıda okunur, hiçbir yere yüklenmez.',
    ],
    steps: [
      'Excel dosyanızı yükleyin veya tablo verinizi yapıştırın.',
      'İlk satırın sütun başlıklarını içerdiğinden emin olun.',
      'Araç her satırı bir JSON nesnesine dönüştürür.',
      'Oluşan JSON dizisini kopyalayın veya indirin.',
    ],
    faqs: [
      { q: 'Hangi Excel formatları destekleniyor?', a: 'Hem modern .xlsx hem de eski .xls dosyaları ile CSV verisi desteklenir.' },
      { q: 'Başlıklar nasıl işlenir?', a: 'İlk satır, her JSON nesnesinin anahtarları olarak kullanılır.' },
      { q: 'Dosyam yüklenir mi?', a: 'Hayır. Dönüşüm tamamen tarayıcınızda yapılır.' },
    ],
  },
  {
    key: 'json-csv-cevirici',
    slug: 'json-csv-cevirici',
    title: "JSON'dan CSV'ye Çevirici | Ücretsiz Online JSON CSV Aracı",
    description: "Ücretsiz online JSON'dan CSV'ye çevirici. JSON dizinizi anında temiz CSV’ye dönüştürün — anahtarlar sütun, nesneler satır olur. Tarayıcıda çalışır.",
    keywords: 'json csv çevirici, json csv dönüştürücü, json to csv türkçe, json csv aktarma',
    h1: "JSON'dan CSV'ye Çevirici",
    tagline: 'JSON dizinizi anında temiz CSV’ye dönüştürün; Excel ve veritabanı içe aktarımı için ideal.',
    intro: [
      'CSV, neredeyse her elektronik tablo, veritabanı ve analiz aracının anladığı en taşınabilir veri formatıdır. JSON dizisini CSV’ye dönüştürmek, veriyi kod yazmadan içe aktarmanızı sağlar.',
      'Her nesne bir satıra, her anahtar bir sütuna eşlenir; virgül veya tırnak içeren değerler otomatik olarak kaçış karakteriyle işlenir. Her şey tarayıcınızda çalışır.',
    ],
    steps: [
      'JSON dizinizi kutuya yapıştırın.',
      "JSON'dan CSV'ye Dönüştür düğmesine tıklayın.",
      'Anahtarlar başlık satırı, her nesne bir veri satırı olur.',
      'Sonucu kopyalayın veya .csv olarak indirin.',
    ],
    faqs: [
      { q: 'Hangi JSON yapısı en iyi çalışır?', a: 'Tutarlı anahtarlara sahip düz nesnelerden oluşan bir dizi en temiz CSV’yi üretir.' },
      { q: 'Virgül içeren değerler nasıl işlenir?', a: 'Virgül, tırnak veya satır sonu içeren değerler CSV standardına göre otomatik olarak tırnak içine alınır.' },
      { q: 'Verilerim gizli kalır mı?', a: 'Evet, dönüşüm tamamen tarayıcınızda gerçekleşir.' },
    ],
  },
];

export const trBySlug: Record<string, TrToolDef> = Object.fromEntries(
  trTools.map((t) => [t.key, t]),
);
