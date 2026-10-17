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
      'Biçimlendirmenin asıl faydası okunabilirlik değil, hata bulma hızıdır. Tek satıra sıkışmış bir API yanıtında eksik bir virgülü gözle bulmak dakikalar alır; girintili halde aynı hata ilk bakışta görünür. Girinti aynı zamanda iç içe geçmiş yapının kaç seviye derine indiğini gösterir, bu da veriyi kodunuzda nasıl karşılayacağınıza karar verirken işinizi kolaylaştırır.',
      'Küçültme (minify) ise tam tersini yapar: tüm boşlukları atarak dosyayı küçültür. Üretim ortamına gönderilen yapılandırma dosyalarında ve ağ üzerinden taşınan yanıtlarda tercih edilir. Aynı veriyi geliştirirken girintili, yayınlarken küçültülmüş tutmak yaygın bir alışkanlıktır — araç iki yönü de destekler.',
      'Bir noktayı karıştırmamak gerekir: biçimlendirme JSON’un sözdizimini düzeltmez, yalnızca düzgün olanı okunabilir kılar. Belge geçersizse önce hatayı gidermeniz gerekir; aracın gösterdiği satır ve sütun bilgisi tam da bunun içindir.',
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
      { q: 'Biçimlendirme verimi değiştirir mi?', a: 'Hayır. Yalnızca boşluk ve satır sonları eklenir; anahtarlar, değerler ve sıralama aynı kalır. JSON’da boşluk anlam taşımadığı için biçimlendirilmiş ve küçültülmüş belge aynı veriyi ifade eder.' },
      { q: 'Kaç boşluk girinti kullanmalıyım?', a: 'İki boşluk en yaygın tercihtir ve çoğu dilin varsayılanıdır; dört boşluk derin iç içe yapılarda satırları hızla sağa iter. Takım içinde tek bir tercihte anlaşmak, sürüm kontrolünde gereksiz farkları önler.' },
      { q: 'Anahtar sırası korunuyor mu?', a: 'Evet, belgedeki sıra olduğu gibi kalır. JSON nesnelerinde sıra teknik olarak anlamlı değildir, ancak biçimlendirici bunu değiştirmez; böylece iki sürümü karşılaştırdığınızda yalnızca gerçek değişiklikleri görürsünüz.' },
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
      'Büyük bir JSON yanıtını metin olarak okumak, aradığınız alanın nerede olduğunu bilmiyorsanız zaman kaybıdır. Ağaç görünümü belgeyi katman katman açıp kapatmanıza izin verir; ilgilenmediğiniz dalları kapalı tutarak yalnızca incelediğiniz bölümü ekranda tutarsınız.',
      'Görüntüleyici özellikle iç içe geçmiş yapılarda işe yarar. Bir alanın kaç seviye derinde olduğunu ve hangi dizinin içinde yer aldığını görmek, o veriye kodunuzda nasıl erişeceğinizi doğrudan söyler — elle yol çıkarmaya çalışırken yapılan hataların çoğu burada önlenir.',
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
      { q: 'Dosya boyutu sınırı var mı?', a: 'Belirli bir sınır yok; işlem tarayıcınızda yapıldığı için pratik sınır cihazınızın belleğidir. Çok büyük belgelerde ağacı tamamen açmak yerine yalnızca ihtiyacınız olan dalı açmak daha akıcı çalışır.' },
      { q: 'Veriyi görüntüleyicide düzenleyebilir miyim?', a: 'Görüntüleyici okumak için tasarlanmıştır. Değişiklik yapmak istiyorsanız formatlayıcıyı kullanın; orada metni doğrudan düzenleyip sonucu kopyalayabilirsiniz.' },
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
      'JSON’un dilbilgisi kasıtlı olarak küçüktür ve ayrıştırıcılar bunu katı biçimde uygular. Sondaki fazladan bir virgül, tek tırnak, tırnaksız bir anahtar ya da bir yorum satırı — bunlardan herhangi biri belgenin tamamını okunamaz hale getirir. Doğrulayıcı, yapının ilk nerede bozulduğunu satır ve sütun olarak söyler.',
      'Bildirilen konuma biraz şüpheyle yaklaşın: ayrıştırıcı hatanın yapıldığı yeri değil, artık devam edemediği yeri gösterir. Dosyanın başında kapatılmayan bir parantez ancak sonda fark edilir. Bu yüzden bildirilen konumdan geriye doğru, tam olduğundan emin olduğunuz son yapıya kadar bakmak en hızlı yöntemdir.',
      'Söz dizimi ile şema farklı şeylerdir. Bu araç “bu geçerli bir JSON mu?” sorusunu yanıtlar, “bu JSON benim beklediğim alanları içeriyor mu?” sorusunu değil. İkincisi için bir JSON Schema tanımlamanız gerekir.',
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
      { q: 'Geçerli JSON, doğru veri anlamına gelir mi?', a: 'Hayır. Doğrulama yalnızca dilbilgisini denetler. Tüm alan adları yanlış yazılmış ya da sayı beklediğiniz yerde metin bulunan bir belge de geçerli JSON olabilir.' },
      { q: 'Yorum satırı kullanabilir miyim?', a: 'Standart JSON’da yorum yoktur. JSON5 ve JSONC gibi lehçeler buna izin verir ve bazı araçlar kabul eder, ancak katı bir ayrıştırıcı belgeyi reddeder.' },
      { q: 'Dosyam doğru görünüyor ama yine de hata veriyor, neden?', a: 'En sık nedeni görünmeyen bir karakterdir: UTF-8 BOM ile kaydedilmiş bir dosya, ekranda kusursuz görünür ve ayrıştırılamaz. Dosyayı BOM’suz UTF-8 olarak yeniden kaydedin.' },
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
      'JSON ile elektronik tablo arasındaki temel fark şudur: JSON iç içe geçebilir, tablo geçemez. Dönüştürme sırasında asıl iş, derin yapıyı sütunlara yaymaktır. Araç iç içe nesneleri nokta ile birleştirilmiş sütun adlarına açar, böylece adres.sehir gibi bir alan kendi sütununda yer alır.',
      'En temiz sonuç, girdinin aynı şekle sahip nesnelerden oluşan bir dizi olmasıyla alınır — her nesne bir satır, her anahtar bir sütun olur. Nesneler arasında alanlar farklılık gösteriyorsa eksik hücreler boş kalır; bu beklenen davranıştır, veri kaybı değildir.',
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
      { q: 'İç içe diziler nasıl aktarılıyor?', a: 'Nesne dizileri sütunlara açılır; ilkel değerlerden oluşan diziler ise tek bir hücrede birleştirilir, çünkü tabloda tek hücreye birden fazla satır sığmaz.' },
      { q: 'Dosya Excel’de bozuk açılıyor, ne yapmalıyım?', a: 'Türkçe karakter sorunu yaşıyorsanız bu genellikle kodlama kaynaklıdır. Üretilen .xlsx dosyası Unicode taşır; sorun CSV ara adımında ortaya çıkıyorsa dosyayı içe aktarırken UTF-8 seçin.' },
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
      'Elektronik tablodan JSON’a geçerken en kritik karar ilk satırın ne olduğudur. Araç ilk satırı başlık kabul eder ve her sütun adını JSON anahtarına dönüştürür; alttaki her satır da bir nesne olur. Başlık satırı yoksa anahtarlar anlamsız çıkar, bu yüzden dosyayı yüklemeden önce bunu kontrol etmek zaman kazandırır.',
      'Sayı ve tarih hücreleri ayrı bir dikkat ister. Excel tarihleri arka planda sayı olarak saklar; dışa aktarımda bunların metin mi yoksa sayı mı olarak geleceğini hücre biçimi belirler. Tarihleri hedef sistemde kullanacaksanız, tabloda ISO biçiminde (YYYY-AA-GG) tutmak en güvenli yoldur.',
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
      { q: 'Birden fazla sayfası olan dosyalarda ne oluyor?', a: 'Dönüştürme sayfa bazında çalışır. Birden fazla sayfayı aktarmak istiyorsanız her birini ayrı ayrı dönüştürmek, karışık yapıdaki tek bir çıktıdan daha kullanışlı olur.' },
      { q: 'Boş hücreler nasıl temsil ediliyor?', a: 'Boş hücreler boş metin ya da null olarak gelir. Hedef sisteminiz bu ikisini farklı ele alıyorsa, dönüştürdükten sonra çıktıyı gözden geçirmekte fayda var.' },
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
      'CSV düz bir biçimdir: satırlar ve sütunlar, başka hiçbir şey yok. JSON ise iç içe geçebildiği için dönüştürme sırasında bu derinliğin bir şekilde düzleştirilmesi gerekir. Araç iç içe nesneleri nokta ile birleştirilmiş sütun başlıklarına açar ve her nesneyi bir satıra yerleştirir.',
      'CSV’nin resmî bir standardı olmadığını unutmamak gerekir. Ayırıcının virgül mü noktalı virgül mü olduğu, metinlerin tırnak içine alınıp alınmadığı ve satır sonlarının nasıl yazıldığı araçtan araca değişir. Türkçe Excel kurulumlarında ayırıcı genellikle noktalı virgüldür; dosya tek sütunda açılıyorsa sorun neredeyse her zaman budur.',
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
      { q: 'Değerin içinde virgül varsa ne oluyor?', a: 'Böyle değerler tırnak içine alınır, içindeki tırnaklar da ikiye katlanarak kaçırılır. Bu, CSV’nin standart kaçış yöntemidir ve tüm yaygın ayrıştırıcılar tarafından anlaşılır.' },
      { q: 'Excel dosyayı tek sütunda açıyor, neden?', a: 'Excel’in beklediği ayırıcı ile dosyadaki ayırıcı uyuşmuyor. Veri sekmesindeki “Metni Sütunlara Dönüştür” ile ayırıcıyı virgül seçebilir ya da içe aktarma sihirbazını kullanabilirsiniz.' },
    ],
  },
];

export const trBySlug: Record<string, TrToolDef> = Object.fromEntries(
  trTools.map((t) => [t.key, t]),
);
