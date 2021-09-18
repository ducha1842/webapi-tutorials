$(document).ready(function () {
    var customerJS = new CustomerJS();
})

class CustomerJS {
    constructor() {
        this.loadData();
    }
    loadData() {
        $.each(data, function (index, item) {
            var trHTML = $(`<tr>
                        <th width="100px">`+ item.CustomerCode + `</th>
                        <th>`+ item.CustomerName + ` </th>
                        <th>`+ item.Email + `</th>
                        <th width="150px">`+ item.Phone + `</th>
                        <th>`+ item.Address + `</th>
                    </tr> `);
            $('.grid tbody').append(trHTML);
        })
    }
}


var data = [
    {
        CustomerCode: "NV001",
        CustomerName: "Nguyen Duc Ha",
        Email: "ducha1842@gmail.com",
        Phone: "0967089712",
        Address: "Thach That - Ha Noi"
    },
    {
        CustomerCode: "NV002",
        CustomerName: "Nguyen Ha Duc Viet",
        Email: "ducha1842@gmail.com",
        Phone: "0967089712",
        Address: "Thach That - Ha Noi"
    },
    {
        CustomerCode: "NV003",
        CustomerName: "Nguyen Duc Ha",
        Email: "ducha1842@gmail.com",
        Phone: "0967089712",
        Address: "Thach That - Ha Noi"
    }
]