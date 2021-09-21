$(document).ready(function () {
    var employeeJS = new EmployeeJS();
})

class EmployeeJS {
    constructor() {
        //Gắn mặc định FormMode
        this.FormMode = null;
        //Load dữ liệu
        this.loadData();
        //Gán sự kiện Events
        this.initEvents();
    }

    initEvents() {
        $('#btnAdd').click(this.btnAddOnClick.bind(this));
        $('#btnSaveDetail').click(this.btnSaveDetailOnClick.bind(this));
        $('#btnEdit').click(this.btnEditOnClick.bind(this));
        $('#btnDelete').click(this.btnDeleteOnClick.bind(this));
        $('#btnCancelDialog').click(this.btnCancelDialogOnClick.bind(this));
        $('#btnCloseHeader').click(this.btnCloseHeaderOnClick.bind(this));
        $('input[required]').blur(this.checkRequired);
        $("table").on("click", "tbody tr", this.rowOnClick);
        $("table").on("dbclick", "tbody tr", this.rowOnDbClick);
    }

    loadData() {
        // Lấy dữ liệu trên sever thông qua lời gọi tới api service;
        $.ajax({
            url: "/employee",   //Xác định gọi tới method nào, API nào
            method: "GET",  //POST or PUSH or GET
            data: "",  // Tham số truyền qua body request
            contentType: "appication/json", // Kiểu dữ liệu trả về json,xml ... json = "appication/json"
            dataType: "", // Kiểu dữ liệu truyền lên json, xml ....
        }).done (function (response) {
            $('.grid tbody').empty();
            $.each(response, function (index, item) {
                var trHTML = $(`<tr>
                        <th width="100px">`+ item.EmployeeCode + `</th>
                        <th>`+ item.EmployeeName + `</th>
                        <th>`+ item.Mobile + `</th>
                        <th>`+ item.Email + `</th>
                        <th>`+ item.Address + `</th>
                        <th>`+ item.Position + `</th>
                        <th>`+ item.Department + `</th>
                    </tr> `);
                $('.grid tbody').append(trHTML);
            })
        }).fail(function (response) {
        })
    }

    btnAddOnClick() {
        this.FormMode = "add";
        this.showDialogDetail();
        $("#txtEmployeeCode").focus();
    }

    btnCancelDialogOnClick() {
        this.hideDialogDetail();
    }

    btnCloseHeaderOnClick() {
        this.hideDialogDetail();
    }

    /**
     * Thực hiện cất dữ liệu
     * 
     * */
    btnSaveDetailOnClick() {
        // Validate dữ liệu nhập trên form
        var inputRequireds = $("[required]");
        var isValid = true;
        $.each(inputRequireds, function (index, input) {
            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass("required-error")) {
                isValid = false;
            }
        })
        if (isValid) {
            var self = this;
            var method = "POST";
            // Thu thập thông tin nhập trên form
            var employee = {};
            employee.EmployeeCode = $("#txtEmployeeCode").val();
            employee.EmployeeName = $("#txtEmployeeName").val();
            employee.Mobile = $("#txtMobile").val();
            employee.Address = $("#txtAddress").val();
            employee.Email = $("#txtEmail").val();
            employee.Position = $("#txtPosition").val();
            employee.Department = $("#txtDepartment").val();
            // Thực hiện cất dữ liệu
            if (self.FormMode == "edit") {
                method = "PUT";
            }
            $.ajax({
                url: "/employee",
                method: method,
                data: JSON.stringify(employee),
                contentType: "application/json",
                dataType: "json"
            }).done(function (res) {
                //load lại dữ liệu
                self.loadData();
                self.hideDialogDetail();
                self.FormMode = null;
            }).fail(function (res) {
            }) 
        }
    }

    btnEditOnClick() {
        this.FormMode = "edit";
        // Lấy mã NV employeeCode dựa trên function getEmployeeCodeSelected
        var employeeCode = this.getEmployeeCodeSelected();
        if (employeeCode) {
            // Hiển thị form chi tiết
            this.showDialogDetail();
            // 3. Gọi Api service để lấy dữ liệu chi tiết của nhân viên với mã tương ứng:
            $.ajax({
                url: "/employee/" + employeeCode,
                method: "GET"
            }).done(function (employee) {
                debugger;
                if (!employee) {
                    alert("Không có nhân viên với mã tương ứng");
                }
                else {
                    // biding các thông tin của nhân viên lên form
                    $("#txtEmployeeCode").val(employee["EmployeeCode"]);
                    $("#txtEmployeeName").val(employee["EmployeeName"]);
                    $("#txtMobile").val(employee["Mobile"]);
                    $("#txtAddress").val(employee["Address"]);
                    $("#txtEmail").val(employee["Email"]);
                    $("#txtPosition").val(employee["Position"]);
                    $("#txtDepartment").val(employee["Department"]);
                }
            }).fail(function (employee) {
            })

        } else {
            alert("Bạn chưa chọn nhân viên nào!");
        }

    }

    btnDeleteOnClick() {
        var self = this;
        // Lấy mã NV employeeCode dựa trên function getEmployeeCodeSelected
        var employeeCode = this.getEmployeeCodeSelected();
        if (employeeCode) {
            // 3. Gọi Api service để xóa dữ liệu của nhân viên với mã tương ứng:
            $.ajax({
                url: "/employee/" + employeeCode,
                method: "DELETE"
            }).done(function (res) {
                if (res) {
                    self.loadData();    
                } else {
                    alert("Nhân viên không còn tồn tại trên hệ thống!");
                }
            }).fail(function (res) {
            })
        } else {
            alert("Bạn chưa chọn nhân viên cần xóa!");
        }
    }

    getEmployeeCodeSelected() {
        // Lấy dữ liệu của nhân viên tương ứng đã chọn:
        // 1. Xác định nhân viên nào được chọn:
        var employeeCode = null;
        var trSelected = $("#tbEmployeeList tr.row-selected");
        // 2. Lấy thông tin Mã nhân viên nếu có còn không thì return null
        if (trSelected.length > 0) {
            employeeCode = $(trSelected).children()[0].textContent;
        }
        return employeeCode;
    }

    /**
    * Sự kiện khi click chọn 1 dòng trong table
    * */
    rowOnClick(sender) {
        this.classList.add("row-selected");
        $(this).siblings().removeClass("row-selected");
    }

    /**
     * 
     * */
    //TODO: rowOnDbClick (đang làm dở)
    rowOnDbClick(sender) {
        $("#frmDialogDetail").show();
    }

    /**
     * Hiển thị dialog chi tiết
     * Author: NDucHa (17/09/2021)
     * */
    showDialogDetail() {
        $('.dialog input').val(null);
        $('.dialog-modal').show();
        $('.form-dialog').show();
        //$('#txtEmployeeCode').focus();
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