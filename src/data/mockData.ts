export const parts = [
  // Level 0 - Root
  { id: 'EV-1000', name: 'Electric SUV 2025', version: 'B', supplier: 'Internal', cost: 0, category: 'Assembly', lifecycle: 'IN_WORK', leadTime: 0, weight_kg: 2100 },
  
  // Level 1 - Main Systems
  { id: 'PWR-2000', name: 'Powertrain Assembly', version: 'A', supplier: 'Internal', cost: 12500, category: 'Assembly', lifecycle: 'RELEASED', leadTime: 14, weight_kg: 650 },
  { id: 'CHS-5000', name: 'Chassis Assembly', version: 'C', supplier: 'Internal', cost: 4200, category: 'Assembly', lifecycle: 'IN_WORK', leadTime: 21, weight_kg: 400 },
  { id: 'INT-6000', name: 'Interior Cabin Assembly', version: 'A', supplier: 'Internal', cost: 3500, category: 'Assembly', lifecycle: 'RELEASED', leadTime: 30, weight_kg: 250 },
  { id: 'BDY-7000', name: 'Body in White (BiW)', version: 'B', supplier: 'Magna', cost: 5500, category: 'Structural', lifecycle: 'RELEASED', leadTime: 45, weight_kg: 500 },

  // Level 2 - Powertrain Subsystems
  { id: 'BAT-3000', name: 'High Voltage Battery Pack', version: 'B', supplier: 'Panasonic', cost: 8500, category: 'Electrical', lifecycle: 'RELEASED', leadTime: 60, weight_kg: 450 },
  { id: 'DRV-4000', name: 'Dual Motor Drive Unit', version: 'A', supplier: 'Bosch', cost: 3200, category: 'Mechanical', lifecycle: 'RELEASED', leadTime: 45, weight_kg: 180 },
  { id: 'CBL-100', name: 'HV Cabling Harness', version: 'A', supplier: 'Aptiv', cost: 800, category: 'Electrical', lifecycle: 'IN_WORK', leadTime: 25, weight_kg: 20 },

  // Level 3 - Battery Components
  { id: 'BAT-3001', name: 'Lithium-Ion Cell 4680', version: 'A', supplier: 'Panasonic', cost: 1.5, category: 'Electrical', lifecycle: 'RELEASED', leadTime: 90, weight_kg: 0.35 },
  { id: 'BAT-3002', name: 'Battery Management System (BMS)', version: 'C', supplier: 'LG Chem', cost: 450, category: 'Electrical', lifecycle: 'IN_WORK', leadTime: 40, weight_kg: 2.5 },
  { id: 'BAT-3003', name: 'Titanium Enclosure', version: 'A', supplier: 'Internal', cost: 600, category: 'Structural', lifecycle: 'RELEASED', leadTime: 15, weight_kg: 45 },
  { id: 'BAT-3004', name: 'Liquid Cooling Plate', version: 'B', supplier: 'Modine', cost: 250, category: 'Mechanical', lifecycle: 'RELEASED', leadTime: 35, weight_kg: 12 },

  // Level 3 - Drive Unit Components
  { id: 'DRV-4001', name: 'Copper Stator', version: 'A', supplier: 'Bosch', cost: 600, category: 'Mechanical', lifecycle: 'RELEASED', leadTime: 30, weight_kg: 40 },
  { id: 'DRV-4002', name: 'Magnetic Rotor', version: 'A', supplier: 'Bosch', cost: 450, category: 'Mechanical', lifecycle: 'RELEASED', leadTime: 30, weight_kg: 35 },
  { id: 'DRV-4003', name: 'Silicon Carbide Inverter', version: 'B', supplier: 'Infineon', cost: 1200, category: 'Electrical', lifecycle: 'IN_WORK', leadTime: 120, weight_kg: 15 },
  { id: 'DRV-4004', name: 'Reduction Gearbox', version: 'A', supplier: 'ZF', cost: 950, category: 'Mechanical', lifecycle: 'RELEASED', leadTime: 50, weight_kg: 90 },

  // Level 2 - Chassis Subsystems
  { id: 'CHS-5001', name: 'Air Suspension Module', version: 'B', supplier: 'Continental', cost: 1200, category: 'Mechanical', lifecycle: 'RELEASED', leadTime: 40, weight_kg: 60 },
  { id: 'CHS-5002', name: 'Brake Caliper Assembly', version: 'A', supplier: 'Brembo', cost: 800, category: 'Mechanical', lifecycle: 'RELEASED', leadTime: 35, weight_kg: 25 },
  { id: 'CHS-5003', name: 'Wheel Assembly 20"', version: 'A', supplier: 'Internal', cost: 1600, category: 'Assembly', lifecycle: 'RELEASED', leadTime: 10, weight_kg: 120 },

  // Level 3 - Wheel Components
  { id: 'WHL-100', name: 'Forged Alloy Rim 20"', version: 'A', supplier: 'BBS', cost: 250, category: 'Structural', lifecycle: 'RELEASED', leadTime: 45, weight_kg: 12 },
  { id: 'WHL-200', name: 'All-Season EV Tire', version: 'A', supplier: 'Michelin', cost: 140, category: 'Mechanical', lifecycle: 'RELEASED', leadTime: 20, weight_kg: 14 },
  { id: 'WHL-300', name: 'TPMS Sensor', version: 'B', supplier: 'Denso', cost: 10, category: 'Electrical', lifecycle: 'RELEASED', leadTime: 15, weight_kg: 0.05 },

  // Level 2 - Interior Subsystems
  { id: 'INT-6001', name: 'Dashboard Assembly', version: 'C', supplier: 'Faurecia', cost: 1100, category: 'Assembly', lifecycle: 'IN_WORK', leadTime: 45, weight_kg: 40 },
  { id: 'INT-6002', name: 'Ergonomic Front Seats', version: 'A', supplier: 'Lear', cost: 1800, category: 'Mechanical', lifecycle: 'RELEASED', leadTime: 30, weight_kg: 80 },
  { id: 'INT-6003', name: 'HVAC System', version: 'A', supplier: 'Denso', cost: 600, category: 'Mechanical', lifecycle: 'RELEASED', leadTime: 40, weight_kg: 25 },

  // Level 3 - Dashboard Components
  { id: 'SCR-100', name: '15" OLED Center Display', version: 'A', supplier: 'LG Display', cost: 450, category: 'Electrical', lifecycle: 'RELEASED', leadTime: 60, weight_kg: 3 },
  { id: 'SCR-200', name: 'Digital Instrument Cluster', version: 'B', supplier: 'Bosch', cost: 300, category: 'Electrical', lifecycle: 'RELEASED', leadTime: 50, weight_kg: 1.5 },
  { id: 'MCU-100', name: 'Main Control Unit (MCU)', version: 'D', supplier: 'NVIDIA', cost: 1500, category: 'Electrical', lifecycle: 'IN_WORK', leadTime: 90, weight_kg: 2 },

  // Common Hardware (Used everywhere)
  { id: 'HW-9001', name: 'M8x1.25 Titanium Bolt', version: 'A', supplier: 'Fastenal', cost: 2.5, category: 'Hardware', lifecycle: 'RELEASED', leadTime: 5, weight_kg: 0.02 },
  { id: 'HW-9002', name: 'M6 Steel Washer', version: 'A', supplier: 'Fastenal', cost: 0.1, category: 'Hardware', lifecycle: 'RELEASED', leadTime: 5, weight_kg: 0.005 },
  { id: 'HW-9003', name: 'Thermal Paste (10g)', version: 'A', supplier: '3M', cost: 15, category: 'Consumable', lifecycle: 'RELEASED', leadTime: 10, weight_kg: 0.01 },
];

