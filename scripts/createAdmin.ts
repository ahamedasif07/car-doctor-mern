import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

async function CreateAdmin() {
  try {
    await dbConnect();
    console.log("MongoDB Connected!");

    const adminEmail = (process.env.ADMIN_EMAIL || "rxasif04@gmail.com").toLowerCase().trim();
    const adminUsername = (process.env.ADMIN_USERNAME || "admin").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "123456";
    const adminName = process.env.ADMIN_NAME || "Admin";

    
    const existingAdmin = await User.findOne({
      $or: [{ email: adminEmail }, { username: adminUsername }],
    });

    if (existingAdmin) {
      existingAdmin.name = adminName;
      existingAdmin.username = adminUsername;
      existingAdmin.email = adminEmail;
      existingAdmin.password = adminPassword; 
      existingAdmin.role = "admin";
      await existingAdmin.save();
 
    } else {
      await User.create({
        name: adminName,
        username: adminUsername,
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      console.log(`✅ Admin created:`);
      console.log(`   Username: ${adminUsername}`);
      console.log(`   Email:    ${adminEmail}`);
      console.log(`   Role:     admin`);
    }

    console.log("🎉 Amdin Create completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed To Create Admin :", error);
    process.exit(1);
  }
}

CreateAdmin();
