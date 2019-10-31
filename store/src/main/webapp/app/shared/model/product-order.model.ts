import { Moment } from 'moment';
import { IOrderItem } from 'app/shared/model/order-item.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IProductOrder {
  id?: number;
  placedDate?: Moment;
  status?: OrderStatus;
  code?: string;
  invoiceId?: number;
  orderItems?: IOrderItem[];
  customer?: ICustomer;
}

export const defaultValue: Readonly<IProductOrder> = {};
