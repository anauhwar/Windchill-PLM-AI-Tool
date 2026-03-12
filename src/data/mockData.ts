export const parts = [
  { id: 'C1000', name: 'Car Assembly', version: 'A', supplier: 'Internal', cost: 0, category: 'Assembly' },
  { id: 'P1001', name: 'Engine', version: 'A', supplier: 'Bosch', cost: 5000, category: 'Mechanical' },
  { id: 'P1002', name: 'Battery', version: 'B', supplier: 'Panasonic', cost: 3000, category: 'Electrical' },
  { id: 'P1003', name: 'Wheel', version: 'A', supplier: 'Michelin', cost: 200, category: 'Mechanical' },
  { id: 'P1004', name: 'Chassis', version: 'C', supplier: 'Magna', cost: 4000, category: 'Structural' },
  { id: 'P1005', name: 'ECU', version: 'A', supplier: 'Bosch', cost: 800, category: 'Electrical' },
  { id: 'P1006', name: 'Piston', version: 'A', supplier: 'Mahle', cost: 50, category: 'Mechanical' },
  { id: 'P1007', name: 'Piston Ring', version: 'A', supplier: 'Mahle', cost: 10, category: 'Mechanical' },
  { id: 'P1008', name: 'Tire', version: 'A', supplier: 'Michelin', cost: 100, category: 'Mechanical' },
  { id: 'P1009', name: 'Rim', version: 'B', supplier: 'BBS', cost: 100, category: 'Mechanical' },
];

export const bom = [
  { parent: 'C1000', child: 'P1001', qty: 1 },
  { parent: 'C1000', child: 'P1002', qty: 1 },
  { parent: 'C1000', child: 'P1003', qty: 4 },
  { parent: 'C1000', child: 'P1004', qty: 1 },
  { parent: 'C1000', child: 'P1005', qty: 1 },
  { parent: 'P1001', child: 'P1006', qty: 4 },
  { parent: 'P1006', child: 'P1007', qty: 3 },
  { parent: 'P1003', child: 'P1008', qty: 1 },
  { parent: 'P1003', child: 'P1009', qty: 1 },
];

export const changeRequests = [
  { id: 'ECO123', partId: 'P1001', status: 'Approved', date: '2025-02-10', description: 'Update engine mapping for better fuel efficiency.' },
  { id: 'ECO124', partId: 'P1002', status: 'Pending', date: '2025-03-01', description: 'Switch to higher capacity battery cells.' },
  { id: 'ECO125', partId: 'P1007', status: 'In Review', date: '2025-03-10', description: 'Change piston ring material to reduce friction.' },
  { id: 'ECO126', partId: 'P1005', status: 'Approved', date: '2025-01-15', description: 'Firmware update for ECU.' },
];
