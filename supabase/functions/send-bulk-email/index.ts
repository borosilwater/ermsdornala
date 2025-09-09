import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.2';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Gmail SMTP configuration
const GMAIL_USER = 'daredevil9654@gmail.com';
const GMAIL_PASS = 'woevsfxjorkxxtnu'; // App password

interface BulkEmailRequest {
  to: string[];
  subject: string;
  body: string;
  type: 'announcement' | 'news' | 'event' | 'exam_result' | 'general';
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, body, type }: BulkEmailRequest = await req.json();

    console.log(`Sending Gmail to ${to.length} recipients about ${type}`);

    // Create professional email template
    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1a5276 0%, #2980b9 100%); padding: 30px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">EMRS Dornala</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Eklavya Model Residential School</p>
            <p style="color: rgba(255,255,255,0.8); margin: 5px 0 0 0; font-size: 14px;">Prakasam District, Andhra Pradesh</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #1a5276; margin: 0 0 25px 0; font-size: 24px; font-weight: 600; border-bottom: 2px solid #f1c40f; padding-bottom: 10px;">${subject}</h2>
            <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; border-left: 5px solid #1a5276; line-height: 1.6; font-size: 16px; color: #333;">
              ${body.replace(/\n/g, '<br>')}
            </div>
            
            <!-- Call to Action -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://your-school-portal.com" style="background: linear-gradient(135deg, #1a5276, #2980b9); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: 600; display: inline-block; box-shadow: 0 4px 12px rgba(26, 82, 118, 0.3);">
                Visit School Portal
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f8f9fa; padding: 25px 20px; text-align: center; border-top: 1px solid #e9ecef;">
            <div style="margin-bottom: 15px;">
              <img src="https://via.placeholder.com/50x50/1a5276/ffffff?text=EMRS" alt="EMRS Logo" style="width: 50px; height: 50px; border-radius: 50%; margin-bottom: 10px;">
            </div>
            <p style="color: #1a5276; margin: 0 0 10px 0; font-size: 14px; font-weight: 600;">
              EMRS Dornala - Empowering Tribal Youth Through Education
            </p>
            <p style="color: #666; margin: 0 0 15px 0; font-size: 13px;">
              📍 Dornala, Prakasam District, Andhra Pradesh - 523330<br>
              📞 08567-123456 | 📧 emrsdornala@gmail.com
            </p>
            <div style="border-top: 1px solid #ddd; padding-top: 15px; margin-top: 15px;">
              <p style="color: #999; margin: 0; font-size: 11px;">
                This email was sent from EMRS Dornala School Management System<br>
                © 2024 EMRS Dornala. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const results = [];
    let successCount = 0;
    let failureCount = 0;

    // Send emails using Gmail SMTP via EmailJS
    for (const email of to) {
      try {
        // Use EmailJS service for reliable email delivery
        const emailJSResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: 'service_gmail_emrs', // You'll need to set this up in EmailJS
            template_id: 'template_emrs_notification',
            user_id: 'daredevil9654@gmail.com',
            template_params: {
              to_email: email,
              to_name: email.split('@')[0],
              subject: subject,
              message: body,
              html_content: emailContent,
              from_name: 'EMRS Dornala',
              from_email: GMAIL_USER,
              school_name: 'EMRS Dornala',
              school_address: 'Prakasam District, Andhra Pradesh - 523330',
              school_phone: '08567-123456',
              school_email: 'emrsdornala@gmail.com'
            }
          }),
        });

        if (emailJSResponse.ok) {
          results.push({
            email,
            status: 'sent',
            timestamp: new Date().toISOString()
          });
          successCount++;
          
          console.log(`✅ Email sent successfully to ${email}`);
        } else {
          throw new Error(`EmailJS API error: ${emailJSResponse.status}`);
        }

        // Log successful email to database
        await supabase.from('notifications').insert({
          user_id: '00000000-0000-0000-0000-000000000000', // System user
          type: `email_${type}`,
          title: subject,
          message: `Email sent to ${email}`,
          status: 'sent',
          data: { email, type, subject, service: 'gmail' }
        });

        // Add delay between emails to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`❌ Failed to send email to ${email}:`, error);
        results.push({
          email,
          status: 'failed',
          error: error.message,
          timestamp: new Date().toISOString()
        });
        failureCount++;

        // Log failed email to database
        await supabase.from('notifications').insert({
          user_id: '00000000-0000-0000-0000-000000000000',
          type: `email_${type}_failed`,
          title: `Failed: ${subject}`,
          message: `Failed to send email to ${email}: ${error.message}`,
          status: 'failed',
          data: { email, type, subject, error: error.message }
        });
      }
    }

    // Log bulk email summary
    await supabase.from('notifications').insert({
      user_id: '00000000-0000-0000-0000-000000000000',
      type: 'bulk_email_summary',
      title: `Bulk Email Report: ${subject}`,
      message: `📊 Email Campaign Results:\n✅ Successful: ${successCount}\n❌ Failed: ${failureCount}\n📧 Total Recipients: ${to.length}`,
      status: failureCount === 0 ? 'sent' : 'partial',
      data: { 
        total: to.length, 
        success: successCount, 
        failed: failureCount, 
        type, 
        subject,
        service: 'gmail_smtp'
      }
    });

    console.log(`📊 Bulk email completed: ${successCount} sent, ${failureCount} failed`);

    return new Response(JSON.stringify({ 
      success: true, 
      results,
      summary: {
        total: to.length,
        success: successCount,
        failed: failureCount
      },
      message: `Gmail delivery: ${successCount} successful, ${failureCount} failed`,
      service: 'gmail_smtp'
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("❌ Critical error in send-bulk-email function:", error);
    
    // Log critical error
    try {
      await supabase.from('notifications').insert({
        user_id: '00000000-0000-0000-0000-000000000000',
        type: 'system_error',
        title: 'Email System Error',
        message: `Critical error in bulk email function: ${error.message}`,
        status: 'failed',
        data: { error: error.message, timestamp: new Date().toISOString() }
      });
    } catch (logError) {
      console.error("Failed to log error:", logError);
    }

    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        message: "Critical error in email system",
        service: 'gmail_smtp'
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);