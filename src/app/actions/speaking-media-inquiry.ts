"use server";

import nodemailer from "nodemailer";
import { google } from "googleapis";

interface InquiryData {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  inquiryType: string;
  // Speaking event fields
  eventType?: string;
  eventLocation?: string;
  company?: string;
  topic?: string;
  audienceSize?: string;
  eventDate?: string;
  budget?: string;
  additionalInfo?: string;
  // Media inquiry fields
  mediaType?: string;
}

interface InquiryResult {
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

// User confirmation email template
const getUserConfirmationEmail = (data: InquiryData) => {
  const inquiryTypeDisplay =
    data.inquiryType === "speaking"
      ? "Invitation to speak at an event"
      : "Media or interview inquiries";

  const fullName =
    data.firstName && data.lastName
      ? `${data.firstName} ${data.lastName}`
      : "there";

  return {
    subject: "Your Speaking & Media Inquiry - Confirmation",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Inquiry Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb; font-size: 28px; margin: 0;">Sherife AbdelMessih</h1>
              <p style="color: #64748b; font-size: 16px; margin: 10px 0 0 0;">Bestselling Author & MIT Scientist</p>
            </div>

            <div style="background: linear-gradient(135deg, #2563eb, #7c3aed); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
              <h2 style="margin: 0 0 10px 0; font-size: 24px;">Thank You, ${fullName}!</h2>
              <p style="margin: 0; font-size: 18px;">We've received your inquiry</p>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="color: #1e293b; margin-bottom: 15px;">Your Inquiry Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Inquiry Type:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b;">${inquiryTypeDisplay}</td>
                </tr>
                ${
                  data.firstName
                    ? `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Name:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b;">${fullName}</td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Email:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b;">${
                    data.email
                  }</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Phone:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b;">${
                    data.phone
                  }</td>
                </tr>
                ${
                  data.eventType
                    ? `
                <tr>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569;">Event Type:</td>
                  <td style="padding: 10px; border-bottom: 1px solid #e2e8f0; color: #64748b;">${
                    data.eventType === "inPerson" ? "In Person" : "Virtual"
                  }</td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>

            <div style="background-color: #dbeafe; border-left: 4px solid #2563eb; padding: 15px; margin-bottom: 20px;">
              <h4 style="color: #1e40af; margin: 0 0 10px 0;">What's Next?</h4>
              <p style="color: #1e3a8a; margin: 0;">Our team will review your inquiry and get back to you as soon as possible. We appreciate your interest in working with Sherife.</p>
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

// Admin notification email template
const getAdminNotificationEmail = (data: InquiryData) => {
  const inquiryTypeDisplay =
    data.inquiryType === "speaking"
      ? "Invitation to speak at an event"
      : "Media or interview inquiries";

  const fullName =
    data.firstName && data.lastName
      ? `${data.firstName} ${data.lastName}`
      : "N/A";

  return {
    subject: `New Speaking & Media Inquiry - ${inquiryTypeDisplay}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Inquiry</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #dc2626; font-size: 28px; margin: 0;">New Inquiry Alert</h1>
              <p style="color: #64748b; font-size: 16px; margin: 10px 0 0 0;">Speaking & Media Inquiries</p>
            </div>

            <div style="background: linear-gradient(135deg, #dc2626, #ea580c); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px;">
              <h2 style="margin: 0 0 10px 0; font-size: 24px;">New ${inquiryTypeDisplay}</h2>
              <p style="margin: 0; font-size: 16px;">Inquiry Date: ${new Date().toLocaleString()}</p>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="color: #1e293b; margin-bottom: 15px;">Inquiry Details</h3>
              <table style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 8px; overflow: hidden;">
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Inquiry Type:</td>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${inquiryTypeDisplay}</td>
                </tr>
                ${
                  data.firstName
                    ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Name:</td>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${fullName}</td>
                </tr>
                `
                    : ""
                }
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
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Phone:</td>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
                    <a href="tel:${
                      data.phone
                    }" style="color: #2563eb; text-decoration: none;">${
      data.phone
    }</a>
                  </td>
                </tr>
                 ${
                   data.mediaType
                     ? `
                 <tr>
                   <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Media Type:</td>
                   <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${
                     data.mediaType.charAt(0).toUpperCase() +
                     data.mediaType.slice(1)
                   }</td>
                 </tr>
                 `
                     : ""
                 }
                 ${
                   data.eventType
                     ? `
                 <tr>
                   <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Event Format:</td>
                   <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${
                     data.eventType === "inPerson" ? "In Person" : "Virtual"
                   }</td>
                 </tr>
                 `
                     : ""
                 }
                ${
                  data.eventLocation
                    ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Event Location:</td>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.eventLocation}</td>
                </tr>
                `
                    : ""
                }
                ${
                  data.company
                    ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Company:</td>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.company}</td>
                </tr>
                `
                    : ""
                }
                ${
                  data.topic
                    ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Topic:</td>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.topic}</td>
                </tr>
                `
                    : ""
                }
                ${
                  data.audienceSize
                    ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Audience Size:</td>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.audienceSize}</td>
                </tr>
                `
                    : ""
                }
                ${
                  data.eventDate
                    ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Event Date:</td>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.eventDate}</td>
                </tr>
                `
                    : ""
                }
                ${
                  data.budget
                    ? `
                <tr>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; font-weight: bold; color: #475569; background-color: #f1f5f9;">Budget:</td>
                  <td style="padding: 15px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.budget}</td>
                </tr>
                `
                    : ""
                }
                ${
                  data.additionalInfo
                    ? `
                <tr>
                  <td style="padding: 15px; font-weight: bold; color: #475569; background-color: #f1f5f9; vertical-align: top;">Additional Info:</td>
                  <td style="padding: 15px; color: #1e293b;">${data.additionalInfo}</td>
                </tr>
                `
                    : ""
                }
              </table>
            </div>

            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px;">
              <h4 style="color: #92400e; margin: 0 0 10px 0;">Action Required</h4>
              <p style="color: #78350f; margin: 0;">Please follow up with this inquiry as soon as possible. A confirmation email has been sent to the inquirer.</p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; margin: 0;">
                This is an automated notification from the Speaking & Media Inquiries system.
              </p>
            </div>

          </div>
        </body>
      </html>
    `,
  };
};

