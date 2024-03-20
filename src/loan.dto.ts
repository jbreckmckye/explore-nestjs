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
