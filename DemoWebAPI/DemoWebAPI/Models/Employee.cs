using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoWebAPI.Models
{
    public class Employee
    {
        public static List<Employee> EmployeeList = new List<Employee>()
        {
            new Employee() { EmployeeCode = "NV001", EmployeeName = "Nguyễn Đức Hà", Email = "ducha1842@gmail.com", Mobile = "0967089712", CompanyName = "Free", Address = "Thạch Thất - Hà Nội", Position = "Nhân viên", Department = "Developer"},
            new Employee() { EmployeeCode = "NV002", EmployeeName = "Nguyễn Hà Đức Việt", Email = "ducha1842@gmail.com", Mobile = "0967123654", CompanyName = "Free", Address = "Thạch Thất - Hà Nội", Position = "Nhân viên", Department = "Developer"},
            new Employee() { EmployeeCode = "NV003", EmployeeName = "Nguyễn Đức Thịnh", Email = "ducha1842@gmail.com", Mobile = "0967111222", CompanyName = "Free", Address = "Thạch Thất - Hà Nội", Position = "Nhân viên", Department = "Developer"},
            new Employee() { EmployeeCode = "NV004", EmployeeName = "Vũ Đức Thắng", Email = "ducha1842@gmail.com", Mobile = "0967111333", CompanyName = "Free", Address = "Thạch Thất - Hà Nội", Position = "Nhân viên", Department = "Developer"},
            new Employee() { EmployeeCode = "NV005", EmployeeName = "Hoàng Thị Thư", Email = "ducha1842@gmail.com", Mobile = "0967888555", CompanyName = "Free", Address = "Thạch Thất - Hà Nội", Position = "Nhân viên", Department = "Developer"},
            new Employee() { EmployeeCode = "NV006", EmployeeName = "Nguyễn Thị Đông Giang", Email = "ducha1842@gmail.com", Mobile = "0967123456", CompanyName = "Free", Address = "Thạch Thất - Hà Nội", Position = "Nhân viên", Department = "Developer"},
            new Employee() { EmployeeCode = "NV007", EmployeeName = "River", Email = "ducha1842@gmail.com", Mobile = "0967432150", CompanyName = "Free", Address = "Thạch Thất - Hà Nội", Position = "Nhân viên", Department = "Developer"},
            new Employee() { EmployeeCode = "NV008", EmployeeName = "Riv3r", Email = "ducha1842@gmail.com", Mobile = "0967000123", CompanyName = "Free", Address = "Thạch Thất - Hà Nội", Position = "Nhân viên", Department = "Developer"}
        };

        /// <summary>
        /// Mã nhân viên
        /// </summary>
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Tên nhân viên
        /// </summary>
        public string EmployeeName { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Số điện thoại
        /// </summary>
        public string Mobile { get; set; }

        /// <summary>
        /// Tên công ty
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Địa chỉ
        /// </summary>
        public string Address { get; set; }

        public string Position { get; set; }

        public string Department { get; set; }
    }
}