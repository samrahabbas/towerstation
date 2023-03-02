export interface CustomerDto {
  id: number;
  uuid: string;
  file: any;
  role_id: string;
  createdBy: string;
  createdAt: Date
  updatedBy: string;
  updatedAt: Date;
  status: string,
  raw: string
}
