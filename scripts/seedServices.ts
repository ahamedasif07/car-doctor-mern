import dbConnect from "@/lib/dbConnect";
import Service from "@/models/Service";

export const initialServices = [
  {
    title: "Electrical System Repair",
    img: "/images/hero_banner.jpg",
    price: "20.00",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    facility: [
      {
        name: "Instant Car Services",
        details: "It Uses A Dictionary Of Over 200 Latin Words, Combined With A Model Sentence Structure.",
      },
      {
        name: "24/7 Quality Service",
        details: "Round-the-clock emergency support with certified technicians and precision diagnostic tools.",
      },
      {
        name: "Easy Customer Service",
        details: "Hassle-free booking, transparent estimates, and friendly assistance every step of the way.",
      },
      {
        name: "Quality Cost Service",
        details: "Affordable competitive pricing with 100% genuine parts and lifetime workmanship warranty.",
      },
    ],
  },
  {
    title: "Engine Diagnostics & Tune-up",
    img: "/images/about_parts.jpg",
    price: "30.00",
    description:
      "Advanced computerized engine diagnostics pinpointing performance lags, sensor malfunctions, and misfires to restore maximum power, fuel efficiency, and smooth horsepower output.",
    facility: [
      {
        name: "Computer Diagnostic Scan",
        details: "Deep ECU scan to uncover hidden trouble codes and electrical anomalies.",
      },
      {
        name: "Spark Plug & Filter Check",
        details: "Inspection and replacement of fouled plugs, coils, and air filters.",
      },
      {
        name: "Emission System Test",
        details: "Exhaust and catalytic converter efficiency verification.",
      },
      {
        name: "Performance Calibration",
        details: "Throttle body and fuel trim optimization for optimal MPG.",
      },
    ],
  },
  {
    title: "Auto Car Repair & Maintenance",
    img: "/images/about_mechanic.jpg",
    price: "45.00",
    description:
      "Comprehensive bumper-to-bumper vehicle maintenance designed to keep your car operating safely and reliably through all driving conditions and seasons.",
    facility: [
      {
        name: "Multi-Point Safety Inspection",
        details: "Thorough 50-point checklist covering suspension, chassis, and steering.",
      },
      {
        name: "Fluid Top-Up & Flush",
        details: "Coolant, transmission, power steering, and washer fluid servicing.",
      },
      {
        name: "Belt & Hose Inspection",
        details: "Checking serpentine belts and radiator hoses for cracks and wear.",
      },
      {
        name: "Road Test Verification",
        details: "Real-world test drive by master mechanics to confirm repair quality.",
      },
    ],
  },
  {
    title: "Battery & Charging System",
    img: "/images/about_parts.jpg",
    price: "25.00",
    description:
      "Complete battery load testing, terminal corrosion cleaning, and alternator output verification to prevent unexpected breakdowns and starting failures.",
    facility: [
      {
        name: "Cold Crank Amps Test",
        details: "Testing battery health under simulated cold start loads.",
      },
      {
        name: "Alternator Output Check",
        details: "Measuring voltage regulator and stator electrical stability.",
      },
      {
        name: "Terminal Anti-Corrosion",
        details: "Protective coating and terminal cleaning for maximum conductivity.",
      },
      {
        name: "Warranty Replacement",
        details: "Immediate on-site replacement with premium high-capacity batteries.",
      },
    ],
  },
  {
    title: "Brake Fluid & Pad Replacement",
    img: "/images/hero_banner.jpg",
    price: "35.00",
    description:
      "Precision brake service including ceramic pad replacement, rotor resurfacing, caliper inspection, and hydraulic fluid bleed for maximum stopping power and safety.",
    facility: [
      {
        name: "Ceramic Brake Pads",
        details: "Low-dust, ultra-quiet ceramic pads offering superior stopping distance.",
      },
      {
        name: "Rotor Thickness Measurement",
        details: "Precision micrometer inspection to ensure rotor safety specs.",
      },
      {
        name: "Brake Line Hydraulic Bleed",
        details: "Removing air bubbles and moisture for firm, responsive pedal feel.",
      },
      {
        name: "Anti-lock (ABS) Sensor Scan",
        details: "Electronic verification of ABS wheel speed sensors.",
      },
    ],
  },
  {
    title: "Full Vehicle Inspection",
    img: "/images/about_mechanic.jpg",
    price: "50.00",
    description:
      "Comprehensive certified inspection ideal for pre-purchase evaluations, annual roadworthiness certificates, and high-mileage road trip preparations.",
    facility: [
      {
        name: "Undercarriage & Rust Check",
        details: "Lifting vehicle to inspect floor pans, exhaust, and suspension bushings.",
      },
      {
        name: "Tire Tread & Alignment",
        details: "Laser tread depth measurement and camber/toe angle verification.",
      },
      {
        name: "HVAC Climate Control Check",
        details: "Air conditioning refrigerant pressure and heater core testing.",
      },
      {
        name: "Digital Inspection Report",
        details: "Detailed PDF report with high-res photos delivered to your inbox.",
      },
    ],
  },
];

async function seedServices() {
  try {
    await dbConnect();
    console.log("Connecting to MongoDB to clean and re-seed Services...");

    // Drop legacy index on service_id if exists
    try {
      await Service.collection.dropIndex("service_id_1");
      console.log("Dropped legacy service_id index.");
    } catch {
      // Index didn't exist or already dropped
    }

    // Clean existing services
    await Service.deleteMany({});
    console.log("Cleared old services collection.");

    // Insert clean services (MongoDB will auto-generate _id)
    const inserted = await Service.insertMany(initialServices);

    console.log(`🎉 Successfully seeded ${inserted.length} services with pure MongoDB _id:`);
    inserted.forEach((s) => {
      console.log(`   - ${s.title} (ObjectId: ${s._id})`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed services:", error);
    process.exit(1);
  }
}

seedServices();
