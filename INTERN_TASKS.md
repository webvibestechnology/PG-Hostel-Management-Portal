# 🏠 PG Hostel Management Portal — Intern Task Plan (30 Days)

**Tech Stack:** Angular 18 · Spring Boot 4 · Hibernate/JPA · MySQL  
**Duration:** 30 Working Days  
**Intern:** 1 Full-Stack  
**Goal:** Build a fully working PG Hostel Management system from the existing empty skeleton.

---

## 📁 Project Structure Overview

```
PG-Hostel-Management-Portal/
├── Backend/pg-management/          ← Spring Boot + Hibernate
│   └── src/main/java/com/pgmanagement/pg_management/
│       ├── config/                 ← CorsConfig.java, WebConfig.java
│       ├── controller/             ← 10 REST controllers (all empty)
│       ├── dto/                    ← 10 Request DTOs (all empty)
│       ├── entity/                 ← 10 JPA entities (all empty)
│       ├── exception/              ← GlobalExceptionHandler (empty)
│       ├── repository/             ← 10 JPA repositories (all empty)
│       ├── service/                ← 10 service interfaces (all empty)
│       └── serviceimpl/            ← 10 service implementations (all empty)
├── Database/
│   └── SQLquery.sql                ← Only has: CREATE DATABASE pg_management;
└── Frontend/pg-system-frontend/    ← Angular 18
    └── src/app/
        ├── components/             ← 20+ components (all empty)
        ├── models/                 ← 8 interface models (all empty)
        ├── services/               ← 10 Angular services (all empty)
        ├── guards/                 ← Empty (auth guard to be created)
        ├── inceptors/              ← Empty (HTTP interceptor to be created)
        └── app.routes.ts           ← Empty routes array
```

> ⚠️ **Everything is a skeleton — no logic has been written yet.**  
> All tasks below build the project from scratch inside the existing files.

---

## ✅ General Rules for the Intern

- Always work on a **feature branch**, never push directly to `master`.
- Branch naming: `feature/day-XX-description` (e.g. `feature/day-01-db-setup`)
- Each day ends with a **commit** with a clear message.
- Backend runs on `http://localhost:8080`
- Frontend runs on `http://localhost:4200`
- MySQL database name: `pg_management`

---

## 📅 Day-by-Day Task Breakdown

---

### 📆 DAY 1 — Database Design & SQL Schema

**Goal:** Create the complete MySQL database schema with all tables and relationships.

**File to work on:** `Database/SQLquery.sql`

**What to do:**
Replace the existing single line with a full schema. Create the following tables in order (respect foreign key dependencies):

1. `admin` — stores admin login credentials
2. `hostel` — hostel/PG details
3. `room` — rooms inside a hostel
4. `bed` — beds inside a room
5. `tenant` — tenant personal info
6. `allocation` — maps a tenant to a bed
7. `payment` — rent payment records per tenant
8. `complaint` — tenant complaints
9. `notice` — admin notices/announcements
10. `visitor` — visitor log per tenant

**Column reference for each table:**

```sql
-- admin
id INT PRIMARY KEY AUTO_INCREMENT
username VARCHAR(100) UNIQUE NOT NULL
password VARCHAR(255) NOT NULL
email VARCHAR(150)
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

-- hostel
id INT PRIMARY KEY AUTO_INCREMENT
name VARCHAR(150) NOT NULL
address TEXT
phone VARCHAR(15)
total_rooms INT
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

-- room
id INT PRIMARY KEY AUTO_INCREMENT
hostel_id INT (FK → hostel.id)
room_number VARCHAR(20) NOT NULL
room_type ENUM('SINGLE','DOUBLE','TRIPLE')
floor INT
status ENUM('AVAILABLE','OCCUPIED','MAINTENANCE') DEFAULT 'AVAILABLE'

-- bed
id INT PRIMARY KEY AUTO_INCREMENT
room_id INT (FK → room.id)
bed_number VARCHAR(20)
status ENUM('AVAILABLE','OCCUPIED') DEFAULT 'AVAILABLE'

-- tenant
id INT PRIMARY KEY AUTO_INCREMENT
name VARCHAR(150)
email VARCHAR(150) UNIQUE
phone VARCHAR(15)
address TEXT
aadhar_number VARCHAR(20) UNIQUE
emergency_contact VARCHAR(15)
join_date DATE
status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE'

-- allocation
id INT PRIMARY KEY AUTO_INCREMENT
tenant_id INT (FK → tenant.id)
bed_id INT (FK → bed.id)
allocation_date DATE
vacating_date DATE
status ENUM('ACTIVE','VACATED') DEFAULT 'ACTIVE'

-- payment
id INT PRIMARY KEY AUTO_INCREMENT
tenant_id INT (FK → tenant.id)
amount DECIMAL(10,2)
payment_date DATE
payment_month VARCHAR(20)
payment_mode ENUM('CASH','UPI','BANK_TRANSFER')
status ENUM('PAID','PENDING') DEFAULT 'PENDING'
remarks TEXT

-- complaint
id INT PRIMARY KEY AUTO_INCREMENT
tenant_id INT (FK → tenant.id)
title VARCHAR(200)
description TEXT
status ENUM('OPEN','IN_PROGRESS','RESOLVED') DEFAULT 'OPEN'
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

-- notice
id INT PRIMARY KEY AUTO_INCREMENT
title VARCHAR(200)
content TEXT
created_by INT (FK → admin.id)
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

-- visitor
id INT PRIMARY KEY AUTO_INCREMENT
tenant_id INT (FK → tenant.id)
visitor_name VARCHAR(150)
visitor_phone VARCHAR(15)
purpose TEXT
visit_date DATE
check_in_time TIME
check_out_time TIME
```

