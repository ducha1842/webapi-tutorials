using DemoWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace DemoWebAPI.Controllers
{
    [RoutePrefix("employee")]
    public class EmployeeController : ApiController
    {
        // GET: api/Employee
        [Route("")]
        public IEnumerable<Employee> Get()
        {
            return Employee.EmployeeList;
        }
        [Route("{employeeCode}")]
        // GET: api/Employee/5
        public object Get(string employeeCode)
        {
            var employee = Employee.EmployeeList.Where(x => x.EmployeeCode == employeeCode).FirstOrDefault();
            return employee;
        }

        // POST: api/Employee
        [Route("")]
        public void Post([FromBody]Employee employee)
        {
            Employee.EmployeeList.Add(employee); 
        }

        // PUT: api/Employee/5
        [Route("")]
        public bool Put([FromBody]Employee employee)
        {
            // Xác định đối tượng employee thực hiện chỉnh sửa thông tin trong list
            // Chỉnh sửa thông tin mới
            // Cập nhật lại List
            var employeeEdit = Employee.EmployeeList.Where(x => x.EmployeeCode == employee.EmployeeCode).FirstOrDefault();
            Employee.EmployeeList.Remove(employeeEdit);
            Employee.EmployeeList.Add(employee);
            return true;
        }

        // DELETE: api/Employee/5
        [Route("{employeeCode}")]
        public bool Delete(string employeeCode)
        {
            var result = false;
            // Xác định đối tượng employee cần xóa thông tin trong list
            var employeeEdit = Employee.EmployeeList.Where(x => x.EmployeeCode == employeeCode).FirstOrDefault();
            if (employeeEdit != null)
            {
                Employee.EmployeeList.Remove(employeeEdit);
                result = true;
            }
            return result;
        }
    }
}
