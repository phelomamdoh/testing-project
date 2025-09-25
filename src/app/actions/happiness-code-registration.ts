"use server";

import nodemailer from "nodemailer";
import { google } from "googleapis";

interface RegistrationData {
  name: string;
  email: string;
  mobile: string;
}

interface RegistrationResult {
  success: boolean;
  message: string;
  error?: string;
}

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
};

// Google Sheets configuration
const getGoogleSheetsClient = async () => {
  const credentials = {
    type: "service_account",
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`,
  };

  const auth = new google.auth.GoogleAuth({
    credentials: credentials as any,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  return sheets;
};

// User confirmation email template for Happiness Code
const getUserConfirmationEmail = (data: RegistrationData) => {
  return {
    subject: "Welcome to The Happiness Code - Registration Confirmed!",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registration Confirmed</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; font-size: 28px; margin: 0;">The Happiness Code</h1>
              <p style="color: #64748b; font-size: 16px; margin: 10px 0 0 0;">By Bestselling Author Sherife AbdelMessih</p>
            </div>

            <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
              <h2 style="margin: 0 0 10px 0; font-size: 24px;">Welcome ${data.name}!</h2>
              <p style="margin: 0; font-size: 18px;">Your registration has been confirmed</p>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="color: #1e293b; margin-bottom: 15px;">What's Next?</h3>
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px;">
                <h4 style="color: #92400e; margin: 0 0 10px 0;">Payment Instructions</h4>
                <p style="color: #78350f; margin: 0;">Please transfer the program fees to Loay over Instapay:</p>
                <p style="color: #78350f; margin: 10px 0; font-weight: bold; font-size: 18px; background-color: #fed7aa; padding: 8px; border-radius: 4px;">Instapay Number: 01550455588</p>
                <p style="color: #78350f; margin: 5px 0 0 0; font-weight: bold;">5,000 EGP per month over 3 months</p>
                <p style="color: #78350f; margin: 5px 0 0 0;">The first monthly payment is due now.</p>
              </div>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="color: #1e293b; margin-bottom: 15px;">Your Registration Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b;">${data.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b;">${data.email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Mobile:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b;">${data.mobile}</td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="color: #1e293b; margin-bottom: 15px;">What You'll Gain</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">✓ 8 hours of live online sessions with Sherife</li>
                <li style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">✓ Exclusive access to science-based happiness frameworks</li>
                <li style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">✓ Direct interaction and Q&A sessions</li>
                <li style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">✓ Lifetime access to session recordings</li>
                <li style="padding: 8px 0;">✓ Private community access with fellow participants</li>
              </ul>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                For any questions, please contact us at 
                <a href="mailto:s@sherifeabdelmessih.com" style="color: #2563eb;">s@sherifeabdelmessih.com</a>
              </p>
              <p style="color: #64748b; font-size: 14px; margin: 10px 0 0 0;">
                Visit <a href="https://sherifeabdelmessih.com" style="color: #2563eb;">sherifeabdelmessih.com</a>
              </p>
            </div>

          </div>
        </body>
      </html>
    `,
  };
};

// Admin notification email template for Happiness Code
const getAdminNotificationEmail = (data: RegistrationData) => {
  return {
    subject: "New Registration - The Happiness Code",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Registration</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #dc2626; font-size: 28px; margin: 0;">New Registration Alert</h1>
              <p style="color: #64748b; font-size: 16px; margin: 10px 0 0 0;">The Happiness Code Program</p>
            </div>

            <div style="background: linear-gradient(135deg, #dc2626, #ea580c); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
              <h2 style="margin: 0 0 10px 0; font-size: 24px;">New Participant Registered!</h2>
              <p style="margin: 0; font-size: 16px;">Registration Date: ${new Date().toLocaleString()}</p>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="color: #1e293b; margin-bottom: 15px;">Participant Details</h3>
              <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Name:</td>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${
                    data.name
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Email:</td>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                    <a href="mailto:${
                      data.email
                    }" style="color: #2563eb; text-decoration: none;">${
      data.email
    }</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 15px; font-weight: bold; color: #475569; background-color: #f1f5f9;">Mobile:</td>
                  <td style="padding: 15px; color: #1e293b;">
                    <a href="tel:${
                      data.mobile
                    }" style="color: #2563eb; text-decoration: none;">${
      data.mobile
    }</a>
                  </td>
                </tr>
              </table>
            </div>

            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px;">
              <h4 style="color: #92400e; margin: 0 0 10px 0;">Action Required</h4>
              <p style="color: #78350f; margin: 0;">Please follow up with the participant regarding payment instructions and provide any additional course details.</p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                This is an automated notification from The Happiness Code registration system.
              </p>
            </div>

          </div>
        </body>
      </html>
    `,
  };
};

// Add data to Google Sheets (Happiness Code)
const addToGoogleSheets = async (data: RegistrationData) => {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId =
      process.env.GOOGLE_SHEET_ID_HAPPINESS_CODE || process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error("Google Sheet ID for Happiness Code not configured");
    }

    // Prepare the row data
    const values = [
      [
        new Date().toISOString(), // Timestamp
        data.name,
        data.email,
        data.mobile,
        "Pending Payment", // Status
        new Date().toLocaleDateString(), // Registration Date
      ],
    ];

    // Append the data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    return true;
  } catch (error) {
    console.error("Error adding to Google Sheets:", error);
    throw error;
  }
};

// Send confirmation email to user
const sendConfirmationEmail = async (data: RegistrationData) => {
  const transporter = createTransporter();
  const emailContent = getUserConfirmationEmail(data);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: data.email,
    subject: emailContent.subject,
    html: emailContent.html,
  });
};

// Send notification email to admin
const sendAdminNotification = async (data: RegistrationData) => {
  const transporter = createTransporter();
  const emailContent = getAdminNotificationEmail(data);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: emailContent.subject,
    html: emailContent.html,
  });
};

// Main registration action for Happiness Code
export async function registerForHappinessCode(
  formData: FormData
): Promise<RegistrationResult> {
  try {
    // Extract data from form
    const registrationData: RegistrationData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      mobile: formData.get("mobile") as string,
    };

    // Validate required fields
    if (
      !registrationData.name ||
      !registrationData.email ||
      !registrationData.mobile
    ) {
      return {
        success: false,
        message: "All fields are required",
        error: "Missing required fields",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registrationData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
        error: "Invalid email format",
      };
    }

    // Execute all operations
    const promises = [];

    // Add to Google Sheets
    promises.push(addToGoogleSheets(registrationData));

    // Send confirmation email to user
    promises.push(sendConfirmationEmail(registrationData));

    // Send notification to admin
    promises.push(sendAdminNotification(registrationData));

    // Wait for all operations to complete
    await Promise.all(promises);

    return {
      success: true,
      message:
        "Registration successful! Please check your email for confirmation and payment instructions.",
    };
  } catch (error) {
    console.error("Registration error:", error);
    return {
      success: false,
      message: "Registration failed. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