**Deliverable:** `Database/SQLquery.sql` with complete DROP + CREATE statements. Test it in MySQL Workbench.

---

### 📆 DAY 2 — Backend: Project Config & Database Connection

**Goal:** Get the Spring Boot app to start and connect to MySQL.

**Files to work on:**
- `Backend/pg-management/src/main/resources/application.properties` *(create this if missing)*
- `Backend/pg-management/src/main/java/com/pgmanagement/pg_management/config/CorsConfig.java`
- `Backend/pg-management/src/main/java/com/pgmanagement/pg_management/config/WebConfig.java`

**What to do:**

1. **`application.properties`** — Add these configurations:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/pg_management
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD
   spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
   server.port=8080
   ```

2. **`CorsConfig.java`** — Add `@Configuration` and configure CORS to allow requests from `http://localhost:4200`:
   ```java
   @Configuration
   public class CorsConfig implements WebMvcConfigurer {
       @Override
       public void addCorsMappings(CorsRegistry registry) {
           registry.addMapping("/**")
               .allowedOrigins("http://localhost:4200")
               .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
               .allowedHeaders("*");
       }
   }
   ```

3. **`WebConfig.java`** — Can remain as a placeholder or duplicate the CORS logic here depending on your setup. Confirm with mentor.

4. Fix the **`pom.xml`** — The current test dependencies (`spring-boot-starter-data-jpa-test`, etc.) are invalid artifact IDs. Replace them:
   ```xml
   <dependency>
       <groupId>org.springframework.boot</groupId>
       <artifactId>spring-boot-starter-test</artifactId>
       <scope>test</scope>
   </dependency>
   ```

**Deliverable:** Run `mvn spring-boot:run` — app starts without errors, Hibernate connects to MySQL.

---

### 📆 DAY 3 — Backend: All JPA Entities

**Goal:** Define all 10 JPA entity classes with Hibernate annotations and Lombok.

**Package:** `com.pgmanagement.pg_management.entity`

**Files to work on (all 10):**
- `Admin.java`, `Hostel.java`, `Room.java`, `Bed.java`, `Tenant.java`
- `Allocation.java`, `Payment.java`, `Complaint.java`, `Notice.java`, `Visitor.java`

**What to do for each entity:**

Add these annotations and fields matching the SQL schema from Day 1:

```java
// Example: Admin.java
@Entity
@Table(name = "admin")
@Data               // Lombok — generates getters/setters/toString/equals
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Admin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    private String email;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
```

**Key annotations to use:**
- `@ManyToOne` + `@JoinColumn` for foreign key relationships
- `@Enumerated(EnumType.STRING)` for ENUM fields
- `@Column(name = "...")` where column name differs from field name

**Relationships to implement:**
- `Room` → `@ManyToOne Hostel` (room belongs to one hostel)
- `Bed` → `@ManyToOne Room` (bed belongs to one room)
- `Allocation` → `@ManyToOne Tenant` + `@ManyToOne Bed`
- `Payment` → `@ManyToOne Tenant`
- `Complaint` → `@ManyToOne Tenant`
- `Notice` → `@ManyToOne Admin`
- `Visitor` → `@ManyToOne Tenant`

**Deliverable:** Run the app — Hibernate should auto-create/update all 10 tables in MySQL.

---

### 📆 DAY 4 — Backend: Repositories & DTOs

**Goal:** Complete all JPA repositories and request DTO classes.

**Package 1:** `com.pgmanagement.pg_management.repository`  
**Package 2:** `com.pgmanagement.pg_management.dto`

**Files to work on:**

**Repositories (extend `JpaRepository`):**
```java
// Example: AdminRepository.java
@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Optional<Admin> findByUsername(String username);
}
```

Do the same for all 10 repositories. Add custom query methods where needed:
- `TenantRepository` → `findByStatus(String status)`
- `AllocationRepository` → `findByTenantId(Integer tenantId)`, `findByStatus(String status)`
- `PaymentRepository` → `findByTenantId(Integer tenantId)`, `findByStatus(String status)`
- `ComplaintRepository` → `findByStatus(String status)`
- `BedRepository` → `findByRoomId(Integer roomId)`, `findByStatus(String status)`
- `RoomRepository` → `findByHostelId(Integer hostelId)`

**DTOs — Add fields with validation annotations:**
```java
// Example: AdminLoginRequest.java
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminLoginRequest {
    @NotBlank(message = "Username is required")
    private String username;

    @NotBlank(message = "Password is required")
    private String password;
}
```

Fill all 10 DTOs with appropriate fields matching the entity (but only the fields the client needs to send).

**Deliverable:** All repositories and DTOs compile cleanly.

---

### 📆 DAY 5 — Backend: Exception Handling + Admin Service & Controller

**Goal:** Set up global exception handling and build the Admin module end-to-end.

**Files to work on:**
- `exception/ResourceNotFoundException.java`
- `exception/BadRequestException.java`
- `exception/GlobalExceptionHandler.java`
- `service/AdminService.java`
- `serviceimpl/AdminServiceImpl.java`
- `controller/AdminController.java`

**Step 1 — Exception classes:**
```java
// ResourceNotFoundException.java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
}

// BadRequestException.java
public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}

// GlobalExceptionHandler.java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<String> handleBadRequest(BadRequestException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidation(MethodArgumentNotValidException ex) {
        // collect field errors and return as map
    }
}
```