export const bom = [
  // Level 1
  { parent: 'EV-1000', child: 'PWR-2000', qty: 1 },
  { parent: 'EV-1000', child: 'CHS-5000', qty: 1 },
  { parent: 'EV-1000', child: 'INT-6000', qty: 1 },
  { parent: 'EV-1000', child: 'BDY-7000', qty: 1 },

  // Powertrain
  { parent: 'PWR-2000', child: 'BAT-3000', qty: 1 },
  { parent: 'PWR-2000', child: 'DRV-4000', qty: 2 }, // Dual motor
  { parent: 'PWR-2000', child: 'CBL-100', qty: 1 },
  { parent: 'PWR-2000', child: 'HW-9001', qty: 24 }, // Mounting bolts

  // Battery Pack
  { parent: 'BAT-3000', child: 'BAT-3001', qty: 4680 }, // 4680 cells
  { parent: 'BAT-3000', child: 'BAT-3002', qty: 1 },
  { parent: 'BAT-3000', child: 'BAT-3003', qty: 1 },
  { parent: 'BAT-3000', child: 'BAT-3004', qty: 4 },
  { parent: 'BAT-3000', child: 'HW-9003', qty: 10 }, // Thermal paste

  // Drive Unit
  { parent: 'DRV-4000', child: 'DRV-4001', qty: 1 },
  { parent: 'DRV-4000', child: 'DRV-4002', qty: 1 },
  { parent: 'DRV-4000', child: 'DRV-4003', qty: 1 },
  { parent: 'DRV-4000', child: 'DRV-4004', qty: 1 },
  { parent: 'DRV-4000', child: 'HW-9001', qty: 12 },

  // Chassis
  { parent: 'CHS-5000', child: 'CHS-5001', qty: 4 }, // 4 air suspensions
  { parent: 'CHS-5000', child: 'CHS-5002', qty: 4 }, // 4 brakes
  { parent: 'CHS-5000', child: 'CHS-5003', qty: 4 }, // 4 wheels
  { parent: 'CHS-5000', child: 'HW-9001', qty: 32 },

  // Wheel Assembly
  { parent: 'CHS-5003', child: 'WHL-100', qty: 1 },
  { parent: 'CHS-5003', child: 'WHL-200', qty: 1 },
  { parent: 'CHS-5003', child: 'WHL-300', qty: 1 },

  // Interior
  { parent: 'INT-6000', child: 'INT-6001', qty: 1 },
  { parent: 'INT-6000', child: 'INT-6002', qty: 2 }, // 2 front seats
  { parent: 'INT-6000', child: 'INT-6003', qty: 1 },

  // Dashboard
  { parent: 'INT-6001', child: 'SCR-100', qty: 1 },
  { parent: 'INT-6001', child: 'SCR-200', qty: 1 },
  { parent: 'INT-6001', child: 'MCU-100', qty: 1 },
  { parent: 'INT-6001', child: 'HW-9002', qty: 16 }, // Washers for mounting
];

