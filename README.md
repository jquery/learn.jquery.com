# jQuery Öğren

_İnglizce_
* Stabil   : [http://learn.jquery.com](http://learn.jquery.com)
* Gelişirme: [http://stage.learn.jquery.com](http://stage.learn.jquery.com)

_Türkçe_
* Stabil   : [http://learn.jquery.com](http://learn.jquery.com)
* Gelişirme: [http://stage.learn.jquery.com](http://stage.learn.jquery.com)


## Hakkında

Bu sitenin iki amacı var:

1. jQuery ve JavaScript'in nasıl kullanıldığı hakkında merkezi, güvenilir, doyurucu bilgiler vermek.
2. Güncel, enerjik ve topluluk tarafından sürdürülen referans kaynak olmak.

İçeriğin çoğu - ve ruhu - [jQuery Fundamentals](http://jqfundamentals.com/legacy) üzerinden gelmekte, bir açık kaynak kitap olan, [Rebecca Murphey](http://www.rmurphey.com/) tarafından yazılıp and 2010 yılında yayınlanmıştır. 2011'de, Rebecca [bequeathed the book](http://rmurphey.com/blog/2011/03/17/the-future-of-jquery-fundamentals-and-a-confession/) jQuery Derneğine bu sitenin temellerini ve eğitim içerikleri olması için bağışlamıştır.


## Bu site nasıl çalışıyor

Sitenin bütün içeriği [Markdown](http://daringfireball.net/projects/markdown/) dosyalarından oluşuyor. Siteyi bir wordpress türevi olan [jquery-wp-content](https://github.com/jquery/jquery-wp-content)'nin [alt teması](https://github.com/jquery/jquery-wp-content/tree/master/themes/learn.jquery.com) sunuyor. Eğer bu konuda bir öneriniz olursa lütfen çekinmeyin [that repository](https://github.com/jquery/jquery-wp-content).

### Site Organizasyonu

Tüm içerikler `page` dizini altında yer almaktadır. `page` dizini altında yer alan dosyaların her biri bir **konu** olarak kabul edilir ve bir çok **makaleyi** içinde bulundurur. Ayrıca bu durum üst düzey dosyalar içinde geçerlidir. Her konu dizininde insanlar tarafından okunabilir konu başlıkları ve kısa bir özeti mevcuttur. Bu konu başlıkları açılış sayfasında görünecek başlıkları oluşturmuş olur.

[`order.yml`](https://github.com/okulbilisim/learn.jquery.com/blob/master/order.yml) dosyası bölümleri ve makaleleri sitede görünen dosya sırasını kontrol eder.


### YAML Kuralları

Makalelerde bir karmaşa olamaması için belli standartlar getirilmiştir. Bir makalede olması gereken şartlar şunlardır.

* `title` - Sayfada makale başlığı olarak çıkacak olan kısımdır. Özel karakter içeriyor ise tırnak işareti kullanılmalıdır.

`title: "jQuery Olay Uzantıları"`

* `level` - Makalelerin anlaşılabilmesi için gerekli olan bilgi seviyelerini belirterek okuyucunun faydalı makaleye yönelmesini sağlamak için kullanılır. Örnek olarak: `başlangıç`, `orta`, or `ileri`.

`level: ileri`


## Building & Yerel Ağ Üzerinde Çalışma

Bu site jQuery ağının bir sitesidir ve [jquery-wp-content](https://github.com/jquery/jquery-wp-content) tarafından kontrol edilir. Yerel ağ üzerinde çalışmak için ilk olarak jQuery Wordpress ağı kurulur. [başlangıç](https://github.com/jquery/jquery-wp-content) Sonra, repo klonlanır ve aşağıda yer alan adımlar takip edilir. (node.js gereklidir.).

1. `npm install`
2. `cp config-sample.json config.json`
3. config.json dosyası yerel ağ üzerinde çalışacak wordpress ağı için kullanıcı adı ve şifre düzeltilir. 
4. `grunt`

## Nasıl yardımcı olabilirim?

Herkes learn.jquery.com'a yardımcı olabilir. Daha kapsamlı belgelerle katkı sağlamak için lütfen [katkıda bulunma rehberini](http://learn.jquery.com/contributing) okuyunuz.