**Step 2 — AdminService interface:**
```java
public interface AdminService {
    Admin login(AdminLoginRequest request);
    Admin getAdminById(Integer id);
}
```

**Step 3 — AdminServiceImpl:**
```java
@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Override
    public Admin login(AdminLoginRequest request) {
        return adminRepository.findByUsername(request.getUsername())
            .filter(a -> a.getPassword().equals(request.getPassword()))
            .orElseThrow(() -> new BadRequestException("Invalid username or password"));
    }
}
```

**Step 4 — AdminController:**
```java
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@Valid @RequestBody AdminLoginRequest request) {
        Admin admin = adminService.login(request);
        return ResponseEntity.ok(admin);
    }
}
```

**Test with Postman:**
- `POST http://localhost:8080/api/admin/login`
- Body: `{ "username": "admin", "password": "admin123" }`

**Deliverable:** Login API works and returns admin data or error response.

---

### 📆 DAY 6 — Backend: Hostel & Room Modules

**Goal:** Complete Hostel and Room service + controller with full CRUD.

**Files to work on:**
- `service/HostelService.java` + `serviceimpl/HostelServiceImpl.java` + `controller/HostelController.java`
- `service/RoomService.java` *(note: this file is missing from serviceimpl — check if `RoomService.java` exists in service folder, create it)* + `serviceimpl/RoomServiceImpl.java` + `controller/RoomController.java`
- `dto/HostelRequest.java`, `dto/RoomRequest.java`

**HostelService interface methods:**
```java
public interface HostelService {
    Hostel addHostel(HostelRequest request);
    List<Hostel> getAllHostels();
    Hostel getHostelById(Integer id);
    Hostel updateHostel(Integer id, HostelRequest request);
    void deleteHostel(Integer id);
}
```

**HostelController endpoints:**
```
POST   /api/hostels          → Add hostel
GET    /api/hostels           → Get all hostels
GET    /api/hostels/{id}      → Get by ID
PUT    /api/hostels/{id}      → Update
DELETE /api/hostels/{id}      → Delete
```

**RoomController endpoints:**
```
POST   /api/rooms             → Add room (needs hostelId in request)
GET    /api/rooms             → Get all rooms
GET    /api/rooms/{id}        → Get by ID
GET    /api/rooms/hostel/{hostelId}  → Get rooms by hostel
PUT    /api/rooms/{id}        → Update
DELETE /api/rooms/{id}        → Delete
```

**Deliverable:** Test all endpoints in Postman. Rooms should link to a hostel via `hostelId`.

---

### 📆 DAY 7 — Backend: Bed & Tenant Modules

**Goal:** Complete Bed and Tenant service + controller.

**Files to work on:**
- `service/BedService.java` + `serviceimpl/BedServiceImpl.java` + `controller/BedController.java`
- `service/TenantService.java` + `serviceimpl/TenantServiceImpl.java` + `controller/TenantController.java`
- `dto/BedRequest.java`, `dto/TenantRequest.java`

**BedController endpoints:**
```
POST   /api/beds              → Add bed (needs roomId in request)
GET    /api/beds              → Get all beds
GET    /api/beds/{id}         → Get by ID
GET    /api/beds/room/{roomId} → Get beds by room
GET    /api/beds/available    → Get available beds only
PUT    /api/beds/{id}         → Update
DELETE /api/beds/{id}         → Delete
```

**TenantController endpoints:**
```
POST   /api/tenants           → Add tenant
GET    /api/tenants           → Get all tenants
GET    /api/tenants/{id}      → Get by ID
GET    /api/tenants/active    → Get active tenants
PUT    /api/tenants/{id}      → Update
DELETE /api/tenants/{id}      → Delete (soft delete — set status = INACTIVE)
```

**Deliverable:** All Bed and Tenant CRUD endpoints work in Postman.

---

### 📆 DAY 8 — Backend: Allocation Module

**Goal:** Build the Allocation module — the core logic that assigns a tenant to a bed.

**Files to work on:**
- `service/AllocationService.java` + `serviceimpl/AllocationServiceImpl.java` + `controller/AllocationController.java`
- `dto/AllocationRequest.java`

**Business Logic in AllocationServiceImpl:**
- When allocating a tenant to a bed:
  1. Check if bed status is `AVAILABLE` — throw `BadRequestException` if not
  2. Check if tenant status is `ACTIVE`
  3. Save the allocation with status `ACTIVE`
  4. Update bed status to `OCCUPIED`
- When vacating (PUT /api/allocations/{id}/vacate):
  1. Set allocation status to `VACATED`
  2. Set vacating date to today
  3. Update the bed status back to `AVAILABLE`

**AllocationController endpoints:**
```
POST   /api/allocations               → Allocate tenant to bed
GET    /api/allocations               → Get all allocations
GET    /api/allocations/{id}          → Get by ID
GET    /api/allocations/tenant/{tenantId} → Get allocations by tenant
PUT    /api/allocations/{id}/vacate   → Vacate a bed
```

**Deliverable:** Allocation and vacating flow works correctly. Bed status updates automatically.

---

### 📆 DAY 9 — Backend: Payment & Complaint Modules

**Goal:** Complete Payment and Complaint modules.

**Files to work on:**
- `service/PaymentService.java` + `serviceimpl/PaymentServiceImpl.java` + `controller/PaymentController.java`
- `service/ComplaintService.java` + `serviceimpl/ComplaintServiceImpl.java` + `controller/ComplaintController.java`
- `dto/PaymentRequest.java`, `dto/ComplaintRequest.java`

