export interface User {
  id: string;
  email: string;
  userType: 'sme' | 'investor';
  companyName?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: Date;
}

export interface Invoice {
  id: string;
  smeId: string;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'verified' | 'funded' | 'paid';
  verificationDocuments: string[];
  chunks: InvoiceChunk[];
  createdAt: Date;
}

export interface InvoiceChunk {
  id: string;
  invoiceId: string;
  amount: number;
  status: 'available' | 'funded' | 'paid';
  investorId?: string;
  expectedReturn: number;
  fundedAt?: Date;
}