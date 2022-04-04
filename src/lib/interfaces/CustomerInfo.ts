export interface CustomerInfo {
  ssn: string;
  dateOfBirth: string;
  photoIdPath: string | File | null;
  proofOfAddressPath: string | File | null;
  // eslint-disable-next-line camelcase
  toc_agreement_ind: boolean;
  // eslint-disable-next-line camelcase
  poa_agreement_ind: boolean;
}