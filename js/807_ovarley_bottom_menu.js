$(function(){
	// スクロールバーの横幅を取得
	//htmlの最後にオーバーフローをしたらスクロールするdivを設置
	$('body').append('<div class="htgo_scrollbar" style="overflow:scroll;"></div>');
	//全面幅からdivを引いてスクロールバーの幅を取得
	var htgo_scrollsize = window.innerWidth - $('.htgo_scrollbar').prop('clientWidth');
	//divを非表示にする
	$('.htgo_scrollbar').hide();
	//縦のスクロールバーを常に表示する
	$('body').addClass('htgo_scrollbar-y-on');
	//クリック判定フラグを０に設定
	var htgo_click_flg = "0";
	//「.htgo_modal-a」をクリックしたときの処理
	$(document).on("click",".htgo_modal-a",function(){
		if(htgo_click_flg == "0"){
			//bodyを固定（fixedにする）
			scrollpos = $(window).scrollTop();//現在表示位置
			$('body').addClass('htgo_modal-fixed').css({'top': -scrollpos});
			//オーバーレイ用の要素を追加
			$('body').append('<div class="htgo_modal-overlay"></div>');
			//オーバーレイをフェードイン
			$('.htgo_modal-overlay').fadeIn('slow');
			//モーダルコンテンツのIDを取得
			var modal = '#' + $(this).attr('data-target');
			//モーダルコンテンツを囲む要素を追加
			$(modal).wrap('<div data-target="htgo_menu-content" class="htgo_modal-wrap htgo_modal-a htgo_modal-open"></div>');
			//モーダルコンテンツを囲む要素を表示
			$('.htgo_modal-wrap').show();
			//モーダルコンテンツフェードイン
			$(modal).fadeIn('slow');
			//モーダルコンテンツをクリックした時はフェードアウトしない
			$(modal).click(function(e){
			    e.stopPropagation();
			});
			//スクロールバーの表示非表示
			//スクロースバーを全部非表示にする
			$('body').addClass('htgo_nonscrollbar');
			//縦スクロールバー表示のクラスを削除
			$('body').removeClass('htgo_scrollbar-y-on');
			//オーバーレイに縦スクロールバー表示
			$('.htgo_modal-overlay').addClass('htgo_scrollbar-y-on');
			//openとcloseを入れ替える
			$('.htgo_modal-a').removeClass('htgo_modal-open');
			$('.htgo_modal-a').addClass('htgo_modal-close');
			//クリック判定フラグを１に設定
			htgo_click_flg = "1";
       }else if(htgo_click_flg == "1"){
			// モーダルコンテンツのIDを取得
			var modal = '#' + $(this).attr('data-target');
			// モーダルコンテンツとオーバーレイをフェードアウト
			$(modal).fadeOut('slow');
			$('.htgo_modal-overlay').fadeOut('slow',function(){
			    // html、bodyの固定解除
			    $('body').removeClass('htgo_modal-fixed').css({'top': 0});
			    // オーバーレイを削除
			    $('.htgo_modal-overlay').remove();
			    // モーダルコンテンツを囲む要素を削除
			    $(modal).unwrap('<div data-target="htgo_menu-content" class="htgo_modal-wrap htgo_modal-a htgo_modal-open"></div>');
			    //表示位置調整
			    window.scrollTo( 0, scrollpos ) ;
			});
			//スクロールバーの表示非表示
			$('body').removeClass('htgo_nonscrollbar');
			$('body').addClass('htgo_scrollbar-y-on');
			//openとcloseを入れ替える
			$('.htgo_modal-a').removeClass('htgo_modal-close');
			$('.htgo_modal-a').addClass('htgo_modal-open');
			//クリック判定フラグを初期化
			htgo_click_flg = "0";
		}
    });
});