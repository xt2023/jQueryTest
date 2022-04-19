$(function() {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $(".checkall").change(function() {
        // console.log($(this).prop("checked"));
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"))
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item")
        } else {
            $(".cart-item").removeClass("check-cart-item")
        }
    })
    $(".j-checkbox").change(function() {
        // console.log($(".j-checkbox:checked").length);
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true)
        } else {
            $(".checkall").prop("checked", false)
        }
        if ($(this).prop("checked")) {
            // $(".cart-item").addClass("check-cart-item")
            $(this).parents(".cart-item").addClass("check-cart-item")
        } else {
            // $(".cart-item").removeClass("check-cart-item")
            $(this).parents(".cart-item").removeClass("check-cart-item")
        }
    })



    //增减商品数量模块
    $(".increment").click(function() {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n)
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parent().parent().siblings(".p-sum").html("￥" + price);
        getSum()
    })


    $(".decrement").click(function() {
        var n = $(this).siblings(".itxt").val()
        n--
        if (n < 1) {
            $(this).siblings(".itxt").val("1")
        } else {
            $(this).siblings(".itxt").val(n)
        }
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        $(this).parent().parent().siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum()

    })

    //用户修改文本框值，计算模块
    $(".itxt").change(function() {
        var n = $(this).val();
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parent().parent().siblings(".p-sum").html("￥" + price);
        getSum()
    })


    //计算件数和金额数
    getSum()

    function getSum() {
        var count = 0; //件数
        var money = 0; //额度
        $(".itxt").each(function(i, ele) {
            count += parseInt($(ele).val())
        })
        $(".amount-sum em").text(count)

        $(".p-sum").each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        })
        $(".price-sum em").text("￥" + money.toFixed(2))
    }


    //商品删除模块
    $(".p-action").click(function() {
        $(this).parents(".cart-item").remove();
        getSum()
    })

    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum()
    })

    $(".clear-all").click(function() {
        $(".cart-item").remove();
        getSum()
    })
})