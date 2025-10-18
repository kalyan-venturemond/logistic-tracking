import { Shipment } from "../../types/shipments";

export const driverSectionInputsData = [
  { label: 'رقم الشاحنة', name: 'driverVehicleNumber' },
  { label: 'رقم الهاتف', name: 'driverPhoneNumber' },
];

export const costSectionInputsData = [
  { label: 'التكلفة الأساسية', name: 'baseCost', type: 'number' },
  { label: 'الزيادة', name: 'extraCost', type: 'number' },
];

export const shipmentSectionInputsData = [
  {
    label: 'تاريخ التحميل',
    name: 'shipmentPickupDate',
    type: 'date',
    description:
      'يتم تحديد تاريخ التحميل بشكل تلقائي حسب تاريخ اليوم، إذا كانت الشحنة تستلزم تاريخا محدددا للتحميل يمكنك التعديل بناء عليه.',
  },
  {
    label: 'تاريخ التسليم',
    name: 'shipmentExpectedDeliveryDate',
    type: 'date',
    description: 'أكّد مع المستلم التاريخ الدقيق للاستلام',
  },
  { label: 'المحتويات', name: 'shipmentContent' },
  { label: 'الوزن بالطن', name: 'shipmentWeight' },
];

export const shipperSectionInputsData = [{ label: 'العنوان', name: 'shipperAddress' }];

export const recipientSectionInputsData = [{ label: 'العنوان', name: 'recipientAddress' }];

export const selectMenuOptions = [
  { label: 'الكل', value: 'all' },
  { label: 'قيد الشحن', value: 'shipping' },
  { label: 'متأخرة', value: 'delayed' },
  { label: 'تم التوصيل', value: 'delivered' },
  { label: 'مكتملة', value: 'completed' },
  { label: 'ملغية', value: 'canceled' },
  { label: 'مرتجعة', value: 'returned' },
];

export const fieldsToCheck: (keyof Shipment)[] = [
  'id',
  'admin',
  'recipient',
  'driver',
  'shipperBranch',
  'pickupCity',
  'dropOffCity',
  'pickupDate',
  'status',
];
