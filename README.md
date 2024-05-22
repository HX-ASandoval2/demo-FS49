# Cohorte FT49 - Módulo 4

## TypeScript

- [TypeScript - Documentación Oficial](https://www.typescriptlang.org/)
- [TypeScript](./XpertReadmes/TypeScript.md)

## Nest

- [Nest JS - Documentación Oficial](https://nestjs.com/)
- [CLI - Command Line Interface](./resume_lectures/NestJS-CLI.md)
- [Configuración](./resume_lectures/NestJS-Configuration.md)
- [Decoradores (Decorators)](./resume_lectures/NestJS-Decorators.md)
- [Implementar Morgan en Nest JS](./resume_lectures/NestJS-Morgan.md)

## 01 - Backend Architecture

- [Link al resumen de la Clase](./resume_lectures/NestJS-01.md)
- [Status Code - Cats](https://http.cat/)
- [Status Code - Dogs](https://http.dog/)
- [LucidChart - Crear Diagrama Entigad Relación](https://www.lucidchart.com)

## 02 - Nest JS Fundamentals I

- [Link al resumen de la Clase](./resume_lectures/NestJS-02.md)

## 03 - Nest JS Fundamentals II

- [Link al resumen de la Clase](./resume_lectures/NestJS-03.md)

## 04 - Nest JS Routing

- [Link al resumen de la Clase](./resume_lectures/NestJS-04.md)

## 05 - Nest JS & TypeORM

- [Link al resumen de la Clase](./resume_lectures/NestJS-05.md)

## 06 - Nest JS Pipes

- [Link al resumen de la Clase](./resume_lectures/NestJS-06.md)

## 07 - Nest JS File Upload

- [Link al resumen de la Clase](./resume_lectures/NestJS-07.md)

## 08 - Nest JS Authentication I

- [Link al resumen de la Clase](./resume_lectures/NestJS-08.md)

## 09 - Nest JS Authentication II

- [Link al resumen de la Clase](./resume_lectures/NestJS-09.md)

## 10 - Nest JS Testing

- [Link al resumen de la Clase](./resume_lectures/NestJS-10.md)

## 11 - Nest JS Open API

- [Link al resumen de la Clase](./resume_lectures/NestJS-11.md)

## 12 - Docker

- [Link al resumen de la Clase](./resume_lectures/NestJS-12.md)

## 13 - Deployment

- [Link al resumen de la Clase](./resume_lectures/NestJS-13.md)

## 14 - JavaScript III

- [Link al resumen de la Clase](./resume_lectures/NestJS-14.md)



Usa las entidades y repositorios: En tus servicios o controladores, puedes inyectar el repositorio de una entidad para realizar operaciones en la base de datos. Por ejemplo:
TypeScript

// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // ... otras operaciones
}
Código generado por IA. Revisar y usar cuidadosamente. Más información sobre preguntas frecuentes.
Exporta el módulo de base de datos: En tu módulo principal (por lo general, app.module.ts), importa y exporta el módulo de base de datos:
TypeScript

// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Importa tus entidades
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(), // Configuración global de TypeORM
    TypeOrmModule.forFeature([User]), // Repositorios disponibles
  ],
  providers: [UserService],
})
export class AppModule {}
Código generado por IA. Revisar y usar cuidadosamente. Más información sobre preguntas frecuentes.
¡Listo! Ahora tienes TypeORM configurado en tu proyecto Nest.js. Puedes comenzar a crear tus servicios, controladores y rutas para interactuar con la base de datos. Si tienes más preguntas o necesitas más detalles, no dudes en preguntar. 😊