var globalShoes = []
var cart = 0;
var cartList = []
function runApp(shoes, genres) {
    console.log(shoes);
    globalShoes = shoes;
    DisplayShoe(shoes[0]);
    // buildCarousel(shoes, "#look_carousel2");
    buildCarousel(shoes, "#look_carousel");
    loop(0);
}

function loop(id) {
    setTimeout(() => {
        if(id == globalShoes.length) {
            loop(0)
        }
        else{
            DisplayShoe(globalShoes[id])
            loop(id+1);
        }
    }, 4000);
}

$(document).ready(function () {

    parseData();

    $('#look_carousel').on('click', '.product-carousel-img', function () {
        console.log(this);
        var id = $(this).attr("id").split("_")[1];
        console.log(id)
        DisplayShoe(globalShoes[id]);
    });

    $('#look_carousel').on('click', '.btn-add-cart', function () {
        cart+=1;
        var id = $(this).attr("data-id");
        cartList.push(globalShoes[id]);
        $("#cartItems").text(cart);
        console.log(cartList);
    });

    $(".btn-group-toggle input:radio").on('change', function () {
        let val = $(this).val();
        $("#shoe_sizes label").removeClass("active");
        $(this).parent().addClass("active");
    })

    $(".btn-add-cart").click(function () {
        cart+=1;
        var id = $(this).attr("data-id");
        cartList.push(globalShoes[id])
        $("#cartItems").text(cart);
        console.log(cartList);
    });
});


function thousandPoint(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

function DisplayShoe(shoe) {
    $("#breadcrumb_name").text(shoe.nombre);
    $(".product-info h2").text(shoe.nombre);
    $("#price").text("$" + thousandPoint(shoe.precio));
    $("#productCode").text(shoe.referencia);
    $("#main_product_image").attr("src", "img/" + shoe.foto);
    $("#colors_mini").attr("src", "img/" + shoe.foto);
    $(".product .btn-add-cart").attr("data-id", Number(shoe.foto.split(".")[0])-1);
}

function buildCarousel(shoes, container) {
    var itemHtml = ""
    for (let i = 0; i < shoes.length; i++) {
        itemHtml += "<div class='added-product'><img class='product-carousel-img' id='p_"+i+"' src='img/"+ shoes[i].foto +"' alt=''>";
        itemHtml += "<p>"+ shoes[i].nombre +"</p>"
        itemHtml += "<p class='small-price'>$"+ thousandPoint(shoes[i].precio) +"</p>"
        itemHtml += "<button class='btn btn-add-cart' data-id='"+i+"'>AGREGAR AL CARRITO</button></div>"
        $(container).append(itemHtml)
        itemHtml = ""
    }

    runCarousel(container);

}

function runCarousel(container) {
    var owl = $(container);
    owl.owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true
    });
    $(container +" >.added-product").html("");
}

