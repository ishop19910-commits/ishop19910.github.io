// ==========================================
// ระบบ Admin ลดราคา
// ==========================================


const product =
    document.getElementById("product");


const discount =
    document.getElementById("discount");


// ==========================================
// คำนวณราคา
// ==========================================

function calculatePrice() {

    const option =
        product.options[
            product.selectedIndex
        ];


    const normalPrice =
        Number(
            option.getAttribute(
                "data-price"
            )
        );


    const discountPercent =
        Number(discount.value) || 0;


    const salePrice =
        normalPrice -
        (
            normalPrice *
            discountPercent /
            100
        );


    document.getElementById(
        "normalPrice"
    ).innerText =
        normalPrice.toFixed(2);


    document.getElementById(
        "discountPrice"
    ).innerText =
        salePrice.toFixed(2);

}


// ==========================================
// เลือกสินค้า
// ==========================================

product.addEventListener(
    "change",
    calculatePrice
);


// ==========================================
// ใส่ส่วนลด
// ==========================================

discount.addEventListener(
    "input",
    calculatePrice
);


// ==========================================
// ⭐ บันทึกส่วนลด
// ==========================================

function saveDiscount() {

    const option =
        product.options[
            product.selectedIndex
        ];


    const name =
        option.value;


    const normalPrice =
        Number(
            option.getAttribute(
                "data-price"
            )
        );


    const discountPercent =
        Number(discount.value);


    // ตรวจสอบ
    if (
        !discountPercent ||
        discountPercent <= 0 ||
        discountPercent > 100
    ) {

        alert(
            "กรุณาใส่ส่วนลดระหว่าง 1 - 100%"
        );

        return;

    }


    // คำนวณ
    const salePrice =
        normalPrice -
        (
            normalPrice *
            discountPercent /
            100
        );


    // ==================================
    // ⭐ ข้อมูลส่วนลด
    // ==================================

    const saleData = {

        name: name,

        normalPrice: normalPrice,

        discount: discountPercent,

        salePrice: salePrice

    };


    // ==================================
    // ⭐ บันทึก
    // ==================================

    localStorage.setItem(

        "SALE_" + name,

        JSON.stringify(saleData)

    );


    alert(

        "✅ ลดราคา " +
        name +
        " สำเร็จ\n\n" +

        "ราคาปกติ: " +
        normalPrice.toFixed(2) +
        " บาท\n" +

        "ส่วนลด: " +
        discountPercent +
        "%\n" +

        "ราคาหลังลด: " +
        salePrice.toFixed(2) +
        " บาท"

    );


    discount.value = "";


    calculatePrice();

    showDiscount();

}


// ==========================================
// แสดงรายการโปรโมชั่น
// ==========================================

function showDiscount() {

    const table =
        document.getElementById(
            "discountTable"
        );


    table.innerHTML = "";


    for (
        let i = 0;
        i < product.options.length;
        i++
    ) {

        const option =
            product.options[i];


        const name =
            option.value;


        const data =
            localStorage.getItem(
                "SALE_" + name
            );


        if (!data) {

            continue;

        }


        const sale =
            JSON.parse(data);


        table.innerHTML += `

            <tr>

                <td>

                    ${sale.name}

                </td>

                <td>

                    ${sale.normalPrice.toFixed(2)}
                    บาท

                </td>

                <td>

                    <b style="color:red">

                        -${sale.discount}%

                    </b>

                </td>

                <td>

                    <b style="color:red">

                        ${sale.salePrice.toFixed(2)}
                        บาท

                    </b>

                </td>

                <td>

                    <button
                        onclick="deleteDiscount('${sale.name}')"
                        style="
                            background:red;
                            color:white;
                            border:none;
                            padding:8px 12px;
                            border-radius:5px;
                            cursor:pointer;
                        "
                    >

                        🗑️ ยกเลิก

                    </button>

                </td>

            </tr>

        `;

    }

}


// ==========================================
// ยกเลิกส่วนลด
// ==========================================

function deleteDiscount(name) {

    localStorage.removeItem(
        "SALE_" + name
    );


    alert(
        "ยกเลิกส่วนลด " +
        name +
        " แล้ว"
    );


    showDiscount();

}


// ==========================================
// เริ่มต้น
// ==========================================

calculatePrice();

showDiscount();
