/**
 * DTOs are the Nest convention for serialisation
 * Can use 'class-validator' decorators for validation
 */

export class LoanDto {
  constructor(
    public book: number,
    public user: number
  ) {}
}

export class ReturnDto {
  constructor(
    public book: number
  ) {}
}