**PaymentController endpoints:**
```
POST   /api/payments              → Record a payment
GET    /api/payments              → Get all payments
GET    /api/payments/{id}         → Get by ID
GET    /api/payments/tenant/{tenantId} → Payments by tenant
GET    /api/payments/pending      → All pending payments
PUT    /api/payments/{id}         → Update payment status
```

**ComplaintController endpoints:**
```
POST   /api/complaints            → File a complaint
GET    /api/complaints            → Get all complaints
GET    /api/complaints/{id}       → Get by ID
GET    /api/complaints/open       → Get open complaints
PUT    /api/complaints/{id}/status → Update complaint status (OPEN/IN_PROGRESS/RESOLVED)
```

**Deliverable:** Both modules work end-to-end in Postman.

---

### 📆 DAY 10 — Backend: Notice & Visitor Modules + Final API Test

**Goal:** Complete Notice and Visitor modules, then test all 10 APIs together.

**Files to work on:**
- `service/NoticeService.java` + `serviceimpl/NoticeServiceImpl.java` + `controller/NoticeController.java`
- `service/VisitorService.java` + `serviceimpl/VisitorServiceImpl.java` + `controller/VisitorController.java`
- `dto/NoticeRequest.java`, `dto/VisitorRequest.java`

**NoticeController endpoints:**
```
POST   /api/notices           → Create notice
GET    /api/notices           → Get all notices
GET    /api/notices/{id}      → Get by ID
DELETE /api/notices/{id}      → Delete
```

**VisitorController endpoints:**
```
POST   /api/visitors              → Log a visitor entry
GET    /api/visitors              → Get all visitors
GET    /api/visitors/{id}         → Get by ID
GET    /api/visitors/tenant/{tenantId} → Visitors by tenant
PUT    /api/visitors/{id}/checkout → Set check-out time
```

**Final Day 10 task:** Create a Postman collection with all 40+ API requests organized by module. Export it as `PG-Management-API.postman_collection.json` and commit it to `Database/` folder.

**Deliverable:** All 10 modules work. Full Postman collection committed.

---

### 📆 DAY 11 — Frontend: Angular Project Setup & Models

**Goal:** Set up the Angular app properly — configure HttpClient, define all TypeScript models.

**Files to work on:**
- `Frontend/pg-system-frontend/src/app/app.config.ts`
- `Frontend/pg-system-frontend/src/app/models/admin.model.ts`
- `Frontend/pg-system-frontend/src/app/models/hostel.model.ts`
- `Frontend/pg-system-frontend/src/app/models/room.model.ts`
- `Frontend/pg-system-frontend/src/app/models/bed.model.ts`
- `Frontend/pg-system-frontend/src/app/models/allocation.model.ts`
- `Frontend/pg-system-frontend/src/app/models/complaint.model.ts`
- `Frontend/pg-system-frontend/src/app/models/payment.model.ts`
- `Frontend/pg-system-frontend/src/app/models/visitor.model.ts`
- Create new: `Frontend/pg-system-frontend/src/app/models/tenant.model.ts`
- Create new: `Frontend/pg-system-frontend/src/app/models/notice.model.ts`

**Step 1 — `app.config.ts`:** Add `provideHttpClient()`:
```typescript
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
```

**Step 2 — Define all models** (matching your entity fields):
```typescript
// Example: hostel.model.ts
export interface Hostel {
  id?: number;
  name: string;
  address: string;
  phone: string;
  totalRooms: number;
  createdAt?: string;
}

// tenant.model.ts
export interface Tenant {
  id?: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  aadharNumber: string;
  emergencyContact: string;
  joinDate: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

// Similarly fill: Admin, Room, Bed, Allocation, Payment, Complaint, Notice, Visitor
```

**Deliverable:** All models defined. `ng build` runs without errors.

---

### 📆 DAY 12 — Frontend: All Angular Services

**Goal:** Implement all 10 Angular services to call the backend APIs using `HttpClient`.

**Files to work on (all services):**
- `services/admin.ts`, `services/hostel.ts`, `services/room.ts`, `services/bed.ts`
- `services/tenant.ts`, `services/allocation.ts`, `services/payment.ts`
- `services/complaint.ts`, `services/notice.ts`, `services/visitor.ts`

