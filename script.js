// ==========================================
// รายการสินค้า
// ==========================================

const products = [

    // อาหาร
    {
        name: "ข้าวหอมมะลิ",
        category: "อาหาร",
        price: 55,
        icon: "🍚"
    },

    {
        name: "บะหมี่กึ่งสำเร็จรูป",
        category: "อาหาร",
        price: 7,
        icon: "🍜"
    },

    {
        name: "ขนมปัง",
        category: "อาหาร",
        price: 35,
        icon: "🍞"
    },

    {
        name: "ไข่ไก่",
        category: "อาหาร",
        price: 45,
        icon: "🥚"
    },

    {
        name: "ปลากระป๋อง",
        category: "อาหาร",
        price: 25,
        icon: "🥫"
    },

    {
        name: "คุกกี้",
        category: "อาหาร",
        price: 30,
        icon: "🍪"
    },


    // เครื่องดื่ม
    {
        name: "น้ำเปล่า",
        category: "เครื่องดื่ม",
        price: 10,
        icon: "💧"
    },

    {
        name: "โค้ก",
        category: "เครื่องดื่ม",
        price: 15,
        icon: "🥤"
    },

    {
        name: "เป๊ปซี่",
        category: "เครื่องดื่ม",
        price: 15,
        icon: "🥤"
    },

    {
        name: "น้ำส้ม",
        category: "เครื่องดื่ม",
        price: 20,
        icon: "🧃"
    },

    {
        name: "นมสด",
        category: "เครื่องดื่ม",
        price: 18,
        icon: "🥛"
    },

    {
        name: "กาแฟ",
        category: "เครื่องดื่ม",
        price: 25,
        icon: "☕"
    },


    // ขนม
    {
        name: "ช็อกโกแลต",
        category: "ขนม",
        price: 25,
        icon: "🍫"
    },

    {
        name: "ป๊อปคอร์น",
        category: "ขนม",
        price: 35,
        icon: "🍿"
    },

    {
        name: "ลูกอม",
        category: "ขนม",
        price: 20,
        icon: "🍬"
    },

    {
        name: "มันฝรั่งทอด",
        category: "ขนม",
        price: 30,
        icon: "🍟"
    },


    // ของใช้ในบ้าน
    {
        name: "น้ำยาล้างจาน",
        category: "ของใช้ในบ้าน",
        price: 35,
        icon: "🧴"
    },

    {
        name: "สบู่",
        category: "ของใช้ในบ้าน",
        price: 25,
        icon: "🧼"
    },

    {
        name: "กระดาษทิชชู่",
        category: "ของใช้ในบ้าน",
        price: 45,
        icon: "🧻"
    },

    {
        name: "ไม้กวาด",
        category: "ของใช้ในบ้าน",
        price: 60,
        icon: "🧹"
    },

    {
        name: "ถังน้ำ",
        category: "ของใช้ในบ้าน",
        price: 80,
        icon: "🪣"
    },


    // เครื่องเขียน
    {
        name: "ดินสอ",
        category: "เครื่องเขียน",
        price: 5,
        icon: "✏️"
    },

    {
        name: "ปากกา",
        category: "เครื่องเขียน",
        price: 10,
        icon: "🖊️"
    },

    {
        name: "สมุดโน้ต",
        category: "เครื่องเขียน",
        price: 25,
        icon: "📓"
    },

    {
        name: "ไม้บรรทัด",
        category: "เครื่องเขียน",
        price: 10,
        icon: "📏"
    },


    // เครื่องมือช่าง
    {
        name: "ค้อน",
        category: "เครื่องมือช่าง",
        price: 120,
        icon: "🔨"
    },

    {
        name: "ประแจ",
        category: "เครื่องมือช่าง",
        price: 100,
        icon: "🔧"
    },

    {
        name: "ไขควง",
        category: "เครื่องมือช่าง",
        price: 80,
        icon: "🪛"
    },

    {
        name: "น็อต",
        category: "เครื่องมือช่าง",
        price: 20,
        icon: "🔩"
    }

];


// ==========================================
// ตะกร้า
// ==========================================

let cart = [];


// ==========================================
// ⭐ อ่านราคาลด
// ==========================================

function getSalePrice(product) {

    const data = localStorage.getItem(
        "SALE_" + product.name
    );


    if (!data) {

        return product.price;

    }


    const sale = JSON.parse(data);


    return Number(sale.salePrice);

}


// ==========================================
// ⭐ อ่านข้อมูลส่วนลด
// ==========================================

function getSaleData(name) {

    const data = localStorage.getItem(
        "SALE_" + name
    );


    if (!data) {

        return null;

    }


    return JSON.parse(data);

}


// ==========================================
// แสดงสินค้า
// ==========================================

