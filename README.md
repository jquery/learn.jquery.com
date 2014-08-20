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

All of the content lives inside of the subdirectories of the `page` directory. Each of these subdirectories is considered a **chapter**, and contains one or more **articles**, and there is also a top level file that corresponds to each chapter, which contains the chapter's human-readable title and an overview, which will appear on the chapter's landing page.

The [`order.yml`](https://github.com/okulbilisim/learn.jquery.com/blob/master/order.yml) file controls the order that chapters and articles appear in the site.


### YAML Conventions

Each of the articles on the site has some YAML "Front Matter" that contains metadata. All articles should include the following:

* `title` - The title of the article as it will appear in the site. If it contains special characters, put the string in quotes.

`title: "jQuery Event Extensions"`

* `level` - The approximate level of jQuery experience required to find the article useful. Options: `beginner`, `intermediate`, or `advanced`.

`level: advanced`


## Building & Working Locally

As this site is part of the jQuery network of sites, its presentation is controlled by [jquery-wp-content](https://github.com/jquery/jquery-wp-content). To preview the site locally, first follow the [instructions there](https://github.com/jquery/jquery-wp-content) to set up a local version of the jQuery WordPress network. Then, clone this repo and run the following steps (node.js required).

1. `npm install`
2. `cp config-sample.json config.json`
3. Edit config.json to use the username and password for your local WordPress network
4. `grunt`

## How Can I Help?

We encourage contribution from anyone. For more comprehensive documentation on how to get involved, please read our [contributing guide](http://learn.jquery.com/contributing).
