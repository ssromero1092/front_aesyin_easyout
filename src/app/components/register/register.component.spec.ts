import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { NgForm } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { RegisterComponent } from './register.component';
import { UsersService } from '../../services/users.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: jasmine.SpyObj<UsersService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UsersService', ['register']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: UsersService, useValue: userServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('debe mostrar snackbar si faltan campos obligatorios', () => {
  const form: NgForm = {
    value: {
      typeDocument: '',
      document: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confPassword: '',
      phone: '',
      address: '',
    },
    resetForm: () => {},
  } as NgForm;

  component.onSubmit(form);

  expect(snackBar.open).toHaveBeenCalledWith('Por favor completa todos los campos requeridos', '', { duration: 2000 });
});


it('debería mostrar snackbar si las contraseñas no coinciden', () => {
  const form: NgForm = {
    value: {
      typeDocument: 'CC',
      document: '1111111111',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password1',
      confPassword: 'password2',
      phone: '123456789',
      address: 'Some Address',
    },
    resetForm: () => {},
  } as NgForm;

  component.onSubmit(form);

  expect(snackBar.open).toHaveBeenCalledWith('Las contraseñas no coinciden', '', { duration: 2000 });
});


it('debe llamar a userService.register y mostrar snackbar exitoso en el registro exitoso', fakeAsync(() => {
  const form: NgForm = {
    value: {
      typeDocument: 'CC',
      document: '1111111111',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password1',
      confPassword: 'password1',
      phone: '123456789',
      address: 'Some Address',
    },
    resetForm: () => {},
  } as NgForm;

  userService.register.and.returnValue(of({}));
  spyOn(component.snackBar, 'open');

  component.onSubmit(form);
  tick();

  expect(userService.register).toHaveBeenCalledOnceWith({
    typeDocument: 'CC',
    document: '1111111111',
    name: 'John Doe',
    password: 'password1',
    confPassword: 'password1',
    phone: '123456789',
    address: 'Some Address',
    email: 'john.doe@example.com',
  });
  expect(component.snackBar.open).toHaveBeenCalledWith('Usuario se registró correctamente', '');
}));


it('debería mostrar snackbar con un mensaje de error al fallar el registro', fakeAsync(() => {
  const form: NgForm = {
    value: {
      typeDocument: 'CC',
      document: '1111111111',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password1',
      confPassword: 'password1',
      phone: '123456789',
      address: 'Some Address',
    },
    resetForm: () => {},
  } as NgForm;

  const errorMessage = 'Se produjo un error durante el registro.';
  userService.register.and.returnValue(throwError({ error: { detail: errorMessage } }));
  spyOn(component.snackBar, 'open');

  component.onSubmit(form);
  tick();

  expect(userService.register).toHaveBeenCalledOnceWith({
    typeDocument: 'CC',
    document: '1111111111',
    name: 'John Doe',
    password: 'password1',
    confPassword: 'password1',
    phone: '123456789',
    address: 'Some Address',
    email: 'john.doe@example.com',
  });
  expect(component.snackBar.open).toHaveBeenCalledWith(errorMessage, '', { duration: 2000 });
}));


});
