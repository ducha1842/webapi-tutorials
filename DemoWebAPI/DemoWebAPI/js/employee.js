$(document).ready(function () {
    var employeeJS = new EmployeeJS();
})

class EmployeeJS {
    constructor() {
        this.loadData();
        this.initEvents();
    }

    initEvents() {
        $('#btnAdd').click(this.btnAddOnClick.bind(this));
        $('#btnSaveDetail').click(this.btnSaveDetailOnClick.bind(this));
        $('#btnCancelDialog').click(this.btnCancelDialogOnClick.bind(this));
        $('#btnCloseHeader').click(this.btnCloseHeaderOnClick.bind(this));
        $('input[required]').blur(this.checkRequired);
    }

    loadData() {
        $('.grid tbody').empty();
        $.each(employees, function (index, item) {
            var trHTML = $(`<tr>
                        <th width="100px">`+ item.EmployeeCode +`</th>
                        <th>`+ item.EmployeeName +`</th>
                        <th width="100px">`+ item.Sex +`</th>
                        <th width="100px">`+ item.Birthday +`</th>
                        <th>`+ item.Mobile +`</th>
                        <th>`+ item.Email +`</th>
                        <th>`+ item.Address +`</th>
                        <th>`+ item.Position +`</th>
                        <th>`+ item.Department +`</th>
                    </tr> `);
            $('.grid tbody').append(trHTML);
        })
    }

    btnAddOnClick() {
        this.showDialogDetail();
        $("#txtEmployeeCode").focus();
    }
    btnCancelDialogOnClick() {
        this.hideDialogDetail();
    }
    btnCloseHeaderOnClick() {
        this.hideDialogDetail();
    }

    btnSaveDetailOnClick() {
        // Validate dữ liệu nhập trên form
        var inputRequireds = $("[required]");
        var isValid = true;
        $.each(inputRequireds, function (index, input) {
            //debugger;
            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass("required-error")) {
                isValid = false;
            }
        })
        if (isValid) {
            // Thu thập thông tin nhập trên form
            var employee = {};
            employee.EmployeeCode = $("#txtEmployeeCode").val();
            employee.EmployeeName = $("#txtEmployeeName").val();
            employee.Sex = "Nam";
            employee.Birthday = "18/04/2000";
            employee.Mobile = $("#txtMobile").val();
            employee.Address = $("#txtAddress").val();
            employee.Email = $("#txtEmail").val();
            employee.Position = "Nhân viên";
            employee.Department = "Developer";

            // Thực hiện cất dữ liệu
            employees.push(employee);
            //load lại dữ liệu
            this.loadData();
            this.hideDialogDetail();
        }

    }
    /**
     * Hiển thị dialog chi tiết
     * Author: NDucHa (17/09/2021)
     * */
    showDialogDetail() {
        $('.form-dialog').show();
        $('.dialog-modal').show();
    }
    /**
     * Ẩn dialog chi tiết
     * Author: NDHa (17/09/2021)
     * */
    hideDialogDetail() {
        $('.form-dialog').hide();
        $('.dialog-modal').hide();
    }
    checkRequired() {
        var value = this.value;
        if (!value) {
            $(this).addClass('required-error');
            $(this).attr("title", "Bạn phải nhập thông tin này.");
        }
        else {
            $(this).removeClass('required-error');
            $(this).removeAttr("title", "Bạn phải nhập thông tin này.");
        }
    }
}


var employees = [
    {
        EmployeeCode: "KH001",
        EmployeeName: "Nguyen Duc Ha",
        Sex: "Nam",
        Birthday: "18/04/2000",
        Mobile: "0967089712",
        Email: "ducha1842@gmail.com",
        Address: "Thạch Thất - Hà Nội",
        Position: "Nhân viên",
        Department: "Developer",
    },
    {
        EmployeeCode: "KH002",
        EmployeeName: "Nguyen Ha Duc Viet",
        Sex: "Nam",
        Birthday: "18/04/2000",
        Mobile: "0967089712",
        Email: "ducha1842@gmail.com",
        Address: "Thạch Thất - Hà Nội",
        Position: "Nhân viên",
        Department: "Developer",
    },
    {
        EmployeeCode: "KH003",
        EmployeeName: "Nguyen Duc Ha",
        Sex: "Nam",
        Birthday: "18/04/2000",
        Mobile: "0967089712",
        Email: "ducha1842@gmail.com",
        Address: "Thạch Thất - Hà Nội",
        Position: "Nhân viên",
        Department: "Developer",
    }
]