**Pattern to follow for each service:**
```typescript
// Example: services/hostel.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hostel } from '../models/hostel.model';

@Injectable({ providedIn: 'root' })
export class HostelService {
  private apiUrl = 'http://localhost:8080/api/hostels';

  constructor(private http: HttpClient) {}

  getAllHostels(): Observable<Hostel[]> {
    return this.http.get<Hostel[]>(this.apiUrl);
  }

  getHostelById(id: number): Observable<Hostel> {
    return this.http.get<Hostel>(`${this.apiUrl}/${id}`);
  }

  addHostel(hostel: Hostel): Observable<Hostel> {
    return this.http.post<Hostel>(this.apiUrl, hostel);
  }

  updateHostel(id: number, hostel: Hostel): Observable<Hostel> {
    return this.http.put<Hostel>(`${this.apiUrl}/${id}`, hostel);
  }

  deleteHostel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

**Also rename the service class in `admin.ts`** from `Admin` to `AdminService` and add:
```typescript
login(credentials: { username: string, password: string }): Observable<Admin> {
  return this.http.post<Admin>('http://localhost:8080/api/admin/login', credentials);
}
```

**Deliverable:** All 10 services implemented. Each service class is properly named (e.g. `HostelService`, `TenantService`).

---

### 📆 DAY 13 — Frontend: App Routing Setup

**Goal:** Configure all routes in `app.routes.ts` and set up the main app shell.

**Files to work on:**
- `Frontend/pg-system-frontend/src/app/app.routes.ts`
- `Frontend/pg-system-frontend/src/app/app.html`
- `Frontend/pg-system-frontend/src/app/app.ts`

**`app.routes.ts`** — Define all routes:
```typescript
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'dashboard',
    component: Dashboard,
    // canActivate: [AuthGuard]  ← add this on Day 15
    children: [
      { path: 'hostels', component: HostelListComponent },
      { path: 'hostels/add', component: HostelAddComponent },
      { path: 'hostels/edit/:id', component: HostelEditComponent },
      { path: 'rooms', component: RoomListComponent },
      { path: 'rooms/add', component: RoomAddComponent },
      { path: 'rooms/edit/:id', component: RoomEditComponent },
      { path: 'beds', component: BedListComponent },
      { path: 'beds/add', component: BedAddComponent },
      { path: 'beds/edit/:id', component: BedEditComponent },
      { path: 'tenants', component: TenantListComponent },
      { path: 'tenants/add', component: TenantAddComponent },
      { path: 'tenants/edit/:id', component: TenantEditComponent },
      { path: 'allocations', component: AllocationListComponent },
      { path: 'allocations/add', component: AllocationAddComponent },
      { path: 'payments', component: PaymentListComponent },
      { path: 'payments/add', component: PaymentAddComponent },
      { path: 'complaints', component: ComplaintListComponent },
      { path: 'complaints/add', component: ComplaintAddComponent },
      { path: 'notices', component: NoticeListComponent },
      { path: 'notices/add', component: NoticeAddComponent },
      { path: 'visitors', component: VisitorListComponent },
      { path: 'visitors/add', component: VisitorAddComponent },
    ]
  },
  { path: '**', redirectTo: '/login' }
];
```

**`app.html`** — Add just `<router-outlet />` to render routed components.

**Deliverable:** Navigating to `/login` shows the login component. No errors in browser console.

---

### 📆 DAY 14 — Frontend: Login Component

**Goal:** Build the Login page — HTML form, validation, API call, and redirect on success.

**Files to work on:**
- `components/login/login.ts`
- `components/login/login.html`
- `components/login/login.css`

**`login.ts`:**
```typescript
@Component({ selector: 'app-login', ... })
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private adminService: AdminService, private router: Router) {}

  onLogin() {
    this.adminService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (admin) => {
          localStorage.setItem('admin', JSON.stringify(admin));
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.errorMessage = 'Invalid username or password';
        }
      });
  }
}
```

**`login.html`:** Create a centered login form with:
- Username input (bound to `username`)
- Password input (bound to `password`, type=password)
- Login button that calls `onLogin()`
- Error message div (shown when `errorMessage` is set)

**`login.css`:** Style the login card — center it on screen, add box shadow, padding.

**Deliverable:** Login works. On success, stores admin in `localStorage` and navigates to `/dashboard`.

---

### 📆 DAY 15 — Frontend: Auth Guard & HTTP Interceptor

**Goal:** Protect dashboard routes from unauthenticated access. Add auth header to every HTTP request.

**Files to work on (create these):**
- `Frontend/pg-system-frontend/src/app/guards/auth.guard.ts`
- `Frontend/pg-system-frontend/src/app/inceptors/auth.interceptor.ts`

**`auth.guard.ts`:**
```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const admin = localStorage.getItem('admin');
    if (admin) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
```

**`auth.interceptor.ts`:** Attach admin info to headers (since we're not using JWT):
```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const admin = localStorage.getItem('admin');
  if (admin) {
    const cloned = req.clone({ headers: req.headers.set('X-Admin-Id', JSON.parse(admin).id) });
    return next(cloned);
  }
  return next(req);
};
```

**Update `app.routes.ts`:** Add `canActivate: [AuthGuard]` to the dashboard route.

**Update `app.config.ts`:** Register the interceptor:
```typescript
provideHttpClient(withInterceptors([authInterceptor]))
```

**Deliverable:** Navigating directly to `/dashboard` without login redirects to `/login`.

---

### 📆 DAY 16 — Frontend: Dashboard Layout & Sidebar

**Goal:** Build the dashboard shell with a sidebar navigation and top navbar.

**Files to work on:**
- `components/dashboard/dashboard.ts`
- `components/dashboard/dashboard.html`
- `components/dashboard/dashboard.css`

**`dashboard.html`** — Layout structure:
```html
<div class="dashboard-layout">
  <!-- Sidebar -->
  <aside class="sidebar">
    <div class="logo">PG Manager</div>
    <nav>
      <a routerLink="hostels">🏠 Hostels</a>
      <a routerLink="rooms">🚪 Rooms</a>
      <a routerLink="beds">🛏 Beds</a>
      <a routerLink="tenants">👤 Tenants</a>
      <a routerLink="allocations">📋 Allocations</a>
      <a routerLink="payments">💰 Payments</a>
      <a routerLink="complaints">⚠️ Complaints</a>
      <a routerLink="notices">📢 Notices</a>
      <a routerLink="visitors">🚶 Visitors</a>
    </nav>
    <button (click)="logout()">Logout</button>
  </aside>

  <!-- Main area -->
  <main class="main-content">
    <router-outlet />
  </main>
