import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { Login } from './components/login/login';
import { Dashboard } from './components/dashboard/dashboard';
import { HostelList } from './components/hostel/hostel-list/hostel-list';
import { HostelAdd } from './components/hostel/hostel-add/hostel-add';
import { HostelEdit } from './components/hostel/hostel-edit/hostel-edit';

import { RoomList } from './components/room/room-list/room-list';
import { RoomAdd } from './components/room/room-add/room-add';
import { RoomEdit } from './components/room/room-edit/room-edit';

import { BedList } from './components/bed/bed-list/bed-list';
import { BedAdd } from './components/bed/bed-add/bed-add';
import { BedEdit } from './components/bed/bed-edit/bed-edit';

import { TenantList } from './components/tenant/tenant-list/tenant-list';
import { TenantAdd} from './components/tenant/tenant-add/tenant-add';
import { TenantEdit } from './components/tenant/tenant-edit/tenant-edit';

import { AllocationList } from './components/allocation/allocation-list/allocation-list';
import { AllocationAdd} from './components/allocation/allocation-add/allocation-add';

import { PaymentList } from './components/payment/payment-list/payment-list';
import { PaymentAdd } from './components/payment/payment-add/payment-add';

import { ComplaintList } from './components/complaint/complaint-list/complaint-list';
import { ComplaintAdd } from './components/complaint/complaint-add/complaint-add';

import { NoticeList } from './components/notice/notice-list/notice-list';
import { NoticeAdd } from './components/notice/notice-add/notice-add';

import { VisitorList } from './components/visitor/visitor-list/visitor-list';
import { VisitorAdd } from './components/visitor/visitor-add/visitor-add';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [AuthGuard],
    // canActivate: [AuthGuard], // Add on Day 15

    children: [
      { path: 'hostels', component: HostelList },
      { path: 'hostels/add', component: HostelAdd },
      { path: 'hostels/edit/:id', component: HostelEdit },

      { path: 'rooms', component: RoomList },
      { path: 'rooms/add', component: RoomAdd },
      { path: 'rooms/edit/:id', component: RoomEdit },

      { path: 'beds', component: BedList },
      { path: 'beds/add', component: BedAdd },
      { path: 'beds/edit/:id', component: BedEdit },

      { path: 'tenants', component: TenantList },
      { path: 'tenants/add', component: TenantAdd},
      { path: 'tenants/edit/:id', component: TenantEdit },

      { path: 'allocations', component: AllocationList },
      { path: 'allocations/add', component: AllocationAdd },

      { path: 'payments', component: PaymentList },
      { path: 'payments/add', component: PaymentAdd },

      { path: 'complaints', component: ComplaintList},
      { path: 'complaints/add', component: ComplaintAdd },

      { path: 'notices', component: NoticeList },
      { path: 'notices/add', component: NoticeAdd },

      { path: 'visitors', component: VisitorList },
      { path: 'visitors/add', component: VisitorAdd }
    ]
  },

  {
    path: '**',
    redirectTo: '/login'
  }
];