function displayProducts(list = products) {

    const container =
        document.getElementById(
            "productContainer"
        );


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `
            <h3 style="text-align:center;">
                ❌ ไม่พบสินค้า
            </h3>
        `;

        return;

    }


    list.forEach(function(product) {

        const sale =
            getSaleData(product.name);


        let priceHTML;


        // ถ้ามีส่วนลด
        if (sale) {

            priceHTML = `

                <span
                    class="normal-price"
                    style="
                        text-decoration:line-through;
                        color:#999;
                    "
                >

                    ${product.price.toFixed(2)}
                    บาท

                </span>

                <br>

                <span class="sale-price">

                    ${sale.salePrice.toFixed(2)}
                    บาท

                </span>

                <br>

                <span class="discount-badge">

                    🔥 ลด ${sale.discount}%

                </span>

            `;

        }

        // ไม่มีส่วนลด
        else {

            priceHTML = `

                <span class="normal-price">

                    ${product.price.toFixed(2)}
                    บาท

                </span>

            `;

        }


        container.innerHTML += `

            <div
                class="product"
                data-category="${product.category}"
            >

                <div class="icon">

                    ${product.icon}

                </div>

                <h3>

                    ${product.name}

                </h3>

                <p>

                    ประเภท:
                    ${product.category}

                </p>

                <div>

                    ${priceHTML}

                </div>

                <button
                    onclick="addToCart('${product.name}')"
                >

                    🛒 เพิ่มลงตะกร้า

                </button>

            </div>

        `;

    });

}


// ==========================================
// เพิ่มลงตะกร้า
// ==========================================

function addToCart(name) {

    const product =
        products.find(function(item) {

            return item.name === name;

        });


    if (!product) {

        return;

    }


    // ⭐ ใช้ราคาลดตรงนี้
    const price =
        getSalePrice(product);


    const item =
        cart.find(function(item) {

            return item.name === name;

        });


    if (item) {

        item.quantity++;

        item.price = price;

    }

    else {

        cart.push({

            name: product.name,

            price: price,

            quantity: 1

        });

    }


    updateCart();


    alert(
        "เพิ่ม " +
        name +
        " ลงตะกร้าแล้ว"
    );

}


// ==========================================
// กรองประเภท
// ==========================================

function filterProduct(category) {

    if (category === "ทั้งหมด") {

        displayProducts(products);

        return;

    }


    const result =
        products.filter(function(product) {

            return product.category === category;

        });


    displayProducts(result);

}


// ==========================================
// ค้นหา
// ==========================================

function searchProduct() {

    const keyword =
        document.getElementById(
            "searchBox"
        ).value.toLowerCase();


    const result =
        products.filter(function(product) {

            return product.name
                .toLowerCase()
                .includes(keyword);

        });


    displayProducts(result);

}


// ==========================================
// ตะกร้า
// ==========================================

function updateCart() {

    let count = 0;


    cart.forEach(function(item) {

        count += item.quantity;

    });


    document.getElementById(
        "cartCount"
    ).innerText = count;


    displayCart();

}


function displayCart() {

    const container =
        document.getElementById(
            "cartItems"
        );


    if (cart.length === 0) {

        container.innerHTML = `
            <p>
                ยังไม่มีสินค้า
            </p>
        `;

        document.getElementById(
            "totalPrice"
        ).innerText = "0.00";

        return;

    }


    container.innerHTML = "";


    let total = 0;


    cart.forEach(function(item, index) {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        container.innerHTML += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    ${item.price.toFixed(2)}
                    บาท

                </div>


                <div class="quantity">

                    <button
                        onclick="decreaseItem(${index})">

                        -

                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseItem(${index})">

                        +

                    </button>

                    <button
                        class="remove"
                        onclick="removeItem(${index})">

                        🗑️

                    </button>

                </div>


                <strong>

                    ${itemTotal.toFixed(2)}
                    บาท

                </strong>

            </div>

        `;

    });


    document.getElementById(
        "totalPrice"
    ).innerText =
        total.toFixed(2);

}


function increaseItem(index) {

    cart[index].quantity++;

    updateCart();

}


function decreaseItem(index) {

    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    updateCart();

}


function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


function openCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "flex";

}


function closeCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "none";

}


// ==========================================
// ชำระเงิน
// ==========================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "ยังไม่มีสินค้าในตะกร้า"
        );

        return;

    }


    alert(
        "💳 กำลังไปหน้าชำระเงิน"
    );

}


// ==========================================
// ไปยังสินค้า
// ==========================================

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// ⭐ ตรวจการเปลี่ยนโปรโมชั่น
// ==========================================

window.addEventListener(
    "storage",
    function(event) {

        if (
            event.key &&
            event.key.startsWith("SALE_")
        ) {

            displayProducts();

        }

    }
);


// ==========================================
// เมื่อกลับมาหน้าร้าน
// ==========================================

window.addEventListener(
    "focus",
    function() {

        displayProducts();

    }
);


// ==========================================
// เริ่มต้น
// ==========================================

displayProducts();

updateCart();
