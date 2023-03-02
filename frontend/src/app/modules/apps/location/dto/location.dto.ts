import { LocationContactDto } from "./location-contact.dto";

export interface LocationDto {
  id: string;
  street1: string;
  street2: string;
  zipCode: string;
  state: string;
  city: string;
  telephone: string;
  locationTypes: string[];
  locationCodes: string[];
  privateNotes: string;
  locationContacts: LocationContactDto[];
}
