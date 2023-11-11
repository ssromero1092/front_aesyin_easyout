import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceService } from 'src/app/services/service.service';
import { UsersService } from 'src/app/services/users.service';
import { DatePipe } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { of, throwError } from 'rxjs';

fdescribe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;
  let mockServiceService: jasmine.SpyObj<ServiceService>;
  let mockUsersService: jasmine.SpyObj<UsersService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockDatePipe: jasmine.SpyObj<DatePipe>;

  beforeEach(waitForAsync(() => {
    mockServiceService = jasmine.createSpyObj('ServiceService', ['getServicebyClient']);
    mockUsersService = jasmine.createSpyObj('UsersService', ['getidClient']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockDatePipe = jasmine.createSpyObj('DatePipe', ['transform']);

    TestBed.configureTestingModule({
      declarations: [InicioComponent],
      providers: [
        { provide: ServiceService, useValue: mockServiceService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: DatePipe, useValue: mockDatePipe }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.loading).toBeFalse();
    expect(component.table).toBeFalse();
    // Add more expectations as needed
  });

  it('should call list() on ngOnInit', () => {
    spyOn(component, 'list');
    component.ngOnInit();
    expect(component.list).toHaveBeenCalled();
  });

  it('should populate data and dataTable on list()', async () => {
    const fakeData = [{ status: 200, body: { data: [/* sample data here */] } }];
    mockServiceService.getServicebyClient.and.returnValue(of(fakeData));
    spyOn(component, 'compareDates').and.returnValue(0); // Mocking compareDates result for simplicity

    await component.list();

    expect(component.data).toEqual(jasmine.any(Array));
    expect(component.dataTable).toEqual(jasmine.any(Array));
    // Add more expectations as needed
  });

  it('should handle errors on list()', fakeAsync(() => {
    const errorMessage = 'Error message';
    mockServiceService.getServicebyClient.and.returnValue(throwError(errorMessage)); // Use throwError to simulate an error

    component.list();
    tick();

    expect(component.snackBar.open).toHaveBeenCalledWith(errorMessage, '', { duration: 2000 });
    // Asegúrate de ajustar el segundo y tercer argumento según las necesidades reales de tu aplicación
    // Por ejemplo, duration puede variar y debes ajustarlo según lo necesario.
    // También puedes agregar más expectativas según sea necesario.
  }));


  it('should toggle table on openTable()', () => {
    component.table = false;
    component.openTable();
    expect(component.table).toBeTrue();

    component.table = true;
    component.openTable();
    expect(component.table).toBeFalse();
  });

  // Add more tests for getStatusOrder, compareDates, getFormattedDate, etc.

  // You can also add tests for other methods and behaviors in the component

  afterEach(() => {
    fixture.destroy();
  });
});