</div>
```

**`dashboard.ts`:** Add a `logout()` method that clears `localStorage` and navigates to `/login`.

**`dashboard.css`:** Use CSS flexbox — sidebar fixed on left (220px wide), main content fills the rest.

**Deliverable:** Dashboard layout renders. Sidebar links are clickable. Logout works.

---

### 📆 DAY 17 — Frontend: Hostel Module (List + Add + Edit)

**Goal:** Build complete Hostel management UI.

**Files to work on:**
- `components/hostel/hostel-list/hostel-list.ts` + `.html` + `.css`
- `components/hostel/hostel-add/hostel-add.ts` + `.html` + `.css`
- `components/hostel/hostel-edit/hostel-edit.ts` + `.html` + `.css`

**`hostel-list.ts`:**
```typescript
export class HostelListComponent {
  hostels: Hostel[] = [];

  constructor(private hostelService: HostelService, private router: Router) {}

  ngOnInit() {
    this.hostelService.getAllHostels().subscribe(data => this.hostels = data);
  }

  deleteHostel(id: number) {
    if (confirm('Delete this hostel?')) {
      this.hostelService.deleteHostel(id).subscribe(() => this.ngOnInit());
    }
  }
}
```

**`hostel-list.html`:** Display hostels in a table with columns: Name, Address, Phone, Total Rooms, Actions (Edit button → navigate to `/dashboard/hostels/edit/:id`, Delete button).

**`hostel-add.ts`:** Reactive form using `FormsModule`. On submit call `hostelService.addHostel()`, then navigate back to `/dashboard/hostels`.

**`hostel-edit.ts`:** Read `:id` from route params using `ActivatedRoute`. Pre-fill form with existing data. On submit call `hostelService.updateHostel()`.

**Deliverable:** Can add, view, edit, and delete hostels from the UI.

---

### 📆 DAY 18 — Frontend: Room Module (List + Add + Edit)

**Goal:** Build complete Room management UI with hostel dropdown.

**Files to work on:**
- `components/room/room-list/room-list.ts` + `.html` + `.css`
- `components/room/room-add/room-add.ts` + `.html` + `.css`
- `components/room/room-edit/room-edit.ts` + `.html` + `.css`

**Key points:**
- Room Add form needs a **dropdown to select Hostel** — load all hostels via `HostelService` on `ngOnInit()`
- Room list table columns: Room Number, Type, Floor, Status, Hostel Name, Actions
- Room Edit pre-fills the form and updates via `roomService.updateRoom()`
- Status should show color-coded badge: green=AVAILABLE, red=OCCUPIED, orange=MAINTENANCE

**Deliverable:** Room CRUD works. Rooms are linked to hostels correctly.

---

### 📆 DAY 19 — Frontend: Bed Module (List + Add + Edit)

**Goal:** Build Bed management UI with room dropdown.

**Files to work on:**
- `components/bed/bed-list/bed-list.ts` + `.html` + `.css`
- `components/bed/bed-add/bed-add.ts` + `.html` + `.css`
- `components/bed/bed-edit/bed-edit.ts` + `.html` + `.css`

**Key points:**
- Bed Add form needs a **dropdown to select Room** — load rooms via `RoomService`
- Bed list shows: Bed Number, Room Number, Status (AVAILABLE/OCCUPIED), Actions
- Show a count of available beds somewhere on the list page

**Deliverable:** Bed CRUD works. Beds are linked to rooms.

---

### 📆 DAY 20 — Frontend: Tenant Module (List + Add + Edit)

**Goal:** Build complete Tenant management UI.

**Files to work on:**
- `components/tenant/tenant-list/tenant-list.ts` + `.html` + `.css`
- `components/tenant/tenant-add/tenant-add.ts` + `.html` + `.css`
- `components/tenant/tenant-edit/tenant-edit.ts` + `.html` + `.css`

**Key points:**
- Tenant form fields: Name, Email, Phone, Address, Aadhar Number, Emergency Contact, Join Date
- Tenant list table: Name, Email, Phone, Status (color badge), Join Date, Actions
- Delete should be a **soft delete** — calls the API which sets status to INACTIVE (don't remove from list, just update the badge)
- Add a filter: "Show Active Only" checkbox

**Deliverable:** Tenant CRUD works. Soft delete shows status change in the list.

---

### 📆 DAY 21 — Frontend: Allocation Module (List + Add + Vacate)

**Goal:** Build Allocation UI — the most important module.

**Files to work on:**
- `components/allocation/allocation-list/allocation-list.ts` + `.html` + `.css`
- `components/allocation/allocation-add/allocation-add.ts` + `.html` + `.css`

**Key points:**
- Allocation Add needs **two dropdowns**: Tenant (active only) + Bed (available only). Load both from their services.
- Allocation list shows: Tenant Name, Bed Number, Room Number, Allocation Date, Status, Actions
- Add a **"Vacate"** button in the list that calls `PUT /api/allocations/{id}/vacate`
- After vacating, refresh the list — the row should show status VACATED and Vacate button disappears
- No edit page needed — allocations are either ACTIVE or VACATED

**Deliverable:** Full allocation flow works — allocate a tenant to a bed, then vacate.

---

### 📆 DAY 22 — Frontend: Payment Module (List + Add)

**Goal:** Build Payment recording and history UI.

**Files to work on:**
- `components/payment/payment-list/payment-list.ts` + `.html` + `.css`
- `components/payment/payment-add/payment-add.ts` + `.html` + `.css`

**Key points:**
- Payment Add form: Tenant dropdown, Amount, Payment Date, Payment Month (text input like "August 2026"), Payment Mode (dropdown: CASH/UPI/BANK_TRANSFER), Remarks
- Payment list table: Tenant Name, Amount, Month, Mode, Status (color badge), Date, Actions
- Add filter buttons: All | Paid | Pending
- Add a small **summary** at the top: "Total Collected: ₹X" (sum of all PAID payments)

**Deliverable:** Payments can be recorded and viewed with filtering.

---

### 📆 DAY 23 — Frontend: Complaint Module (List + Add)

**Goal:** Build Complaint management UI.

**Files to work on:**
- `components/complaint/complaint-list/complaint-list.ts` + `.html` + `.css`
- `components/complaint/complaint-add/complaint-add.ts` + `.html` + `.css`

**Key points:**
- Complaint Add: Tenant dropdown, Title input, Description textarea
- Complaint list: Tenant Name, Title, Status badge (red=OPEN, yellow=IN_PROGRESS, green=RESOLVED), Date, Actions
- Add a **status update dropdown** in the list — admin can change status directly from the table using a `<select>` and a Save button
- Filter tabs: All | Open | In Progress | Resolved

**Deliverable:** Complaints can be filed, viewed, and status updated.

---

### 📆 DAY 24 — Frontend: Notice Module (List + Add)

**Goal:** Build Notice board UI.

**Files to work on:**
- `components/notice/notice-list/notice-list.ts` + `.html` + `.css`
- `components/notice/notice-add/notice-add.ts` + `.html` + `.css`

**Key points:**
- Notice Add: Title input + Content textarea (multiline)
- Notice list: Show notices as **cards** (not a table) with title, date, content preview
- Each card has a Delete button
- Sort by most recent first

**Deliverable:** Notices can be created, viewed as cards, and deleted.

---

### 📆 DAY 25 — Frontend: Visitor Module (List + Add)

**Goal:** Build Visitor log UI with check-in/check-out.

**Files to work on:**
- `components/visitor/visitor-list/visitor-list.ts` + `.html` + `.css`
- `components/visitor/visitor-add/visitor-add.ts` + `.html` + `.css`

**Key points:**
- Visitor Add: Tenant dropdown, Visitor Name, Visitor Phone, Purpose, Visit Date, Check-in Time
- Visitor list table: Visitor Name, Tenant Name, Phone, Purpose, Date, Check-in, Check-out, Actions
- Add a **"Check Out"** button that calls `PUT /api/visitors/{id}/checkout` and sets check-out time to current time
- If check-out is already recorded, show the time and hide the button

**Deliverable:** Visitor log works with check-in/check-out functionality.

---

### 📆 DAY 26 — Frontend: Dashboard Home / Summary Page

**Goal:** Build the dashboard home page with overview statistics.

**Files to work on:**
- `components/dashboard/dashboard.ts`
- `components/dashboard/dashboard.html`
- `components/dashboard/dashboard.css`

**What to add to dashboard home (default `/dashboard` route):**
Create a summary cards section that shows:
- Total Hostels
- Total Rooms
- Total Active Tenants
- Available Beds
- Open Complaints
- Pending Payments

Each stat should be fetched from the relevant service on `ngOnInit()`. Display as a **grid of stat cards** with an icon, number, and label.

**Also add:**
- Welcome message: "Welcome, [Admin Name]" — read admin from `localStorage`
- Recent notices — show last 3 notices fetched from `NoticeService`

**Deliverable:** Dashboard home shows live stats pulled from the backend.

---

### 📆 DAY 27 — UI Polish: Styling, Responsiveness & Toast Notifications

**Goal:** Improve the overall look and feel. Add feedback messages for user actions.

**Files to work on:**
- `Frontend/pg-system-frontend/src/styles.css` (global styles)
- All component `.css` files as needed
- Create: `Frontend/pg-system-frontend/src/app/shared/toast/toast.component.ts` + `.html` + `.css`

**What to do:**

1. **Global Styles (`styles.css`):** Define CSS variables for colors, fonts, spacing:
   ```css
   :root {
     --primary: #3b5bdb;
     --success: #2f9e44;
     --danger: #e03131;
     --warning: #f59f00;
     --bg: #f8f9fa;
     --text: #212529;
   }
   ```

2. **Toast Notification Component:** Create a reusable `ToastComponent` in the `shared/` folder:
   - Methods: `showSuccess(message)`, `showError(message)`
   - Auto-hides after 3 seconds
   - Shows a colored banner at the top-right corner

3. **Add the toast to every Add/Edit/Delete operation** across all modules (replace `alert()` and `confirm()` with proper toast).

4. **Table styling:** Ensure all tables have consistent styling — striped rows, hover highlight.

5. **Responsive sidebar:** On small screens, sidebar should collapse to icon-only or hide.

**Deliverable:** App looks polished and professional. All success/error messages use toast notifications.

---

### 📆 DAY 28 — Validation & Error Handling

**Goal:** Add proper form validation on frontend and handle backend errors gracefully.

**Files to work on:** All `*-add.ts`, `*-edit.ts`, `*-add.html`, `*-edit.html` files across all components.

**What to do:**

1. **Frontend validation** — Add `required`, `minlength`, `pattern`, and `email` validators to all forms. Show inline error messages below each invalid field:
   ```html
   <div *ngIf="form.get('email')?.invalid && form.get('email')?.touched">
     <small class="error">Valid email is required</small>
   </div>
   ```

2. **Specific validations:**
   - Phone numbers: exactly 10 digits pattern `^[0-9]{10}$`
   - Aadhar number: exactly 12 digits
   - Email: valid email format
   - Amount in payments: must be > 0
   - Dates: join date cannot be in the future

3. **HTTP error handling** — Update all `.subscribe()` calls to handle errors:
   ```typescript
   this.service.addSomething(data).subscribe({
     next: () => { this.toast.showSuccess('Added successfully!'); },
     error: (err) => { this.toast.showError(err.error || 'Something went wrong'); }
   });
   ```

4. **Backend 404 handling** — If a `GET /{id}` returns 404, navigate back to the list page and show an error toast.

**Deliverable:** Forms cannot be submitted with invalid data. Server errors show meaningful messages.

---

### 📆 DAY 29 — Testing & Bug Fixing

**Goal:** End-to-end testing of the complete application. Fix all bugs found.

**No specific files** — test the entire application flow.

**Test scenarios to go through:**

1. **Login flow:** Wrong credentials → error message. Correct credentials → dashboard. Refresh page → still on dashboard (not logged out). Logout → redirected to login. Try to access `/dashboard` manually without login → redirected to login.

2. **Hostel → Room → Bed chain:** Add a hostel. Add a room under that hostel. Add 2 beds under that room. Verify they show up in lists.

3. **Allocation flow:** Add a tenant. Allocate them to an available bed. Verify bed status changes to OCCUPIED. Try to allocate another tenant to the same bed → should fail with error. Vacate the allocation → bed goes back to AVAILABLE.

4. **Payment flow:** Record a payment for a tenant. View payment history. Update status to PAID.

5. **Complaint flow:** File a complaint. Update status from OPEN → IN_PROGRESS → RESOLVED.

6. **Visitor flow:** Log a visitor for a tenant. Check out. Verify check-out time is recorded.

7. **Delete cascade:** Try to delete a hostel that has rooms — does it fail gracefully or cascade? Handle this properly.

**Document all bugs found** in a `BUGS.md` file at the root of the project. Fix them.

---

### 📆 DAY 30 — Final Cleanup, README & Project Submission

**Goal:** Clean up code, write documentation, and prepare the project for handover.

**Files to work on:**
- `README.md` (root level — create/update)
- `Database/SQLquery.sql` (ensure it's complete and clean)
- Any file with `console.log` or debug code (remove them)

**`README.md` should include:**

```markdown
# PG Hostel Management Portal

