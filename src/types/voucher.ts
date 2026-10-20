export type VoucherStatus = "ACTIVE" | "SCHEDULED" | "EXPIRED";

export interface VoucherItem {
  id: string;
  code: string;        
  eventId: string;       
  eventName: string;      
  discount: string;       
  validPeriod: string    
  used: number;           
  status: VoucherStatus;
}

export type VoucherFormData = Omit<VoucherItem, "id" | "used">;
