import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Router } from '@angular/router';

interface Employee {
  id: number;
  name: string;
  role: string;
  employer: string;
  payMonth: string;
  gender: 'male' | 'female';
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  constructor(private route: Router) {}
  employees: Employee[] = [
    {
      id: 1,
      name: 'John Doe',
      role: 'Developer',
      employer: 'Tech Corp',
      payMonth: 'january',
      gender: 'male',
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Designer',
      employer: 'Creative Inc',
      payMonth: 'january',
      gender: 'female',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      role: 'Manager',
      employer: 'Business Solutions',
      payMonth: 'january',
      gender: 'male',
    },
    {
      id: 4,
      name: 'Sarah Lee',
      role: 'Analyst',
      employer: 'Data Works',
      payMonth: 'january',
      gender: 'female',
    },
    {
      id: 5,
      name: 'Chris Brown',
      role: 'Tester',
      employer: 'Quality Assurance',
      payMonth: 'january',
      gender: 'male',
    },
    {
      id: 6,
      name: 'Emily Davis',
      role: 'Designer',
      employer: 'Creative Inc',
      payMonth: 'january',
      gender: 'female',
    },
    {
      id: 7,
      name: 'David Wilson',
      role: 'Developer',
      employer: 'Tech Corp',
      payMonth: 'january',
      gender: 'male',
    },
    {
      id: 8,
      name: 'Emma Martinez',
      role: 'Analyst',
      employer: 'Data Works',
      payMonth: 'january',
      gender: 'female',
    },
    {
      id: 9,
      name: 'James Anderson',
      role: 'Manager',
      employer: 'Business Solutions',
      payMonth: 'january',
      gender: 'male',
    },
    {
      id: 10,
      name: 'Olivia Taylor',
      role: 'Tester',
      employer: 'Quality Assurance',
      payMonth: 'january',
      gender: 'female',
    },
  ];

  filteredEmployees: Employee[] = this.employees;
  paginatedEmployees: Employee[] = [];
  currentPage = 1;
  pageSize = 5; // Default items per page
  pageSizeOptions = [5, 10, 20, 50]; // Dropdown options for items per page

  ngOnInit() {
    this.updatePagination();
  }

  onFilter(event: Event, field: keyof Employee) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((employee) =>
      String(employee[field]).toLowerCase().includes(value)
    );
    this.currentPage = 1; // Reset to first page after filtering
    this.updatePagination();
  }

  onCreate() {
    console.log('Create button clicked');
    this.route.navigate(['payslip', 'create'], {
      queryParams: { query: 'create' },
    });
  }

  onView(employee: Employee) {
    console.log('View:', employee);
    this.route.navigate(['payslip', 'view'], {
      queryParams: { empId: employee.id },
    });
  }

  onEdit(employee: Employee) {
    console.log('Edit:', employee);
    this.route.navigate(['payslip', 'edit'], {
      queryParams: { empId: employee.id },
    });
  }

  onDelete(employee: Employee) {
    console.log('Delete:', employee);
    // Add delete logic here
  }

  getAvatarInitials(name: string): string {
    const names = name.split(' ');
    const firstNameInitial = names[0].charAt(0).toUpperCase();
    const lastNameInitial =
      names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '';
    return `${firstNameInitial}${lastNameInitial}`;
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  onPageSizeChange(size: number) {
    this.pageSize = size;
    this.currentPage = 1; // Reset to first page after changing page size
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEmployees = this.filteredEmployees.slice(
      startIndex,
      endIndex
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.pageSize);
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