A full-stack web application to manage PG/Hostel operations.

## Tech Stack
- **Frontend:** Angular 18
- **Backend:** Spring Boot 4, Spring Data JPA, Hibernate
- **Database:** MySQL 8
- **Tools:** Lombok, Postman

## Modules
- Admin Login
- Hostel Management
- Room Management
- Bed Management
- Tenant Management
- Allocation Management
- Payment Tracking
- Complaint Management
- Notice Board
- Visitor Log

## Setup Instructions

### Database
1. Create MySQL database: `CREATE DATABASE pg_management;`
2. Run `Database/SQLquery.sql`

### Backend
1. Update `application.properties` with your MySQL credentials
2. Run: `cd Backend/pg-management && mvn spring-boot:run`
3. API available at: http://localhost:8080

### Frontend
1. Run: `cd Frontend/pg-system-frontend && npm install && ng serve`
2. Open: http://localhost:4200

### Default Login
- Username: admin
- Password: admin123
(Insert this record manually in the admin table)

## API Documentation
See `Database/PG-Management-API.postman_collection.json`
```

**Final checklist before submission:**
- [ ] All 10 backend modules working with Postman
- [ ] All Angular routes working
- [ ] Login + Auth Guard working
- [ ] All CRUD operations working
- [ ] Form validation in place
- [ ] No `console.log` debug statements
- [ ] README is complete
- [ ] SQL file is complete
- [ ] Postman collection committed

---

## 📊 Summary Table

| Day | Area | Module/Task |
|-----|------|-------------|
| 1 | Database | SQL Schema — all 10 tables |
| 2 | Backend | Project config, DB connection, CORS, pom.xml fix |
| 3 | Backend | All 10 JPA Entities with Lombok + Hibernate annotations |
| 4 | Backend | All 10 Repositories + All 10 DTOs |
| 5 | Backend | Exception handling + Admin login API |
| 6 | Backend | Hostel + Room CRUD APIs |
| 7 | Backend | Bed + Tenant CRUD APIs |
| 8 | Backend | Allocation API (with bed status logic) |
| 9 | Backend | Payment + Complaint APIs |
| 10 | Backend | Notice + Visitor APIs + Postman collection |
| 11 | Frontend | App config + All TypeScript models |
| 12 | Frontend | All 10 Angular services (HttpClient) |
| 13 | Frontend | App routing setup |
| 14 | Frontend | Login page |
| 15 | Frontend | Auth Guard + HTTP Interceptor |
| 16 | Frontend | Dashboard layout + Sidebar |
| 17 | Frontend | Hostel module UI |
| 18 | Frontend | Room module UI |
| 19 | Frontend | Bed module UI |
| 20 | Frontend | Tenant module UI |
| 21 | Frontend | Allocation module UI |
| 22 | Frontend | Payment module UI |
| 23 | Frontend | Complaint module UI |
| 24 | Frontend | Notice module UI |
| 25 | Frontend | Visitor module UI |
| 26 | Frontend | Dashboard home with stats |
| 27 | Frontend | UI polish + Toast notifications |
| 28 | Frontend | Form validation + Error handling |
| 29 | Both | End-to-end testing + Bug fixes |
| 30 | Both | Cleanup + README + Final submission |

---

*Generated for 1 intern · 30 working days · Angular + Spring Boot + Hibernate + MySQL*
