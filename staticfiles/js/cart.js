let quantityCol = document.getElementsByClassName('product-quantity'); //input value
let unitPrice = document.getElementsByClassName('product-unitprice'); //span
let totalPrice = document.getElementsByClassName('total-price');
//let table = document.getElementById('cart-table');
let cartItems = localStorage.getItem('productInCart');
let subtotal = document.getElementById('cart-subtotal');
// let btnCheckout = document.getElementById('checkout-btn');


$(".btn-addToCart").on('click', function () {
        let product = JSON.parse(JSON.stringify({
            "productId": $(this).data('productid'),
            "productName": $(this).data('productname'),
            "unitprice": parseFloat($(this).data('price'))
        }));
        addToCart(product, parseInt($("#quantity").val()));
    }
)

function addToCart(product, quantity = 1) {
    let cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {

        if (cartItems[product.productId] == undefined) {
            product.quantity = quantity;
            cartItems = {
                ...cartItems,
                [product.productId]: product
            }
        } else {
            cartItems[product.productId].quantity += quantity;
        }
    } else {
        product.quantity = quantity;
        cartItems = {
            [product.productId]: product
        }

    }
    localStorage.setItem('productInCart', JSON.stringify(cartItems));
    totalItemCount();

}

//number of items in cart
function totalItemCount() {
    cartItems = localStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    let count = 0;
    for (i in cartItems) {
        count += cartItems[i].quantity
    }
    document.querySelector('.single-icon span').textContent = count;
}

$(document).ready(function () {

    cartItems = localStorage.getItem('productInCart')
    cartItems = JSON.parse(cartItems);

    for (const item in cartItems) {
        $("#checkout-body").append(`<tr><td class='product-des' data-title='Description'><p class='product-name'><a>${cartItems[item].productName}</a></td>
            <td data-title='Price'><span class='product-unitprice'>${cartItems[item].unitprice}</span></td>
            <td>${cartItems[item].quantity}</td>
            <td class='total-price'>${(parseFloat(cartItems[item].quantity) * parseFloat(cartItems[item].unitprice)).toFixed(2)}</td></tr>`)
    }


})



//cart item to table
function load_cartItems() {
    $('#cart-body').html('')
    cartItems = JSON.parse(localStorage.getItem('productInCart'));
    console.log(cartItems)
    for (const item in cartItems) {
        $('#cart-body').append(`<tr>
            <td class='product-des'><p class='product-name'><a href='#'>${cartItems[item].productName}</a></p></td>
            <td data-title='Price'><span class='product-unitprice'>${cartItems[item].unitprice}</span></td>
            <td><input class='product-quantity text-center'  data-productid=${cartItems[item].productId} type='number' value='${cartItems[item].quantity}' min='1'></td>
            <td class='total-price'>${(parseFloat(cartItems[item].quantity) * parseFloat(cartItems[item].unitprice)).toFixed(2)}</td>
            <td class='action'><a class="remove" onclick="remove(${cartItems[item].productId})"><i class='ti-trash remove-icon'></i></a></td>
            </tr>`)
    }
    allTotal();
    totalItemCount();
}

function remove(product) {
    items = JSON.parse(localStorage.getItem('productInCart'));
    for (item in items) {
        if (item == product) {
            delete items[item]
            localStorage.setItem('productInCart', JSON.stringify(items))
            load_cartItems()
        }
    }
}


//total amount in cart
function allTotal() {
    var total = 0.0;
    for (let i = 0; i < totalPrice.length; i++) {
        total += parseFloat(totalPrice[i].innerHTML);
    }
    total = (total).toFixed(2);
    localStorage.setItem('subtotal', total);
    subtotal.textContent = total;
}

//fetch api to send post request: addOrder

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');


$('#checkout-btn').on('click', function () {
        let cartItems = localStorage.getItem('productInCart');
        let delivery_address = $("input[name='delivery-address']:checked").val()
        if (delivery_address == null) {
            window.alert('Please select or add delivery location')
        } else {
            $.ajax({
                type: 'POST',
                headers: {'X-CSRFToken': csrftoken},
                url: "/cart/add/",
                dataType: 'json',
                data: {
                    'products': cartItems,
                    'delivery_address': delivery_address
                },
                success: function (data) {
                    console.log(data)
                    localStorage.removeItem('productInCart')
                    location.replace('/cart/order/success/' + data['orderId'])
                }
            })
        }

    }
)

// fetch api to add order
// function checkOut(){
//
//     let cartItems = localStorage.getItem('productInCart');
//     if (cartItems ){
//
//         btnCheckout.addEventListener('click', function () {
//             x = document.querySelector('input[name="delivery-address"]:checked')
//             if (x == null) {
//                 window.alert('please select location')
//             } else {
//
//             cartItems = JSON.parse(cartItems);
//             cartItems.delivery_address=x.value;
//                 var url = '/cart/add/'
//
//                 var url = "/cart/add/"
//                 fetch(url, {
//                     method: 'POST', headers: {'Content-Type': 'application/json', 'X-CSRFToken': csrftoken,},
//                     body: JSON.stringify(cartItems)
//                 })
//                     .then((response) => {
//                         if (response.ok) {
//                             return response.json()
//                         }
//                     })
//                     .then(data => {
//                         if (data['success'] == true) {
//                             localStorage.removeItem('productInCart'),
//                                 location.replace('/cart/order/success/' + data['orderId'])
//                         }
//
//                     })
//
//                     .catch(function (ex) {
//                         console.log("parsing failed", ex);
//                     })
//             }
//
//         })}}
//
//  quantity input change listener
// $(".product-quantity").on('click',function ()
// {
//
// })

function quantityListener() {
    for (let i = 0; i < quantityCol.length; i++) {
        quantityCol[i].addEventListener('change', function () {
            productId = this.dataset.productid
            totalprice = (parseFloat(quantityCol[i].value) * parseFloat(unitPrice[i].textContent)).toFixed(2)
            totalPrice[i].innerHTML = totalprice;
            cartItems[productId].quantity = parseInt(quantityCol[i].value);
            localStorage.setItem('productInCart', JSON.stringify(cartItems));
            totalItemCount();
            allTotal();

        })
    }
}

function onLoad() {
    let count = totalItemCount();
    count = parseInt(count);
    if (count) {
        document.getElementById('total-count').textContent = count;
    }
}

onLoad();
if (window.location.pathname == '/cart/') {
    load_cartItems();
    remove()
    quantityListener();

}