export const changeRequests = [
  { 
    id: 'ECO-2025-001', 
    partId: 'BAT-3002', 
    status: 'In Review', 
    date: '2025-03-10', 
    priority: 'High',
    type: 'Engineering Change Order',
    description: 'Upgrade BMS firmware to v3.0 and modify PCB layout to mitigate thermal throttling during DC fast charging.' 
  },
  { 
    id: 'ECO-2025-002', 
    partId: 'DRV-4003', 
    status: 'Approved', 
    date: '2025-02-28', 
    priority: 'Critical',
    type: 'Engineering Change Order',
    description: 'Switch to next-gen Silicon Carbide (SiC) MOSFETs from Infineon to improve inverter efficiency by 4%.' 
  },
  { 
    id: 'ECR-2025-015', 
    partId: 'HW-9001', 
    status: 'Pending', 
    date: '2025-03-12', 
    priority: 'Medium',
    type: 'Engineering Change Request',
    description: 'Evaluate alternative suppliers for M8 Titanium Bolts due to projected supply chain shortages from Fastenal.' 
  },
  { 
    id: 'ECO-2025-008', 
    partId: 'MCU-100', 
    status: 'In Work', 
    date: '2025-03-05', 
    priority: 'High',
    type: 'Engineering Change Order',
    description: 'Rev D release: Integrate NVIDIA Orin SoC to support Level 3 autonomous driving features.' 
  },
  { 
    id: 'ECO-2024-199', 
    partId: 'WHL-200', 
    status: 'Implemented', 
    date: '2024-11-20', 
    priority: 'Low',
    type: 'Engineering Change Order',
    description: 'Update tire tread pattern specification to reduce road noise by 2dB.' 
  },
  { 
    id: 'ECR-2025-022', 
    partId: 'INT-6001', 
    status: 'Rejected', 
    date: '2025-01-15', 
    priority: 'Low',
    type: 'Engineering Change Request',
    description: 'Proposal to change dashboard material to recycled ocean plastics. Rejected due to failure in UV degradation testing.' 
  },
  { 
    id: 'ECO-2025-011', 
    partId: 'BAT-3004', 
    status: 'Approved', 
    date: '2025-03-01', 
    priority: 'Medium',
    type: 'Engineering Change Order',
    description: 'Redesign liquid cooling plate micro-channels to improve flow distribution and reduce pressure drop.' 
  },
  { 
    id: 'ECO-2025-014', 
    partId: 'CHS-5001', 
    status: 'In Review', 
    date: '2025-03-14', 
    priority: 'High',
    type: 'Engineering Change Order',
    description: 'Update air suspension compressor mounting brackets to resolve NVH (Noise, Vibration, Harshness) issues reported in QA.' 
  }
];
