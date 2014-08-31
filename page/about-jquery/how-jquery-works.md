---
title   : jQuery Nasıl Çalışır?
level: başlangıç
---

### jQuery Temelleri
Bu basit bir giriş seviyesi dökümanı olup size başlangıç için yardımcı olması için tasarlanmıştır. Eğer henüz sayfa yükleyiciyi test etmediyseniz, HTML sayfayı oluşturarak başlayabilirsiniz:

```
<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Demo</title>
</head>
<body>
	<a href="http://jquery.com/">jQuery</a>
	<script src="jquery.js"></script>
	<script>

	// Yazılacak kodlar bu alanda yer alacaklar.

	</script>
</body>
</html>
```

`src` yapısı `<script>` elementinin jQuery kopyasını oluşturmasını sağlar. jQuery kopyasını [buradan](http://jquery.com/download/) indirebilirsiniz.

### Hazır Döküman Üzerinde Kod Çalıştırma

Tarayıcının yüklemesi bittikten sonra bir çok JavaScript programcısı kodlarını `onload` fonksiyonu ile sarmalar:

```
window.onload = function() {

	alert( "Hoş Geldiniz!" );

}
```

Ne yazık ki kod tüm resimleri ve reklamları indirme işlemini bitirmeden çalışmayacaktır. Dökümantasyon işlenir işlenmez kod çalışır. Bunun için jQuery [ready event](http://api.jquery.com/ready/) olarak bilinen bir yapıya sahiptir:

```

$( document ).ready(function() {

	// Kodlar buraya yazılacak.

});
```

Örnek olarak, `ready` olayında, linke bir handler(işleyici) verilebilir:

```
$( document ).ready(function() {

	$( "a" ).click(function( event ) {

		alert( "Sitemizi ziyaret ettiğiniz için teşekkür ederiz!" );

	});

});
```

HTML sayfanızı kaydedip tarayıcınızda test sayfasını tekrar yükleyiniz. Linke tıkladıktan sonra ilk olarak bir uyarı penceresi görüntülenecek daha sonra ise varsayılan görünüm ile http://jquery.com için devam edebilirsiniz.

`click` ve daha bir çok olay için [buraya](http://api.jquery.com/category/events/) göz atabilirsiniz. Ayrıca eğer istenirse varsayılan davranış olay işletici içinde `event.preventDefault()` ile önlenebilir.

```
$( document ).ready(function() {

	$( "a" ).click(function( event ) {

		alert( "Göründüğü gibi link artık jquery.com görünümünü aldı." );

		event.preventDefault();

	});

});
```

### Örneği Tamamlama

Aşağıda yer alan örnek yukarıda tartışılan HTML `<body>` içinde yer alan click olayını göstermektedir. Unutulmaması gerek önemli bir nokta ise JavaScript kodunu ayrı bir sayfaya yazıp daha sonra `<script>` elementine ait `src` özelliğiyle yazmak daha iyi bir yöntemdir.

```
<!doctype html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Deneme</title>
</head>
<body>
	<a href="http://jquery.com/">jQuery</a>
	<script src="jquery.js"></script>
	<script>

	$( document ).ready(function() {
		$( "a" ).click(function( event ) {
			alert( "Bağlantı artık jquery.com üzerinde görüntülenecektir." );
			event.preventDefault();
		});
	});

	</script>
</body>
</html>
```

### Bir HTML Sınıfı Ekleme ve Çıkarma İşlemi

**Önemli:** *`ready` olayı içinde yer alan JQuery örnekleri yerleştirilmelidir. Bu sayede  döküman üzerinde çalışmaya hazır olduğunda yazılan kod yürütülmüş olacaktır.*

Başka bir ortak görev sınıf ekleme veya çıkarmaktır.

Öncelikle, `<head>` dökümanı içine stil dosyaları ekleyin:

```
<style>
a.test {
	font-weight: bold;
}
</style>
```

Daha sonra, scripti [.addClass()](http://api.jquery.com/addClass/) ile çağırın:

```
$( "a" ).addClass( "test" );
```

Tüm `<a>` elementleri kalın puntolu olacaktır.

Var olan bir sınıfı kaldırmak için [.removeClass()](http://api.jquery.com/removeClass/) kullanılır:

```
$( "a" ).removeClass( "test" );
```

### Özel Efektler

jQuery sayfaların göze çarpması için bazı kullanışlı [efektler](http://api.jquery.com/category/effects/) sunmaktadır. Örnek olarak, bir tıklama işleyicisi oluşturmak için aşağıda yer alan kod kullanılabilir:

```
$( "a" ).click(function( event ) {

	event.preventDefault();

	$( this ).hide( "slow" );

});
```

Link tıklandığı zaman yavaş yavaş kaybolacaktır.

## Callback(Geri Bildirimler) ve Fonksiyonlar

Diğer bir çok programlama dilinden farklı olarak JavaScript fonksiyonların serbestçe hareket etmesini ve daha sonraki bir zamanda çalıştırılmasına olanak sağlar.

Bir *callbacks(geri bildirimler)* fonksiyon olarak başka bir yere argüman olarak gönderilir. Ana fonksiyon tamamlandıktan sonra yürütülür. Callbacks(geri bildirimler) özeldir çünkü onlar ana fonksiyonların görevlerini bitirmelerini sabırla beklerler. Bu arada tarayıcı geri kalan işleri yapabilir potansiyele sahiptir.

Callbacks(Geri bildirimleri) kullanmak için, nasıl ana fonksiyona geçileceğini bilmek önemlidir.

### Callback(Geri Bildirim)  *olmadan* Bağımsız Değişkenler

EĞer callback hiç bir argümana sahip değilse, aşağıdaki gibi geçilebilir:

```
$.get( "myhtmlpage.html", myCallBack );
```

When [$.get()](http://api.jquery.com/jQuery.get/) finishes getting the page `myhtmlpage.html`, it executes the `myCallBack()` function.

* **Note:** The second parameter here is simply the function name (but *not* as a string, and without parentheses).

### Callback *with* Arguments

Executing callbacks with arguments can be tricky.

#### Wrong
This code example will ***not*** work:

```
$.get( "myhtmlpage.html", myCallBack( param1, param2 ) );
```

The reason this fails is that the code executes `myCallBack( param1, param2 )` immediately and then passes `myCallBack()`'s *return value* as the second parameter to `$.get()`. We actually want to pass the function `myCallBack()`, not `myCallBack( param1, param2 )`'s return value (which might or might not be a function). So, how to pass in `myCallBack()` *and* include its arguments?

#### Right

To defer executing `myCallBack()` with its parameters, you can use an anonymous function as a wrapper. Note the use of `function() {`. The anonymous function does exactly one thing: calls `myCallBack()`, with the values of `param1` and `param2`.

```
$.get( "myhtmlpage.html", function() {

	myCallBack( param1, param2 );

});
```

When `$.get()` finishes getting the page `myhtmlpage.html`, it executes the anonymous function, which executes `myCallBack( param1, param2 )`.
