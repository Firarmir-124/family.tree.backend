export class CreateRequestDto {
  action: string;
  payload?: {
    toUser: string;
  };
}