// Add data to Google Sheets
const addToGoogleSheets = async (data: InquiryData) => {
  try {
    const sheets = await getGoogleSheetsClient();
    const spreadsheetId =
      process.env.GOOGLE_SHEET_ID_SPEAKING_MEDIA || process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error(
        "Google Sheet ID for Speaking & Media Inquiries not configured"
      );
    }

    const inquiryTypeDisplay =
      data.inquiryType === "speaking"
        ? "Invitation to speak at an event"
        : "Media or interview inquiries";

    const fullName =
      data.firstName && data.lastName
        ? `${data.firstName} ${data.lastName}`
        : "";

    // Prepare the row data - adjust based on inquiry type
    const values = [
      [
        new Date().toISOString(), // Timestamp
        inquiryTypeDisplay, // Inquiry Type
        fullName, // Name
        data.email, // Email
        data.phone || "", // Phone
        data.mediaType
          ? data.mediaType.charAt(0).toUpperCase() + data.mediaType.slice(1)
          : "", // Media Type (for media inquiries)
        data.eventType
          ? data.eventType === "inPerson"
            ? "In Person"
            : "Virtual"
          : "", // Event Format
        data.eventLocation || "", // Event Location (only for in-person)
        data.company || "", // Company (for speaking)
        data.topic || "", // Topic (for speaking)
        data.audienceSize || "", // Audience Size
        data.eventDate || "", // Event Date (for speaking)
        data.budget || "", // Budget (for speaking)
        data.additionalInfo || "", // Additional Info
        "Pending", // Status
        new Date().toLocaleDateString(), // Inquiry Date
      ],
    ];

    // Append the data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Sheet1!A:P", // Updated range to include all columns
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
const sendConfirmationEmail = async (data: InquiryData) => {
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
const sendAdminNotification = async (data: InquiryData) => {
  const transporter = createTransporter();
  const emailContent = getAdminNotificationEmail(data);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: emailContent.subject,
    html: emailContent.html,
  });
};

// Main inquiry submission action
export async function submitSpeakingMediaInquiry(
  formData: FormData
): Promise<InquiryResult> {
  try {
    // Extract data from form
    const inquiryData: InquiryData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      inquiryType: formData.get("inquiryType") as string,
      // Speaking event fields
      eventType: formData.get("eventType") as string,
      eventLocation: formData.get("eventLocation") as string,
      company: formData.get("company") as string,
      topic: formData.get("topic") as string,
      audienceSize: formData.get("audienceSize") as string,
      eventDate: formData.get("eventDate") as string,
      budget: formData.get("budget") as string,
      additionalInfo: formData.get("additionalInfo") as string,
      // Media inquiry fields
      mediaType: formData.get("mediaType") as string,
    };

    // Validate required basic fields
    if (!inquiryData.email || !inquiryData.inquiryType) {
      return {
        success: false,
        message: "All required fields must be filled",
        error: "Missing required fields",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inquiryData.email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
        error: "Invalid email format",
      };
    }

    // Validate inquiry type
    if (!["speaking", "media"].includes(inquiryData.inquiryType)) {
      return {
        success: false,
        message: "Invalid inquiry type",
        error: "Invalid inquiry type",
      };
    }

    // Execute all operations
    const promises = [];

    // Add to Google Sheets
    promises.push(addToGoogleSheets(inquiryData));

    // Send confirmation email to user
    promises.push(sendConfirmationEmail(inquiryData));

    // Send notification to admin
    promises.push(sendAdminNotification(inquiryData));

    // Wait for all operations to complete
    await Promise.all(promises);

    return {
      success: true,
      message:
        "Inquiry submitted successfully! Please check your email for confirmation.",
    };
  } catch (error) {
    console.error("Inquiry submission error:", error);
    return {
      success: false,
      message: "Submission failed. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
